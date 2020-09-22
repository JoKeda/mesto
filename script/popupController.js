function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscape);
    popup.addEventListener('click', closeOverlay);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    if (popup.classList.contains('popup__element') || popup.classList.contains('popup__profile')) {
        clearPopupForm(popup);
    }
    document.removeEventListener('keydown', closeEscape); 
}

function clearPopupForm(popup) {
    if (popup.classList.contains('popup__element')) {
        popup.querySelectorAll('.popup__input').forEach(input => {
            input.value = '';
        });
    }

    popup.querySelector('.popup__botton').classList.add('popup__botton_disabled');
    popup.querySelector('.popup__botton').disabled = true;
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