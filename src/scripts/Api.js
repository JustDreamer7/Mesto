export default class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    getCards() {
        return fetch(`${this.url}/cards`, {
            method: 'GET', 
            headers: this.headers
        })
        /*
            Можно лучше: проверка ответа сервера и преобразование из json
            дублируется во всех методах класса Api, лучше вынести в отдельный метод:
                _getResponseData(res) {
                    if (!res.ok) {
                        return Promise.reject(`Ошибка: ${res.status}`); 
                    }
                    return res.json();
                }
            Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
            не используется вне класса Api   
        */
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