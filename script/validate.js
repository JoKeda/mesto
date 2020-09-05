 const custom = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__botton',
    inactiveButtonClass: 'popup__botton_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

  function showInputError(inputElement, errorElement, errorMessage, custom) {
    inputElement.classList.add(custom.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(custom.errorClass);
  };
  
  function hideInputError(inputElement, errorElement, custom) {
    inputElement.classList.remove(custom.inputErrorClass);
    errorElement.classList.remove(custom.errorClass);
    errorElement.textContent = '';
  };

  function checkInputValidity(inputElement, custom) {
    const errorElement = inputElement.nextElementSibling;
    if (!inputElement.validity.valid) {
      showInputError(inputElement, errorElement, inputElement.validationMessage, custom);
    } else {
      hideInputError(inputElement, errorElement, custom);
    }
  };

  function hasInvalidInput(inputList) {
    return inputList.some( (inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  function toggleButtonState(inputList, buttonElement, custom) {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(custom.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(custom.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  function setEventListeners(formElement, custom) {
    const inputList = Array.from(formElement.querySelectorAll(custom.inputSelector));
    const buttonElement = formElement.querySelector(custom.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, custom);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(inputElement, custom);
        toggleButtonState(inputList, buttonElement, custom);
      });
    });
  };
  
  function enableValidation(custom) {
    const formList = Array.from(document.querySelectorAll(custom.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, custom);
    });
  };

  enableValidation(custom); 