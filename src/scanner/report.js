const fs = require("fs");
const path = require("path");

function getFileType(extension) {
    const types = {
        ".js": "JavaScript",
        ".ts": "TypeScript",
        ".jsx": "React JSX",
        ".tsx": "React TSX",
        ".json": "JSON",
        ".md": "Markdown",
        ".html": "HTML",
        ".css": "CSS",
        ".scss": "SCSS",
        ".yml": "YAML",
        ".yaml": "YAML",
        ".env": "Environment",
        ".gitignore": "Git Ignore"
    };

    return types[extension] || "Unknown";
}

function buildReport(scanResult) {
    return scanResult.files.map(file => {
        const stats = fs.statSync(file);

        return {
            path: file,
            filename: path.basename(file),
            directory: path.dirname(file),
            extension: path.extname(file),
            size: stats.size,
            lastModified: stats.mtime,
            type: getFileType(path.extname(file))
        };
    });
}

module.exports = {
    buildReport
};

