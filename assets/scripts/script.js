const BACK = "card-back";
const FRONT = "card-front";
const CARD = "card"

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

function startGame() {
    cards = createCardsFromTechs(techs);
    shuffleCards(cards);
    initializeCards(cards);
}

function initializeCards(cards) {

    let board = document.getElementById("board");

    cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);

        board.appendChild(cardElement);
    })
}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function flipCard() {
    this.classList.add("flip");
}


function createCardFace(cardFaceClass, card, parentElement) {
    let cardFace = document.createElement("div");
    cardFace.classList.add(cardFaceClass);
    if (cardFaceClass === FRONT) {
        let iconImg = document.createElement("img");
        iconImg.src = "./assets/images/" + card.icon + ".png";
        cardFace.appendChild(iconImg);
    } else {
        cardFace.innerHTML = "&lt/&gt";
    }
    parentElement.appendChild(cardFace);
}

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



function shuffleCards(cards) {
    let currentIndex = cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    }
}