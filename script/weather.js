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
                if (!response.ok || this.codeInsee == '' || this.codeInsee == null) {
                    throw new Error('http response error');
                }
                return response.json();
            });
    }
}

export async function createWeatherCard(request) {
    try {
        let data = await request;
        let weatherCardWeek = [7];
        let date = new Date();
        for (let i = 0; i < 7; i++) {
            let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            weatherCardWeek[i] = new WeatherCard(
                data.forecast[i].tmin,
                data.forecast[i].tmax,
                data.forecast[i].probarain,
                data.forecast[i].sun_hours,
                data.forecast[i].weather,
                data.city.name,
                hours + ':' + minutes,
                date.toString().split(' ').slice(0, 4).join(' ')
            )
            weatherCardWeek[i].setOption({
                latitude: data.city.latitude,
                longitude: data.city.longitude,
                rainAccumulation: data.forecast[i].rr1,
                windAverage: data.forecast[i].wind10m,
                directionWind: data.forecast[i].dirwind10m
            });
            date.setDate(date.getDate() + 1);
        }
        return weatherCardWeek;
    } catch (err) {
        throw err;
    }
}

export class WeatherCard {
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

    setBorderStyleDesktop(optionsContainer, length) {
        for (let i = length - 1; i >= 0; i--) {
            if (optionsContainer[i].style.display == 'flex') {
                let cssClassWithBorder = false;
                for (let j = i + 1; j < length; j++) {
                    if (optionsContainer[j].style.display != 'none')
                        cssClassWithBorder = true;
                }
                if (cssClassWithBorder) {
                    optionsContainer[i].classList.remove('border-bottom-selection-v2');
                    optionsContainer[i].classList.add('border-bottom-selection');
                } else {
                    optionsContainer[i].classList.remove('border-bottom-selection');
                    optionsContainer[i].classList.add('border-bottom-selection-v2');
                }
            }
        }
    }

    setBorderStyleMobile(optionsContainer, length) {
        for (let i = length - 1; i > 0; i--) {
            if (optionsContainer[i].style.display == 'flex') {
                let cssClassWithBorder = false;
                for (let j = i + 1; j < length; j++) {
                    if (optionsContainer[j].style.display != 'none')
                        cssClassWithBorder = true;
                }
                if (cssClassWithBorder) {
                    optionsContainer[i].classList.remove('border-bottom-selection-v2');
                    optionsContainer[i].classList.add('border-bottom-selection');
                } else {
                    optionsContainer[i].classList.remove('border-bottom-selection');
                    optionsContainer[i].classList.add('border-bottom-selection-v2');
                }
            }
        }
    }

    displayOptionsDesktop(clone, optionsTable) {
        let optionsContainer = clone.getElementById('option-list').querySelectorAll("li");
        let length = optionsContainer.length;
        for (let i = length - 1; i >= 0; i--)
            optionsContainer[i].style.display = optionsTable[i] ? 'flex' : 'none';
        this.setBorderStyleDesktop(optionsContainer, length);
        let divInvisible = 0;
        for (let i = 0; i < optionsContainer.length; i++) {
            if (optionsContainer[i].style.display == 'none')
                divInvisible++;
        }
        if (divInvisible == optionsContainer.length)
            clone.getElementById('option-list').style.display = 'none';
        else
            clone.getElementById('option-list').style.display = 'block';
    }

    displayOptionsMobile(clone, optionsTable) {
        let optionsContainer = clone.getElementById('option-list').querySelectorAll("li");
        let length = optionsContainer.length;
        optionsContainer[0].style.display = 'flex';
        optionsContainer[1].style.display = 'flex';
        for (let i = length - 1; i > 1; i--)
            optionsContainer[i].style.display = optionsTable[i - 2] ? 'flex' : 'none';
        this.setBorderStyleMobile(optionsContainer, length);
    }

