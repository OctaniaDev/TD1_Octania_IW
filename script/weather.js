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