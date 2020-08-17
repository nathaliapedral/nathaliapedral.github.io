const BACK = "card-back";
const FRONT = "card-front";
const CARD = "card"




startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());
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