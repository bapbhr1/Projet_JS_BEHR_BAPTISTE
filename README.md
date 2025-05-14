#Projet JavaScript - modèles de Markov/clavier numérique
#Baptiste BEHR

Ce projet vise à proposer des suggestions :
- de complétion de mot (ex: "cha" → "chat", "chanson"…)

ou de proposition de mot suivant après un espace (ex: "chat " → "mange", "court"…)

Il utilise deux modèles de Markov qui sont entraînés sur input.txt.

Pour résumer :

- index.js / markov.js / utils.js : servent pour la logique des suggestions

- input.txt : corpus de texte (plusieurs phrases) pour l'entraînement des deux modèles
