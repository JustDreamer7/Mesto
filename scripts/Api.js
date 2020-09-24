class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    /*
        Надо исправить: для каждого ендпоинта сервера сделать отдельный метод
        т.е. метод getUserInfo  updateUserInfo   getCards и т.д. 
        В конструктор класса передавать только базовый адрес сервера
        в самом метод добавлять адрес ендпоинта к адресу сервера, метод method просто захардкодить, т.к. он у одного ендпоинта не изменяется
        Например
	    getCards() { //метод для получения карточек с сервера
			return fetch(`${this.options.url}/cards`, { //добавляем к url адрес ендпоинта
				headers: this.options.headers,
			})

        В метод updateUserInfo передавать как параметры данные, которые отправляются на сервер, а уже body
        формировать в самом метод, т.к. код вне класса Api недолжен знать в каком формате 
        данные уходит на сервер, он только отдает данные классу Api
    
    */
    getCards() {
        return fetch(`${this.url}/cards`, {
            method: 'GET', 
            headers: this.headers
        })
        .then((res) => {

            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    getProfile(){
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then((res) => {

            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    updateAvatar(avatarValue){
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH', 
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatarValue
            })
        })
        .then((res) => {

            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    updateProfile(nameValue, jobValue){
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH', 
            headers: this.headers,
            body: JSON.stringify({
                name: nameValue,
                about: jobValue
            })
        })
        .then((res) => {

            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    addCard(nameCardValue, linkValue){
        return fetch(`${this.url}/cards`, {
            method: 'POST', 
            headers: this.headers,
            body: JSON.stringify({
                name: nameCardValue,
                link: linkValue
            })
        })
        .then((res) => {

            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}