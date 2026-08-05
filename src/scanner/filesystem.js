const fs = require("fs");
const path = require("path");

const DEFAULT_IGNORES = new Set([
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
    "coverage",
    ".turbo",
    ".cache",
    ".idea",
    ".vscode",
]);

function scanDirectory(rootPath) {
    const result = {
        root: path.resolve(rootPath),
        files: [],
        directories: [],
        ignored: []
    };

    walk(rootPath, result);

    return result;
}

function walk(currentPath, result) {
    const entries = fs.readdirSync(currentPath, {
        withFileTypes: true
    });

    for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (DEFAULT_IGNORES.has(entry.name)) {
            result.ignored.push(fullPath);
            continue;
        }

        if (entry.isDirectory()) {
            result.directories.push(fullPath);
            walk(fullPath, result);
        } else {
            result.files.push(fullPath);
        }
    }
}

module.exports = {
    scanDirectory
};
    scanDirectory
;