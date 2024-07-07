const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');

dotenv.config();

const { sequelize } = require('./models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

app.use('/auth', authRoutes);

app.get('/courses', (req, res) => {
    res.render('courses', { title: 'Courses' });
});

app.get('/courses/:id', (req, res) => {
    res.render('course', { title: 'Course Details' });
});

app.use((req, res, next) => {
    res.status(404).send('Sorry, that route does not exist.');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const sslOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};

sequelize.sync({ force: true }).then(() => {
    https.createServer(sslOptions, app).listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
});
