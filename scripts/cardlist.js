class CardList { // в названиях классов следует использовать PascalCase: CardList
    constructor(cards) { // следует использовать camelCase: startArray
        this.cards = cards;
    }
    addCard(cardElement) {
        this.cards.appendChild(cardElement);
    }
    render(func, startArray) {
            startArray.forEach(item => {
            const card = new Card(item.name, item.link);
            const cardElement = card.create();
            card.setEventListeners(func);

            this.addCard(cardElement);
        });
    }
}