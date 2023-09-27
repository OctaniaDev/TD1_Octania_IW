const config = require('./config.json')


class WeatherAPI {
    constructor(codeInsee) {
        this.url = config.url
        this.token = config.token
        this.codeInsee = codeInsee
    }

    getHttpRequest() {
        return this.url + 'forecast/daily?insee=' + this.codeInsee + '&token=' + this.token
    }
    
    getRequeteResult() {
        return fetch(api.getHttpRequest())
        .then(response => {
            if(!response.ok || this.codeInsee == '' || this.codeInsee == null) {
                throw new Error('http response error')
            }
            return response.json()
        })
        .then(data => {
            return data.forecast
        })
    }
}