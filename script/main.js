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
        setWeatherInformations(weatherAPI.getRequeteResult());
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
                weatherCard.toHTML(optionsTable);
        });
    }
}

function createList() {
    let request = zipCode.getHttpRequest(zipCodeDisplay)
    request
    .then(data => {
        zipCode.createList(data, cityListDisplay);
    })
    .catch(error =>{
        console.error('Error : ', error);
    });
}

async function setWeatherInformations(request) {
    try {
        weatherCard = await weather.setWeatherInformations(request);
        weatherCard.toHTML(optionsTable);
    } catch(err) {
        console.error(err);
    }
}

eventHandlerOptions();