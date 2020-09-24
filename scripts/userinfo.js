class UserInfo {
    constructor(name, job, userName, userJob)  {
        this.name = name;
        this.job = job;
        this.userJob = userJob;
        this.userName = userName;
    }
    setUserInfo(name, job) {
        name.defaultValue = this.userName.textContent;
        job.defaultValue = this.userJob.textContent;
    }
    updateUserInfo() {
        this.userName.textContent = this.name;
        this.userJob.textContent = this.job;
        /**
         * Надо исправить:+++++++++++
         * Класс UserInfo должен отвечать только для информацию о пользователе.
         * Закрытие попапа следует перенести в script.js (в обработчик submit'а)
         */
        
    }
}