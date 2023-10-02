import * as zipCode from "./zipCode.js"
import * as weather from "./weather.js"

let zipCodeDisplay = document.getElementById('zipCodeInput');
let cityListDisplay = document.getElementById('cityNameSelect');

zipCodeDisplay.addEventListener('keypress', e => {
    if (e.key === 'Enter')
        createList()
})

cityListDisplay.addEventListener('change', () => {
    let collection = cityListDisplay.selectedOptions
    if(collection[0].value != 'default') {
        const weatherAPI = new weather.WeatherAPI(collection[0].value)
        setWeatherInformations(weatherAPI.getRequeteResult());
    }
})

function createList() {
    let request = zipCode.getHttpRequest(zipCodeDisplay)
    request
    .then(data => {
        zipCode.createList(data, cityListDisplay)
    })
    .catch(error =>{
        console.error('Error : ', error);
    });
}

async function setWeatherInformations(request) {
    try {
        let result = await weather.setWeatherInformations(request);
        let clone = result.toHTML();
        
    } catch(err) {
        console.error(err);
    }
}