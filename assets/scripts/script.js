const BACK = "card-back";
const FRONT = "card-front";
const CARD = "card";
const FLIP = "flip";




startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {

    let board = document.getElementById("board");
    board.innerHTML = '';
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

    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    setTimeout(() => {
                        gameOver();
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove(FLIP);
                    secondCardView.classList.remove(FLIP);
                    game.unflipCards();
                }, 1000);
            }
        }
    }
}


function gameOver() {
    let gameOver = document.getElementById("game-over");
    gameOver.style.display = "flex";
}

function restart() {
    startGame();
    let gameOver = document.getElementById("game-over");
    gameOver.style.display = "none";


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