const fs = require("fs");
const path = require("path");

class Repository {
    constructor(root) {
        this.root = root;

        this.files = [];
        this.directories = [];

        this.languages = {};
        this.frameworks = [];
        this.dependencies = {};

        this.statistics = {
            totalFiles: 0,
            totalDirectories: 0,
            totalSize: 0
        };

        this.metadata = {};
    }

    updateStatistics() {
        this.statistics.totalFiles = this.files.length;
        this.statistics.totalDirectories = this.directories.length;

        this.statistics.totalSize = this.files.reduce(
            (total, file) => total + file.size,
            0
        );
    }

    detectLanguages() {
        this.languages = {};

        for (const file of this.files) {
            const language = file.type;

            if (language === "Unknown") {
                continue;
            }

            if (!this.languages[language]) {
                this.languages[language] = 0;
            }

            this.languages[language]++;
        }
    }

    loadFileContents() {
        for (const file of this.files) {
            const fullPath = path.join(this.root, file.path);

            try {
                const content = fs.readFileSync(fullPath, "utf8");

                file.content = content;
                file.lines = content.split(/\r?\n/).length;

            } catch (error) {
                file.content = null;
                file.lines = 0;

                console.warn(
                    `Could not read ${file.path}:`,
                    error.message
                );
            }
        }
    }
}

module.exports = Repository;