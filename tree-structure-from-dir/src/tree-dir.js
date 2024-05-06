const dree = require("dree");
const PATH_TO_SCAN = process.argv[2];
const MAX_DEPTH_SCAN = process.argv[4];

const options = {
  depth: MAX_DEPTH_SCAN,
};

fileCounter = 0;
dirCounter = 0;
const fileCallback = function () {
  fileCounter++;
};

const dirCallback = function () {
  dirCounter++;
};

const treeFromDir = dree.scan(PATH_TO_SCAN, options, fileCallback, dirCallback);
const parseStringTree = dree.parseTree(treeFromDir, options);

console.log(parseStringTree);
console.log(`${dirCounter} directories, ${fileCounter} files`);
