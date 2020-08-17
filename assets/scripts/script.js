const BACK = "card-back";
const FRONT = "card-front";

let techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
];

let cards = null;
startGame();

function createCardsFromTechs(techs) {

    let cards = [];

    techs.forEach(tech => {
        cards.push(createPairOfCards(tech));
    });

    return cards.flatMap(pair => {
        return pair;
    });
}

function createPairOfCards(tech) {

    return [{
            id: createRandomId(tech),
            icon: tech,
            isFlipped: false
        },
        {
            id: createRandomId(tech),
            icon: tech,
            isFlipped: false
        }
    ];
}

function createRandomId(tech) {
    return tech + parseInt(Math.random() * 1000);
}

function startGame() {
    cards = createCardsFromTechs(techs);
    shuffleCards(cards);
    console.log(cards);
}

function shuffleCards(cards) {
    let currentIndex = cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    }
}