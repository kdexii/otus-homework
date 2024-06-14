const fs = require('fs');
const readline = require('readline');

function readFile(filename) {
  return readline.createInterface({
    input: fs.createReadStream(filename),
    output: process.stdout,
    terminal: false
  });
}

function tokenize(lineStream) {
  const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
  const words = [];
  
  return new Promise((resolve, reject) => {
    lineStream.on('line', (line) => {
      line.split(/\s+/).forEach((word) => {
        const cleanedWord = word.replace(punctuationRegex, '').toLowerCase();
        if (cleanedWord) words.push(cleanedWord);
      });
    });

    lineStream.on('close', () => resolve(words));
    lineStream.on('error', (err) => reject(err));
  });
}

function countWords(words) {
  return words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
}

function generateVector(wordCounts) {
  const sortedWords = Object.keys(wordCounts).sort();
  return sortedWords.map(word => wordCounts[word]);
}

function writeVector(filename, vector) {
  fs.writeFileSync(filename, vector.join(' '), 'utf-8');
}

async function main(inputFile, outputFile) {
  const lineStream = readFile(inputFile);
  const words = await tokenize(lineStream);
  const wordCounts = countWords(words);
  const vector = generateVector(wordCounts);
  writeVector(outputFile, vector);
}

if (process.argv.length !== 4) {
  console.log("Usage: node index_text.js <input_file> <output_file>");
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

main(inputFile, outputFile).catch(err => {
  console.error("Error processing file:", err);
});
