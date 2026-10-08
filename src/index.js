const Repository = require("./repository");
const { scanDirectory } = require("./scanner/filesystem");
const { buildReport } = require("./scanner/report");
const { detectProject } = require("./scanner/detector");

const repository = new Repository(".");
const scan = scanDirectory(".");

repository.files = buildReport(scan);
repository.directories = scan.directories;

repository.updateStatistics();
repository.detectLanguages();
repository.loadFileContents();

const projectInfo = detectProject(".");

repository.frameworks = projectInfo.frameworks;
repository.dependencies = projectInfo.dependencies;

console.log(repository);