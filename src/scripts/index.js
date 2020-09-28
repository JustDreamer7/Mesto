import Api from './Api.js';
import Card from './card.js';
import CardList from './cardlist.js';
import Popup from './popup.js';
import UserInfo from './userinfo.js';
import FormValidator from './formvalidator.js';
import '../index.css';
(function () {
    const placesList = document.querySelector('.places-list');
    const formButton = document.querySelector('.user-info__button');
    const profileButton = document.querySelector('.user-info__edit');
    const popupMenu = document.querySelector('.popup_card');
    const popupProfile = document.querySelector('.popup_profile');
    const popupAvatar = document.querySelector('.popup_avatar');
    const userName = document.querySelector('.user-info__name');
    const userJob = document.querySelector('.user-info__job');
    const userAvatar = document.querySelector('.user-info__photo');
    const bigImage = document.querySelector('.popup__background');
    const popupImage = document.querySelector('.popup_image');
    const spansProfile = [...document.querySelectorAll('.popup__input-error_profile')];
    const spansCard = [...document.querySelectorAll('.popup__input-error_card')];
    const spansAvtr = [...document.querySelectorAll('.popup__input-error_avatar')];
    const newCard = document.forms.new;
    const newName = document.forms.profile;
    const newAvtr = document.forms.avatar;
    const nameCard = document.querySelector('.popup__input_type_name');
    const link = document.querySelector('.popup__input_type_link-url');
    const job = document.querySelector('.popup__input_type_job');
    const name = document.querySelector('.popup__input_type_yourname');
    const avatar = document.querySelector('.popup__input_type_avatar');
    let ownerId = '123';
    const popupProf = new Popup(popupProfile);
    const popupCard = new Popup(popupMenu);
    const popupAvtr = new Popup(popupAvatar);
    const popupImg = new Popup(popupImage);
    const validCard = new FormValidator(newCard);
    const validProf = new FormValidator(newName);
    const validAvtr = new FormValidator(newAvtr);
    const cardList = new CardList(placesList);
    const api = new Api({
        url: 'https://nomoreparties.co/cohort12',
        method: 'GET',
        headers: {
            authorization: '0a820da4-7501-484a-bba0-d11cee45b3d8',
            'Content-Type': 'application/json'
        }
    });
    
    api.getProfile()
        .then((res) => {
            const userInfo = new UserInfo(res.name, res.about, userName, userJob);
            userInfo.updateUserInfo();
            userInfo.setUserInfo(name, job);
            ownerId = res._id;
            userAvatar.style.backgroundImage = `url(${res.avatar})`;
            console.log(res);
        })
        .catch((err) => {
            console.log(err.status, err.statusText);
        });

    api.getCards()
        .then((res) => {
            cardList.render(fullImage, res);

            const allCards = document.querySelectorAll('.place-card');
            console.log(res);
        })
    .catch((err) => {
        console.log(err.status, err.statusText);
    });

    function fullImage(event) {
        if (event.target.classList.contains('place-card__image')) {
            const link = event.target.getAttribute('style');
            bigImage.style = link;
            popupImg.open();
        }
    }
    popupAvatar.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup__close')) {
            popupAvtr.close();
            newAvtr.reset();
        }
    })
    popupMenu.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup__close')) {
            popupCard.close();
            newCard.reset();
        }
    });
    popupProfile.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup__close')) {
            popupProf.close();
            newName.reset();
        }
    });

    popupImage.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup__close')) {
            popupImg.close();
        }
    });

    userAvatar.addEventListener('click', () => {
        validAvtr.resetError(spansAvtr);
        popupAvtr.open();
    });
    profileButton.addEventListener('click', () => {
        validProf.resetError(spansProfile);
        popupProf.open();
    });
    formButton.addEventListener('click', () => {
        validCard.resetError(spansCard);
        popupCard.open();
    });


    /**
     * Можно лучше (во всех формах):
     * Искать формы с помощью document.querySelector, чтобы выдержать единый стиль работы с DOM
     */
    validAvtr.enableValidation();
    document.forms.avatar.addEventListener('submit', (event) => {
        event.preventDefault();
        api.updateAvatar(avatar.value)
            .then((res) => {
                userAvatar.style.backgroundImage = `url(${avatar.value})`;
                console.log(userAvatar.style.backgroundImage);
                console.log(avatar.value);
                console.log(res);
                popupAvtr.close();
            })
            .catch((err) => {
                console.log(err.status, err.statusText);
            });
    });
    validProf.enableValidation();
    document.forms.profile.addEventListener('submit', (event) => {
        event.preventDefault();

        api.updateProfile(name.value, job.value)
            .then((res) => {
                const userInfo = new UserInfo(name.value, job.value, userName, userJob);
                userInfo.updateUserInfo();
                userInfo.setUserInfo(name, job);
                popupProf.close();
                console.log(res);
            })
            .catch((err) => {
                console.log(err.status, err.statusText);
            });
    });
    validCard.enableValidation();
    document.forms.new.addEventListener('submit', (event) => {
        event.preventDefault();

        api.addCard(nameCard.value, link.value)
            .then((res) => {
                const card = new Card(nameCard.value, link.value);
                const cardElement = card.create();
                cardElement.id = res._id;
                card.setEventListeners(fullImage);
                cardList.addCard(cardElement);
                newCard.reset();
                popupCard.close();
                console.log(res);
            })
            .catch((err) => {
                console.log(err.status, err.statusText);
            });
        /**
         * Можно лучше:
         * Вместо того, чтобы сбрасывать форму после клика на крестик и после submit лучше сбрасывать форму перед открытием
         * попапа - избежим дублирования кода.
         */

    });
})();
/*
/*Токен: '0a820da4-7501-484a-bba0-d11cee45b3d8'
Идентификатор группы: cohort12
*/


/*

Хорошая работа, большая часть задания работает верно, отлично, что реализована дополнительная часть задания. 
Но есть несколько замечаний. 

Часть из замечаний относится к доп. заданию, не требуемому для сдачи 
работы (лайки, удаление и добавление карточки, попап аватара), но
нужно или сделать его правильно или пока убрать пока из программы. Т.к. работа не может
быть принята с некорректным кодом, даже несмотря на то, что это доп. функционал

Надо испарвить:

- в классе Api описать отдельными методами все ендпоинты сервера, создавать
  один экземпляр кдасса Api и передавать классам которым он +++++++++
  нужен (например классу Card), а не создавать каждый раз заново
- обработчик catch должен быть в конце цепочки, а не в классе Api++++++++++++++++++++++++
- confirm и alert не должно быть в классе Api+++++++++++++++++++++
- во всей программе все изменения на странице должны происходить, только после того, как
  сервер ответил подтверждением, т.е. в блоке then+++++++++++++++++++++=
- использовать Promise.all для загрузки начальных данных т.к. для отображения кнопки (лучше сначала работу сдать)
  удаления карточки нужен id пользователя который приходит с сервера в запросе данных пользователя
- за отображение кнопки удаления картчоки должен отвечать класс Card
- кнопка удаления отрисовывается на всех карточках, а должна быть только на карточках созданных пользователем++++++++++++++++

Можно лучше: 
- проверка ответа сервера и преобразование из json
  дублируется во всех методах класса Api, лучше вынести в отдельный метод


*/

/*
  Отлично, все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после получения с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      api.getUserData(),
      api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершится ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/
