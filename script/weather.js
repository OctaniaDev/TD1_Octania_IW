const url = "https://api.meteo-concept.com/api/"
const token = "ab15e7c6132d97683df2c3839c2a64c7c19b1e6b23a38847069a8e30925ae072"

export class WeatherAPI {
    constructor(codeInsee) {
        this.url = url
        this.token = token
        this.codeInsee = codeInsee
    }

    getHttpRequest() {
        return this.url + 'forecast/daily?insee=' + this.codeInsee + '&token=' + this.token
    }
    
    getRequeteResult() {
        return fetch(this.getHttpRequest())
        .then(response => {
            if(!response.ok || this.codeInsee == '' || this.codeInsee == null) {
                throw new Error('http response error')
            }
            return response.json()
        })
        .then(data => {
            console.table(data)
        })
    }
}