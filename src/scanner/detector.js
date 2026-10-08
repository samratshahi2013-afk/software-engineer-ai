const fs = require("fs");
const path = require("path");

function detectProject(root) {
    const frameworks = new Set();
    const dependencies = {};

    const packageJsonPath = path.join(root, "package.json");

    if (!fs.existsSync(packageJsonPath)) {
        return {
            frameworks: [],
            dependencies: {}
        };
    }

    try {
        const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, "utf8")
        );

        const productionDependencies = packageJson.dependencies || {};
        const devDependencies = packageJson.devDependencies || {};

        Object.assign(
            dependencies,
            productionDependencies,
            devDependencies
        );

        // Framework detection
        if (dependencies.next) {
            frameworks.add("Next.js");
        }

        if (dependencies.react) {
            frameworks.add("React");
        }

        if (dependencies.vue) {
            frameworks.add("Vue");
        }

        if (dependencies["@angular/core"]) {
            frameworks.add("Angular");
        }

        if (dependencies.svelte) {
            frameworks.add("Svelte");
        }

        if (dependencies.express) {
            frameworks.add("Express");
        }

        if (dependencies.fastify) {
            frameworks.add("Fastify");
        }

        if (dependencies["@nestjs/core"]) {
            frameworks.add("NestJS");
        }

        return {
            frameworks: Array.from(frameworks),
            dependencies
        };

    } catch (error) {
        console.warn(
            "Could not read package.json:",
            error.message
        );

        return {
            frameworks: [],
            dependencies: {}
        };
    }
}

module.exports = {
    detectProject
};