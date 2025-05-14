const R = require("ramda");

//modèle de Markov basé sur les lettres pour compléter les mots

function buildLetterModel(words) {
    const model = {};
    for (const word of words) {
        for (let i = 1; i <= word.length; i++) {
            const prefix = word.slice(0, i);
            model[prefix] = model[prefix] || new Set();
            model[prefix].add(word);
        }
    }

    return R.map(Array.from, model);
}

//modèle de Markov basé sur les mots pour prédire le mot suivant

function buildWordModel(words) {
    const model = {};
    for (let i = 0; i < words.length - 1; i++) {
        const current = words[i];
        const next = words[i + 1];
        model[current] = model[current] || [];
        model[current].push(next);
    }
    return model;
}

//3 suggestions max

function suggestWordCompletion(prefix, letterModel) {
    const suggestions = letterModel[prefix] || [];
    return R.uniq(suggestions).slice(0, 3);
}

function suggestNextWord(currentWord, wordModel) {
    const nextWords = wordModel[currentWord] || [];
    return R.uniq(nextWords).slice(0, 3);
}

module.exports = {
    buildLetterModel,
    buildWordModel,
    suggestWordCompletion,
    suggestNextWord,
};
