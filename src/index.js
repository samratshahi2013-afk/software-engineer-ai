const { scanDirectory } = require("./scanner/filesystem");

const report = scanDirectory(".");

console.log("Files:", report.files.length);
console.log("Directories:", report.directories.length);
console.log("Ignored:", report.ignored.length);