import config from './config.json' assert{type : 'json'}

export class WeatherAPI {
    constructor(codeInsee) {
        this.url = config.url
        this.token = config.token
        this.codeInsee = codeInsee
    }

    getHttpRequest() {
        return this.url + 'forecast/daily/0?insee=' + this.codeInsee + '&token=' + this.token
    }
    
    getRequeteResult() {
        return fetch(this.getHttpRequest())
        .then(response => {
            if(!response.ok || this.codeInsee == '' || this.codeInsee == null) {
                throw new Error('http response error')
            }
            return response.json()
        })
    }
}

export async function setWeatherInformations(request){
    if(!('content' in document.createElement('template'))) return
    await request.then((data) => {
        let template = document.getElementById('weatherTemplate')
        let clone = document.importNode(template.content, true)
        let paragraphe = clone.querySelectorAll("p") 
        paragraphe[0].textContent = `température min (C°): ${data.forecast.tmin}`
        paragraphe[1].textContent = `température max (C°): ${data.forecast.tmax}`
        paragraphe[2].textContent = `probabilité pluie: ${data.forecast.probarain}%`
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