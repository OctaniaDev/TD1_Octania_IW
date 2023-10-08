let zipCodeInput = document.getElementById('zip-code-input');
let citySelectContainer = document.getElementById('city-select-container');
let selectArrow = document.getElementById('select-arrow');
let notification = document.getElementById('notification');
let notificationMessage = document.getElementById('notification-message');

/**
 * This function make the request to the API
 * @param {String} zipCodeDisplay Values from input
 * @returns {Array} Array with all datas about the zip code
 */
export function getRequestResult(zipCodeDisplay) {
    let url = 'https://geo.api.gouv.fr/communes?codePostal=' + zipCodeDisplay.value;
    return fetch(url)
        .then(reponse => {
            if (!reponse.ok)
                throw new Error('Error something went wrong');
            return reponse.json();
        })
}

/**
 * This function takes numbers from the input and make
 * @param {Array} data Information about zip code like city name, insee code, ...
 * @param {Element} list Select elements
 */
export function createList(data, list) {
    list.innerHTML = '<option value="default">Choose your city...</option>'
    for (let i = 0; i <= data.length - 1; i++) {
        let option = document.createElement('option');
        option.value = data[i].code;
        option.textContent = data[i].nom;
        list.appendChild(option);
    }
}



zipCodeInput.addEventListener('input', function () {
    let inputValue = this.value;
    inputValue = inputValue.replace(/\D/g, '');
    inputValue = inputValue.slice(0, 5);
    this.value = inputValue;

    if (inputValue.length === 5) {
        getRequestResult(zipCodeInput)
            .then(data => {
                if (data.length === 0) {
                    showNotification("Invalid zip code. Please enter a valid zip code.");
                    citySelectContainer.style.display = 'none';
                } else {
                    createList(data, document.getElementById('city-name-select'));
                    citySelectContainer.style.display = 'block';
                    selectArrow.classList.add('arrow-animation');
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    } else {
        citySelectContainer.style.display = 'none';
        selectArrow.classList.remove('arrow-animation');
    }
});

/**
 * This function takes a message a display
 * @param {*} message 
 */
function showNotification(message) {
    notificationMessage.innerText = message;
    notification.classList.remove('hide');
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

/**
 * This function is used to hide the notification system when a user fail his input
 */
function hideNotification() {
    notification.classList.add('hide');
}
