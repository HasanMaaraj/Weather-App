import './style.css';

const APIKey = '2169b314ae6347c5b7d73631230808';

const getWeather = async (location) => {
    clearMainContent();
    const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${location}&days=3&aqi=yes&alerts=yes`;
    const forecastWeatherResponse = await fetch(forecastURL, {mode:'cors'});
    const forecastWeatherData = await forecastWeatherResponse.json();
    const forecastDays = (await forecastWeatherData).forecast.forecastday;
    const forecastWeatherInformation = getForecastInformation(await forecastDays)
    console.log(await forecastWeatherInformation);
    const locationHeader = document.createElement('h2')
    locationHeader.className = 'location-header';
    locationHeader.textContent = location;
    document.getElementById('main-content').appendChild(locationHeader);
    Array.from(await forecastWeatherInformation).forEach(day => createDayCard(day))
    console.log('forecast', await forecastWeatherInformation);

}


const createDayCard = (day) => {
    const dayCard = document.createElement('div');
    dayCard.className = 'day-card';
    // Card header elements
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    const dayName = document.createElement('div');
    dayName.className = 'day-name';
    dayName.textContent = day.day;
    cardHeader.appendChild(dayName);
    const dayDate = document.createElement('div');
    dayDate.className = 'day-date';
    dayDate.textContent = day.date;
    cardHeader.appendChild(dayDate);
    const dayIcon = document.createElement('img');
    dayIcon.className = 'day-condition-icon';
    dayIcon.src = day.icon;
    cardHeader.appendChild(dayIcon);
    const dayCondition = document.createElement('div');
    dayCondition.className = 'day-condition';
    dayCondition.textContent = day.condition;
    cardHeader.appendChild(dayCondition);
    dayCard.appendChild(cardHeader);
    // Card body elements
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const temperature = document.createElement('div');
    temperature.className = 'temperature';
    temperature.textContent = `${day.tempC}°C`;
    cardBody.appendChild(temperature)
    const windSpeed = document.createElement('div');
    windSpeed.className = 'wind-speed';
    windSpeed.textContent = `Wind speed: ${day.windSpeedK} Km/h`;
    cardBody.appendChild(windSpeed)
    const humidity = document.createElement('div');
    humidity.className = 'humidity';
    humidity.textContent = `Humidity: ${day.humidity}%`;
    cardBody.appendChild(humidity)
    const chanceOfRain = document.createElement('div');
    chanceOfRain.className = 'rain';
    chanceOfRain.textContent = `Chance Of Rain: ${day.chanceOfRain}%`;
    cardBody.appendChild(chanceOfRain)
    const chanceOfSnow = document.createElement('div');
    chanceOfSnow.className = 'snow';
    chanceOfSnow.textContent = `Chance Of Snow: ${day.chanceOfSnow}%`;
    cardBody.appendChild(chanceOfSnow)
    dayCard.appendChild(cardBody);
    // Card footer elements
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    const imperial = document.createElement('button');
    imperial.className = 'imperial-btn'
    imperial.textContent = 'Imperial';
    // Convert to imperial units
    imperial.addEventListener('click', () => {
        temperature.textContent = `${day.tempF}°F`;
        windSpeed.textContent = `Wind speed: ${day.windSpeedM} mi/h`;
    });
    cardFooter.appendChild(imperial);
    const metric = document.createElement('button');
    metric.className = 'metric-btn'
    metric.textContent = 'Metric';
    // Convert to metric units
        metric.addEventListener('click', () => {
        temperature.textContent = `${day.tempC}°C`;
        windSpeed.textContent = `Wind speed: ${day.windSpeedK} Km/h`;
        console.log(temperature)
    });
    cardFooter.appendChild(metric);
    dayCard.appendChild(cardFooter);

    document.getElementById('main-content').appendChild(dayCard);

}

const clearMainContent = () => {
    // Clear main-content div
    const mainContent = document.getElementById('main-content');
    Array.from(mainContent.childNodes).forEach(node => node.remove());
}




const getForecastInformation = async (forecastDays) => {
    const forecastDaysInformation = forecastDays.map(day => {
        const dayData = day.day;
        return {
            date: day.date,
            tempC: dayData.avgtemp_c,
            day: new Date(day.date).toLocaleDateString('en-US', {weekday: 'long'}),
            tempF: dayData.avgtemp_f,
            condition: dayData.condition.text,
            icon: dayData.condition.icon,
            humidity: dayData.avghumidity,
            windSpeedK: dayData.maxwind_kph,
            windSpeedM: dayData.maxwind_mph,
            chanceOfRain: dayData.daily_chance_of_rain,
            chanceOfSnow: dayData.daily_chance_of_snow,
        };
    })
    return forecastDaysInformation;
}


document.getElementById('location-form').addEventListener('submit', e => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    // try {
        const info = getWeather(location);
        console.log('info', info)
        // .catch(() => alert(`${location} is not a location`));
    // } 
    // catch {
    //     alert(`${location} is not a location`)
    // }
})