import config from './config.json' assert{type: 'json'}

export class WeatherAPI {
    constructor(codeInsee) {
        this.url = config.url;
        this.token = config.token;
        this.codeInsee = codeInsee;
    }

    getHttpRequest() {
        return this.url + 'forecast/daily/0?insee=' + this.codeInsee + '&token=' + this.token;
    }

    getRequeteResult() {
        return fetch(this.getHttpRequest())
            .then(response => {
                if (!response.ok || this.codeInsee == '' || this.codeInsee == null) {
                    throw new Error('http response error');
                }
                return response.json();
            })
            .then(data => data);
    }
}

export async function setWeatherInformations(request) {
    try {
        let data = await request;
        let weatherCard = new WeatherCard(
            data.forecast.tmin,
            data.forecast.tmax,
            data.forecast.probarain,
            data.forecast.sun_hours
        )
        weatherCard.setOption({
            latitude: data.city.latitude,
            longitude: data.city.longitude,
            rainAccumulation: data.forecast.rr1,
            windAverage: data.forecast.wind10m,
            directionWind: data.forecast.dirwind10m
        });
        return weatherCard;
    } catch (err) {
        throw err;
    }
}

export class WeatherCard {
    constructor(tmin, tmax, probarain, sun_hours) {
        this.temperatureMin = tmin;
        this.temperatureMax = tmax;
        this.probabilityRain = probarain;
        this.sunHours = sun_hours;
        this.options = {
            latitude: null,
            longitude: null,
            rainAccumulation: null,
            windAverage: null,
            directionWind: null
        }
    }

    setOption(options) {
        this.options.latitude = options.latitude;
        this.options.longitude = options.longitude;
        this.options.rainAccumulation = options.rainAccumulation;
        this.options.windAverage = options.windAverage;
        this.options.directionWind = options.directionWind;
    }

    toHTML(optionsTable) {
        if (!('content' in document.createElement('template'))) return;
        let template = document.getElementById('weather-template');
        let clone = document.importNode(template.content, true);
        let paragraphes = clone.getElementById('weather-list').querySelectorAll("p");
        let options = clone.getElementById('option-list').querySelectorAll("p");

        paragraphes[0].textContent = `température min (C°): ${this.temperatureMin}`;
        paragraphes[1].textContent = `température max (C°): ${this.temperatureMax}`;
        paragraphes[2].textContent = `probabilité pluie: ${this.probabilityRain}%`;
        paragraphes[3].textContent = `heures d'ensoleillement: ${this.sunHours}`;

        options[0].textContent = 'latitude : ' + this.options.latitude;
        options[1].textContent = 'longitude : ' + this.options.longitude;
        options[2].textContent = 'rain accumulation : ' + this.options.rainAccumulation;
        options[3].textContent = 'wind average : ' + this.options.windAverage;
        options[4].textContent = 'direction wind : ' + this.options.directionWind;

        for (let i = 0; i < optionsTable.length; i++) {
            options[i].style.display = optionsTable[i] ? 'block' : 'none';
        }

        let weatherContainer = document.getElementById('weather-container');

        if (weatherContainer != null)
            document.body.removeChild(weatherContainer);
        document.body.appendChild(clone);
    }
}