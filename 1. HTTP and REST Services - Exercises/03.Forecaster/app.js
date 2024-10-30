function attachEvents() {
    document.querySelector('#submit').addEventListener('click', getWeather);
    const userInputRef = document.querySelector('#location');
    const forecastDivRef = document.querySelector('#forecast');
    const currentWeatherDivRef = document.querySelector('#current');
    const upcomingWeatherDivRef = document.querySelector('#upcoming');

    const endPoint = {
        getWeather: 'http://localhost:3030/jsonstore/forecaster/locations',
        getCurrentWeather: 'http://localhost:3030/jsonstore/forecaster/today/',
        getUpcomingWeather: 'http://localhost:3030/jsonstore/forecaster/upcoming/'
    }

    const symbols = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        'Overcast': '&#x2601', // ☁
        'Rain': '&#x2614', // ☂
        'Degrees': '&#176'   // °
    }

    async function getWeather(e) {
        e.preventDefault();
        try {
            forecastDivRef.style.display = 'block';

            const response = await fetch(endPoint.getWeather);
            const weatherData = await response.json();

            const city = weatherData.find(city => city.name === userInputRef.value);

            getTodayWeather(city.code);
            getUpcomingWeather(city.code);
        } catch (error) {
            forecastDivRef.innerHTML = 'Error'
        }
        clear();
    }

    async function getTodayWeather(code) {
        const response = await fetch(endPoint.getCurrentWeather + code);
        const todayData = await response.json();

        const divForecast = renderTodayData(todayData);
        currentWeatherDivRef.appendChild(divForecast)
    }

    async function getUpcomingWeather(code) {
        const response = await fetch(endPoint.getUpcomingWeather + code);
        const upcomingData = await response.json();

        const div = document.createElement('div');
        div.classList.add('forecast-info');

        Object.values(upcomingData.forecast).forEach(day => {
            const spanUpcoming = renderUpcomingData(day);
            div.appendChild(spanUpcoming);
        })

        upcomingWeatherDivRef.appendChild(div)
    }

    function renderTodayData(data) {
        const div = document.createElement('div');
        div.classList.add('forecast');
        const spanSymbol = spanGenerator(['condition', 'symbol'], symbols[data.forecast.condition]);
        const spanWeather = spanGenerator(['condition']);
        const spanCity = spanGenerator(['forecast-data'], data.name);
        const spanDegrees = spanGenerator(['forecast-data'], `${data.forecast.low}${symbols.Degrees}/${data.forecast.high}${symbols.Degrees}`);
        const spanCondition = spanGenerator(['forecast-data'], data.forecast.condition);

        spanWeather.append(spanCity, spanDegrees, spanCondition);
        div.append(spanSymbol, spanWeather);
        return div;
    }

    function renderUpcomingData(data) {
        const spanUpcoming = spanGenerator(['upcoming']);
        const spanSymbol = spanGenerator(['symbol'], symbols[data.condition]);
        const spanDegrees = spanGenerator(['forecast-data'], `${data.low}${symbols.Degrees}/${data.high}${symbols.Degrees}`);
        const spanCondition = spanGenerator(['forecast-data'], data.condition);
        spanUpcoming.append(spanSymbol, spanDegrees, spanCondition);
        return spanUpcoming;
    }

    function spanGenerator(classList, text) {
        const span = document.createElement('span');
        classList.forEach((cl) => span.classList.add(cl));
        text ? span.innerHTML = text : null;
        return span;
    }

    function clear() {
        userInputRef.value = '';
        currentWeatherDivRef.querySelector(':nth-child(2)').innerHTML = ''
    }

    function clear() {
        userInputRef.value = '';
        Array.from(currentWeatherDivRef.children).forEach((x, i) => {
            if (i !== 0) {
                return x.remove();
            }
        })
        Array.from(upcomingWeatherDivRef.children).forEach((x, i) => {
            if (i !== 0) {
                return x.remove();
            }
        })
    }
}

attachEvents();