    setImage(image) {
        let n = this.weather;
        if (n < 2)
            image.src = "../assets/day.svg";
        if (n > 1 && n < 4)
            image.src = "../assets/cloudy-day-3.svg";
        if (n > 3 && n < 8)
            image.src = "../assets/cloudy.svg";
        if (n > 9 && n < 17)
            image.src = "../assets/rainy-7.svg";
        if (n > 19 && n < 23)
            image.src = "../assets/snowy-4.svg";
        if (n > 29 && n < 33)
            image.src = "../assets/snowy-5.svg";
        if (n > 39 && n < 49)
            image.src = "../assets/rainy-6.svg";
        if (n > 59 && n < 79)
            image.src = "../assets/snowy-6.svg";
        if (n > 99 && n < 143)
            image.src = "../assets/thunder.svg";
        if (n > 209 && n < 213)
            image.src = "../assets/rainy-5.svg";
        if (n > 219 && n < 236)
            image.src = "../assets/snowy-5.svg";
    }

    toHTML(optionsTable) {
        if (!('content' in document.createElement('template'))) return;
        if (window.innerWidth >= 1024)
            this.toHTMLDesktop(optionsTable);
        else
            this.toMobileHTML(optionsTable);
    }

    toMobileHTML(optionsTable) {
        let template = document.getElementById('weather-template');
        let clone = document.importNode(template.content, true);
        let list = clone.getElementById('weather-list');
        let paragraphes = list.querySelectorAll("p");
        let options = clone.getElementById('option-list').querySelectorAll("p");

        paragraphes[0].textContent = this.city;
        paragraphes[1].textContent = this.hour;
        paragraphes[2].textContent = this.date;
        paragraphes[3].textContent = `${this.temperatureMin}\u00b0c`;
        paragraphes[4].textContent = `${this.temperatureMin}\u00b0c / ${this.temperatureMax}\u00b0c`;
        this.setImage(clone.getElementById('middle-section-card-image'));

        options[0].textContent = `${this.probabilityRain}%`;
        options[1].textContent = `${this.sunHours}h`;
        options[2].textContent = this.options.latitude;
        options[3].textContent = this.options.longitude;
        options[4].textContent = this.options.rainAccumulation;
        options[5].textContent = this.options.windAverage;
        options[6].textContent = this.options.directionWind;
        this.displayOptionsMobile(clone, optionsTable);
        document.getElementById('weather-container').appendChild(clone);
    }

    toHTMLDesktop(optionsTable) {
        let template = document.getElementById('weather-template-desktop');
        let clone = document.importNode(template.content, true);
        let list = clone.getElementById('weather-list');
        let paragraphes = list.querySelectorAll("p");
        let options = clone.getElementById('option-list').querySelectorAll("p");

        paragraphes[0].textContent = `${this.sunHours}h`;
        paragraphes[1].textContent = `${this.probabilityRain}%`;
        paragraphes[2].textContent = this.city;
        paragraphes[3].textContent = this.hour;
        paragraphes[4].textContent = this.date;
        paragraphes[5].textContent = `${this.temperatureMin}\u00b0c`;
        paragraphes[6].textContent = `${this.temperatureMin}\u00b0c`;
        paragraphes[7].textContent = `${this.temperatureMax}\u00b0c`;
        this.setImage(clone.getElementById('middle-section-card-image'));

        options[0].textContent = this.options.latitude;
        options[1].textContent = this.options.longitude;
        options[2].textContent = this.options.rainAccumulation;
        options[3].textContent = this.options.windAverage;
        options[4].textContent = this.options.directionWind;
        this.displayOptionsDesktop(clone, optionsTable);
        document.getElementById('weather-container').appendChild(clone);
    }

    toLowerHTML() {
        if (!('content' in document.createElement('template'))) return;
        let template = document.getElementById('lower-weather-template');
        let clone = document.importNode(template.content, true);
        let paragraphes = clone.getElementById('lower-weathercard').querySelectorAll('p');
        paragraphes[0].textContent = this.date.split(' ')[0];
        this.setImage(clone.getElementById('lower-weathercard-image'));
        paragraphes[1].textContent = `${this.temperatureMax}\u00b0c`;
        paragraphes[2].textContent = `${this.temperatureMin}\u00b0c`;

        document.getElementById('lower-weather-container').appendChild(clone);

    }
}