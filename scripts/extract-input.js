const fs = require('fs');
const path = require('path');

async function main() {
  // Path to build-info directory
  const buildInfoDir = path.join(__dirname, '../artifacts/build-info');
  
  // Get the latest JSON file in the directory
  const files = fs.readdirSync(buildInfoDir);
  const latestFile = files.reduce((latest, file) => {
    const filePath = path.join(buildInfoDir, file);
    const stats = fs.statSync(filePath);
    if (!latest || stats.mtime > fs.statSync(path.join(buildInfoDir, latest)).mtime) {
      return file;
    }
    return latest;
  }, '');
  
  if (!latestFile) {
    console.error('No build-info file found');
    return;
  }
  
  // read file JSON
  const filePath = path.join(buildInfoDir, latestFile);
  const buildInfo = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Extract the input section
  const input = buildInfo.input;
  
  // Write to a new file
  const outputPath = path.join(__dirname, '../verify-input.json');
  fs.writeFileSync(outputPath, JSON.stringify(input, null, 2));
  
  console.log(`File JSON input: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});