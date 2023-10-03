import config from './config.json' assert{type: 'json'}

export class WeatherAPI {
    constructor(codeInsee) {
        this.url = config.url;
        this.token = config.token;
        this.codeInsee = codeInsee;
    }

    getHTTP() {
        return this.url + 'forecast/daily?insee=' + this.codeInsee + '&start=0&end=6&token=' + this.token;
    }
    
    getRequestResult() {
        return fetch(this.getHTTP())
        .then(response => {
            if(!response.ok || this.codeInsee == '' || this.codeInsee == null) {
                throw new Error('http response error');
            }
            return response.json();
        })
        .then(data => data);
    }
}

export async function createWeatherCard(request){
    try {
        let data = await request;
        let weatherCardWeek = [7];
        let date = new Date()
        for(let i = 0; i < 7; i++) {
            weatherCardWeek[i] = new WeatherCard(
                data.forecast[i].tmin,
                data.forecast[i].tmax,
                data.forecast[i].probarain,
                data.forecast[i].sun_hours,
                data.forecast[i].weather,
                data.city.name,
                date.getHours() + ':' + date.getMinutes(),
                date.toString().split(' ').slice(0, 4).join(' ')
            )
            weatherCardWeek[i].setOption({
                latitude : data.city.latitude,
                longitude : data.city.longitude,
                rainAccumulation : data.forecast[i].rr1,
                windAverage : data.forecast[i].wind10m,
                directionWind : data.forecast[i].dirwind10m
            });
        }
        return weatherCardWeek;
    } catch(err) {
        throw err;
    }
}

export class WeatherCard{
    constructor(tmin, tmax, probarain, sun_hours, weather, city, hour, date) {
        this.temperatureMin = tmin;
        this.temperatureMax = tmax;
        this.probabilityRain = probarain;
        this.sunHours = sun_hours;
        this.weather = weather,
        this.city = city,
        this.date = date,
        this.hour = hour,
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

        paragraphes[0].textContent = this.city;
        paragraphes[1].textContent = this.hour;
        paragraphes[3].textContent = this.date;
        paragraphes[4].textContent = this.temperatureMin;
        paragraphes[5].textContent = this.temperatureMin;
        paragraphes[6].textContent = this.temperatureMax;
        //paragraphes[7].textContent = `${weatherIcons(this.weather)}`;
        
        options[0].textContent = `${this.probabilityRain}%`;
        options[1].textContent = `${this.sunHours}h`;
        options[2].textContent = this.options.latitude;
        options[3].textContent = this.options.longitude;
        options[4].textContent = this.options.rainAccumulation;
        options[5].textContent = this.options.windAverage;
        options[6].textContent = this.options.directionWind;

        for (let i = 0; i < optionsTable.length; i++) {
            options[i].style.display = optionsTable[i] ? 'block' : 'none';
        }
        document.body.appendChild(clone);
    }

    toLowerHTML() {
        if(!('content' in document.createElement('template'))) return;
        let template = document.getElementById('lower-weather-template');
        let clone = document.importNode(template.content, true);
        let paragraphes = clone.getElementById('lower-weathercard').querySelectorAll('p');
        paragraphes[0].textContent = this.date;
        //paragraphes[1].textContent = `${weatherIcons(this.weather)}`;
        paragraphes[1].textContent = this.temperatureMin;
        paragraphes[2].textContent = this.temperatureMin;
        paragraphes[3].textContent = this.temperatureMax;
        document.getElementById('container-lower-weather').appendChild(clone);

    }
}