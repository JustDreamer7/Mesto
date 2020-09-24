class FormValidator {
    constructor(formVal) {
        this.formVal = formVal;
        this.setEventListeners = this.setEventListeners.bind(this);
    }
    checkInputValidity(inputElement) {
        const validity = inputElement.validity;
        if (validity.valueMissing) {
            inputElement.setCustomValidity("Это обязательное поле");
            this.setError(inputElement);
            return false;
        }
        if (validity.tooShort) {
            inputElement.setCustomValidity(`Должно быть от ${inputElement.getAttribute('minlength')} до ${inputElement.getAttribute('maxlength')} символов`);
            this.setError(inputElement);
            return false;
        }

        if (validity.tooLong) {
            inputElement.setCustomValidity(`Должно быть от ${inputElement.getAttribute('minlength')} до ${inputElement.getAttribute('maxlength')} символов`);
            this.setError(inputElement);
            return false;
        }
        if (validity.typeMismatch && inputElement.type === 'url') {
            inputElement.setCustomValidity('Здесь должна быть ссылка');
            this.setError(inputElement);
            return false;
        }
        inputElement.setCustomValidity('');
        this.setError(inputElement);
        return true;
    }
    setError(inputElement) {
        const errorMessage = document.querySelector(`#error-${inputElement.id}`);
        errorMessage.textContent = inputElement.validationMessage;
    }
    resetError(spans) {
      /**
       * Можно лучше:
       * Вместо spans, который передается снаружи искать их внутри формы:
       * [...this.formVal.querySelectorAll('.popup__input-error')];
       */
        spans.forEach(function (item) {
            item.textContent = '';
        });
    }
    setSubmitButtonState(valid) {
        /**
         * Можно лучше:
         * Перенести поиск кнопки в конструктор - тогда не нужно будет искать ее заново при каждом событии input
         */
        const button = this.formVal.querySelector('button');
        if (valid) {
            button.removeAttribute('disabled');
            button.classList.remove('popup__button_disactivated');
        } else {
            button.setAttribute('disabled', true);
            button.classList.add('popup__button_disactivated');
        }
    }
    setEventListeners(event) {
        event.preventDefault();
        /**
         * Можно лучше:
         * Перенести поиск inputs в конструктор - тогда не нужно будет искать ее заново при каждом событии input
         */
        const inputs = [...this.formVal.querySelectorAll('input')];
        this.checkInputValidity(event.target);
        /**
         * Можно лучше:
         * const isFormValid = inputs.every((input) => input.validity.valid);
         * this.setSubmitButtonState(isFormValid);++++++++++++++=
         */
        const isFormValid = inputs.every((input) => input.validity.valid);
        this.setSubmitButtonState(isFormValid);
    }
    enableValidation() {
        this.formVal.addEventListener('input', (event) => {
          /**
           * Надо исрпавить:
           * Использование глобального event - необходимо добавить event в параметры функции
           */
            this.setEventListeners(event);
        });
    }
}