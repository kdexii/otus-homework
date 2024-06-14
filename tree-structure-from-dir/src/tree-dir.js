const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const directoryPath = args[0];
const depth = args[1] && args[1].startsWith('-d') ? parseInt(args[1].substring(2)) : Infinity;

function displayTree(directoryPath, depth) {
    const rootDir = path.basename(directoryPath);
    console.log(rootDir);
    displayDirectory(directoryPath, '', depth, 0);
}

function displayDirectory(directoryPath, prefix, maxDepth, currentDepth) {
    const files = fs.readdirSync(directoryPath);
    let dirs = 0;
    let filesCount = 0;

    files.forEach((file, index) => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            dirs++;
            if (currentDepth < maxDepth) {
                console.log(`${prefix}├── ${file}`);
                displayDirectory(filePath, prefix + '│  ', maxDepth, currentDepth + 1);
            } else {
                console.log(`${prefix}├── ${file}`);
                displayDirectory(filePath, prefix + '│  ', maxDepth, currentDepth + 1);
            }
        } else {
            filesCount++;
            console.log(`${prefix}├── ${file}`);
        }
    });

    console.log(`${prefix}└── ${dirs} directories, ${filesCount} files`);

}

displayTree(directoryPath, depth);
