import * as zipCode from "./zipCode.js"
import * as weather from "./weather.js"

let zipCodeDisplay = document.getElementById('zipCodeInput');
let cityListDisplay = document.getElementById('cityNameSelect');

zipCodeDisplay.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        zipCode.getHttpRequest(zipCodeDisplay, cityListDisplay)
    }
})

cityListDisplay.addEventListener('change', () => {
    let collection = cityListDisplay.selectedOptions
    if(collection[0].value != 'default') {
        const weatherAPI = new weather.WeatherAPI(collection[0].value)
        weatherAPI.getRequeteResult()
    }
})