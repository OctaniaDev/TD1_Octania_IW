import * as zipCode from "./zipCode.js"
import * as weather from "./weather.js"

let zipCodeDisplay = document.getElementById('zip-code-input');
let cityListDisplay = document.getElementById('city-name-select');
let optionsTable = [false, false, false, false, false];
let weatherCard;

zipCodeDisplay.addEventListener('keypress', e => {
    if (e.key === 'Enter') createList();
});

cityListDisplay.addEventListener('change', () => {
    let collection = cityListDisplay.selectedOptions
    if(collection[0].value != 'default') {
        const weatherAPI = new weather.WeatherAPI(collection[0].value);
        createWeatherCard(weatherAPI.getRequestResult());
    }
});

function eventHandlerOptions() {
    let weatherOptionsContainer = document.getElementById('weather-options-container');
    let options = weatherOptionsContainer.querySelectorAll('input');
    for(let i = 0; i < options.length; i++) {
        options[i].addEventListener('change', e => {
            if(e.target.checked)
                optionsTable[i] = true;
            else
                optionsTable[i] = false;
            if(weatherCard != null)
                displayWeatherCards();
        });
    }
}

function createList() {
    let request = zipCode.getRequestResult(zipCodeDisplay)
    request
    .then(data => {
        zipCode.createList(data, cityListDisplay);
    })
    .catch(error =>{
        console.error('Error : ', error);
    });
}

function displayWeatherCards() {
    let weatherContainer = document.getElementById('weather-container');
    if(weatherContainer != null)
        document.body.removeChild(weatherContainer);
    for(let i = 0; i < weatherCard.length; i++) {
        weatherCard[0].toHTML(optionsTable);
    }
}

async function createWeatherCard(request) {
    try {
        weatherCard = await weather.createWeatherCard(request);
        displayWeatherCards();
    } catch(err) {
        console.error(err);
    }
}

eventHandlerOptions();