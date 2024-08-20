const WebSocket = require('ws');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const server = app.listen(3001, () => console.log('Listening on http://localhost:3001'));
const wss = new WebSocket.Server({ server });

const geojsonFilePath = path.join(__dirname, 'locations.geojson');

if (!fs.existsSync(geojsonFilePath)) {
    const initialGeoJson = {
        type: "FeatureCollection",
        features: []
    };
    fs.writeFileSync(geojsonFilePath, JSON.stringify(initialGeoJson, null, 2));
}

wss.on('connection', ws => {
    console.log('New client connected');
    const existingData = fs.readFileSync(geojsonFilePath);
    ws.send(existingData);

    ws.on('message', message => {
        console.log('Received:', message);

        const location = JSON.parse(message);

        const geoJsonData = JSON.parse(fs.readFileSync(geojsonFilePath));

        geoJsonData.features.push({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [location.lng, location.lat]
            },
            properties: {
                timestamp: new Date()
            }
        });

        fs.writeFileSync(geojsonFilePath, JSON.stringify(geoJsonData, null, 2));

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(geoJsonData));
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
});

app.use(express.static('public'));
