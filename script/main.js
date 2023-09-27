import * as zipCode from "./zipCode.js"
import * as weather from "./weather.js"

let zipCodeDisplay = document.getElementById('zipCodeInput');
let cityListDisplay = document.getElementById('cityNameSelect');

zipCodeDisplay.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        let request = zipCode.getHttpRequest(zipCodeDisplay, cityListDisplay)
    }
})

cityListDisplay.addEventListener('change', () => {
    let collection = cityListDisplay.selectedOptions
    if(collection[0].value != 'default') {
        const weatherAPI = new weather.WeatherAPI(collection[0].value)
        let request = weatherAPI.getRequeteResult()
        setWeatherInformations(request)
    }
})

async function setWeatherInformations(request) {
    if(!('content' in document.createElement('template'))) return
    await request.then((data) => {
        let template = document.getElementById('weatherTemplate')
        let clone = document.importNode(template.content, true)
        let paragraphe = clone.querySelectorAll("p")
        paragraphe[0].textContent = `température min (C°): ${data.forecast.tmin}`
        paragraphe[1].textContent = `température max (C°): ${data.forecast.tmax}`
        paragraphe[2].textContent = `probabilité pluie (sur 1): ${data.forecast.probarain}`
        paragraphe[3].textContent = `heures d'ensoleillement: ${data.forecast.sun_hours}`
        return clone
    })
    .then(clone => {
        let weatherContainer = document.getElementById('weatherContainer')
        if(weatherContainer != null)
            document.body.removeChild(weatherContainer)
        document.body.appendChild(clone)
    })
    .catch(err => {console.error('Error : ', err)})
}