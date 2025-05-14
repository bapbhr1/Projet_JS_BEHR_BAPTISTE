const readline = require("readline");
const R = require("ramda");
const { readTextFile, cleanAndSplitText } = require("./utils");
const {
    buildLetterModel,
    buildWordModel,
    suggestWordCompletion,
    suggestNextWord,
} = require("./markov");

//chargement du texte
const rawText = readTextFile("./data/input.txt");
const words = cleanAndSplitText(rawText);

const letterModel = buildLetterModel(words);
const wordModel = buildWordModel(words);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function promptUser() {
    rl.question('Tape un mot ou une phrase ("exit" pour quitter) : ', (input) => {
        if (input.toLowerCase() === "exit") {
            rl.close();
            return;
        }

        const trimmed = input.trim();
        const isSpaceEnding = input.endsWith(" ");
        const tokens = trimmed.split(/\s+/);

        if (isSpaceEnding) {
            //dernier mot complet -> suggérer mot suivant
            const lastWord = tokens[tokens.length - 1];
            const suggestions = suggestNextWord(lastWord, wordModel);
            if (suggestions.length > 0) {
                console.log("Suggestions de mot suivant :");
                suggestions.forEach((sugg) => console.log("→", sugg));
            } else {
                console.log("→ (aucune suggestion)");
            }
        } else {
            //dernier mot incomplet -> suggérer complétion
            const lastFragment = tokens[tokens.length - 1];
            const suggestions = suggestWordCompletion(lastFragment, letterModel);
            if (suggestions.length > 0) {
                console.log("Suggestions pour compléter :", `"${lastFragment}"`);
                suggestions.forEach((sugg) => console.log("→", sugg));
            } else {
                console.log("→ (aucune suggestion)");
            }
        }

        promptUser();
    });
}

promptUser();
