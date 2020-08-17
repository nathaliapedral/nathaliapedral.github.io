let game = {

    techs: [
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
    ],

    lockMode: false,

    firstCard: null,
    secondCard: null,

    cards: null,

    checkMatch: function () {
        if (this.secondCard) {
            return this.firstCard.icon === this.secondCard.icon;
        } else {
            return false;
        }
    },

    checkGameOver: function () {
        return this.cards.length === this.cards.filter(card => card.isFlipped).length;
    },

    clearCards: function () {
        this.lockMode = false;
        this.firstCard = null;
        this.secondCard = null;
    },

    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.isFlipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.isFlipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.isFlipped = true;
            this.lockMode = true;
            return true;
        }

    },

    unflipCards: function () {
        this.firstCard.isFlipped = false;
        this.secondCard.isFlipped = false;
        this.clearCards();
    },

    createCardsFromTechs: function () {

        this.cards = [];

        this.techs.forEach(tech => {
            this.cards.push(this.createPairOfCards(tech));
        });

        this.cards = this.cards.flatMap(pair => {
            return pair;
        });
        this.shuffleCards();
        return this.cards;
    },

    createPairOfCards: function (tech) {

        return [{
                id: this.createRandomId(tech),
                icon: tech,
                isFlipped: false
            },
            {
                id: this.createRandomId(tech),
                icon: tech,
                isFlipped: false
            }
        ];
    },

    createRandomId: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }

    }
}