import * as zipCode from "./zipCode.js"
import * as weather from "./weather.js"
import * as modal from './modal.js';
import * as loader from './loader.js';


let zipCodeDisplay = document.getElementById('zip-code-input');
let cityListDisplay = document.getElementById('city-name-select');
let optionsTable = [false, false, false, false, false];
let weatherCard;
let weatherCardIndex = [0, 1, 2, 3, 4, 5, 6];
let width = window.innerWidth;

zipCodeDisplay.addEventListener('input', e => {
    createList();
});

cityListDisplay.addEventListener('change', () => {
    let collection = cityListDisplay.selectedOptions
    if (collection[0].value != 'default') {
        const weatherAPI = new weather.WeatherAPI(collection[0].value);
        createWeatherCard(weatherAPI.getRequestResult());
    }
});

/**
 * Change display of options depending of checkboxs
 */
function eventHandlerOptions() {
    let weatherOptionsContainer = document.getElementById('weather-options-container');
    let options = weatherOptionsContainer.querySelectorAll('input');
    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener('change', e => {
            if (e.target.checked)
                optionsTable[i] = true;
            else
                optionsTable[i] = false;
            if (weatherCard != null)
                displayWeatherCards();
        });
    }
}

/**
 * Create list of cites
 */
function createList() {
    let request = zipCode.getRequestResult(zipCodeDisplay)
    request
        .then(data => {
            zipCode.createList(data, cityListDisplay);
        })
        .catch(error => {
            console.error('Error : ', error);
        });
}

/**
 * This is used to change order of weather cards to fits to the originaly order
 * @param {int} i 
 */
function sortWeatherIndexs(i) {
    let temp = weatherCardIndex[0];
    weatherCardIndex[0] = weatherCardIndex[i + 1];
    weatherCardIndex[i + 1] = temp;
    let tempWeatherCardIndex = weatherCardIndex.slice(1, weatherCardIndex.length).sort();
    for (let i = 0; i < tempWeatherCardIndex.length; i++)
        weatherCardIndex[i + 1] = tempWeatherCardIndex[i];
}

/**
 * This is the event handler for the click event on the little weather cards
 */
function eventHandlerLowWeather() {
    let divs = document.getElementsByClassName('lower-weathercard-div');
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', e => {
            sortWeatherIndexs(i);
            displayWeatherCards();
        });
    }
}

/**
 * This is used to remove weather cards
 */
function removeWeatherCards() {
    let weatherContainer = document.getElementById('weather-container');
    let weatherLowerContainer = document.getElementById('lower-weather-container');
    weatherContainer.innerHTML = null;
    weatherLowerContainer.innerHTML = null;
}

/**
 * This is used to display weather cards
 */
function displayWeatherCards() {
    removeWeatherCards();
    weatherCard[weatherCardIndex[0]].toHTML(optionsTable);
    for (let i = 1; i < weatherCard.length; i++)
        weatherCard[weatherCardIndex[i]].toLowerHTML(optionsTable);
    eventHandlerLowWeather();
}

/**
 * Create the weather card
 * @param {Array} request 
 */
async function createWeatherCard(request) {
    try {
        weatherCard = await weather.createWeatherCard(request);
        displayWeatherCards();
    } catch (err) {
        console.error(err);
    }
}

window.addEventListener('resize', () => {
    if ((width >= 1024 && window.innerWidth < 1024) || (width < 1024 && window.innerWidth >= 1024)) {
        if (weatherCard != null)
            displayWeatherCards();
        width = window.innerWidth;
    }
});

modal.setupModal();
eventHandlerOptions();