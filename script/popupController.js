function openPopup(evt) {
    evt.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscape);
    evt.addEventListener('click', closeOverlay);
}

function closePopup(evt) {
    evt.classList.remove('popup_opened');
    if (evt.classList.contains('popup__element') || evt.classList.contains('popup__profile')) {
        clearPopupForm(evt);
    }
}

function clearPopupForm(evt) {
    if (evt.classList.contains('popup__element')) {
        evt.querySelectorAll('.popup__input').forEach(input => {
            input.value = '';
        });
    }

    evt.querySelector('.popup__botton').classList.add('popup__botton_disabled');
    evt.querySelector('.popup__botton').disabled = true;
}

function closeEscape(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function closeOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}

export {openPopup, closePopup};