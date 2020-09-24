class Card {
    constructor(namecard, link) {
        this.link = link;
        this.namecard = namecard;
    }
    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');

    }
    remove(event) {
        const currentCard = event.target.closest('.place-card');
        currentCard.remove();
    }
    create() {
        const cardElement = document.createElement('div');
        cardElement.classList.add('place-card');

        const imageElement = document.createElement('div');
        imageElement.classList.add('place-card__image');
        imageElement.setAttribute('style', `background-image: url(${this.link})`);

        const delElement = document.createElement('button');
        delElement.classList.add('place-card__delete-icon');



        const cardDescription = document.createElement('div');
        cardDescription.classList.add('place-card__description');

        const nameElement = document.createElement('h3');
        nameElement.classList.add('place-card__name');
        nameElement.textContent = this.namecard;

        const likeElement = document.createElement('button');
        likeElement.classList.add('place-card__like-icon');

        cardElement.appendChild(imageElement);
        imageElement.appendChild(delElement);
        cardElement.appendChild(cardDescription);
        cardDescription.appendChild(nameElement);
        cardDescription.appendChild(likeElement);

        this.cardElement = cardElement;

        return cardElement;
    }
    setEventListeners(func) {
        this
            .cardElement
            .querySelector('.place-card__like-icon')
            .addEventListener('click', this.like);
        this
            .cardElement
            .querySelector('.place-card__delete-icon')
            .addEventListener('click', this.remove);
        this
            .cardElement
            .querySelector('.place-card__image')
            .addEventListener('click', func);
    }
}