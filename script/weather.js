import config from './config.json' assert{type : 'json'}

export class WeatherAPI {
    constructor(codeInsee) {
        this.url = config.url;
        this.token = config.token;
        this.codeInsee = codeInsee;
    }

    getHttpRequest() {
        return this.url + 'forecast/daily?insee=' + this.codeInsee + '&start=0&end=6&token=' + this.token;
    }
    
    getRequeteResult() {
        return fetch(this.getHttpRequest())
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
        console.log(data)
        let weatherCardWeek = [7];
        for(let i = 0; i < 7; i++) {
            weatherCardWeek[i] = new WeatherCard(
                data.forecast[i].tmin,
                data.forecast[i].tmax,
                data.forecast[i].probarain,
                data.forecast[i].sun_hours
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
    constructor(tmin, tmax, probarain, sun_hours) {
        this.temperatureMin = tmin;
        this.temperatureMax = tmax;
        this.probabilityRain = probarain;
        this.sunHours = sun_hours;
        this.options = {
            latitude : null,
            longitude : null,
            rainAccumulation : null,
            windAverage : null,
            directionWind : null
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
        if(!('content' in document.createElement('template'))) return;
        let template = document.getElementById('weather-template');
        let clone = document.importNode(template.content, true);
        let paragraphes = clone.getElementById('weather-list').querySelectorAll("p"); 
        let options = clone.getElementById('option-list').querySelectorAll("p");

        paragraphes[0].textContent = `tempÃ©rature min (CÂ°): ${this.temperatureMin}`;
        paragraphes[1].textContent = `tempÃ©rature max (CÂ°): ${this.temperatureMax}`;
        paragraphes[2].textContent = `probabilitÃ© pluie: ${this.probabilityRain}%`;
        paragraphes[3].textContent = `heures d'ensoleillement: ${this.sunHours}`;

        options[0].textContent = 'latitude : ' +this.options.latitude; 
        options[1].textContent =  'longitude : ' +this.options.longitude;
        options[2].textContent =  'rain accumulation : ' +this.options.rainAccumulation;
        options[3].textContent =  'wind average : ' + this.options.windAverage;
        options[4].textContent =  'direction wind : ' +this.options.directionWind;
        
        for(let i = 0; i < optionsTable.length; i++) {
            options[i].style.display = optionsTable[i] ? 'block' : 'none'; 
        }
        document.body.appendChild(clone);
    }
}