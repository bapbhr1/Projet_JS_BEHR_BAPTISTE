const fs = require("fs");
const path = require("path");


function readTextFile(filePath) {
    const fullPath = path.resolve(__dirname, filePath);
    return fs.readFileSync(fullPath, "utf8");
}

function cleanAndSplitText(text) {
    return text
        .toLowerCase()
        //garde lettres accentuées + espaces
        .replace(/[^a-zàâäçéèêëîïôöùûüÿœæñ'\s]/gi, "")
        .split(/\s+/)
        .filter(Boolean);
}

module.exports = {
    readTextFile,
    cleanAndSplitText,
};
