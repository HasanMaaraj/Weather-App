import './style.css';

const APIKey = '2169b314ae6347c5b7d73631230808';

async function getWeather(location) {
    const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${location}&days=3&aqi=yes&alerts=yes`;
    const forecastWeatherResponse = await fetch(forecastURL, {mode:'cors'});
    const forecastWeatherData = await forecastWeatherResponse.json();
    const forecastDays = (await forecastWeatherData).forecast.forecastday;
    const forecastWeatherInformation = getForecastInformation(await forecastDays)
    return forecastWeatherInformation;

}

function getForecastInformation(forecastDays) {
    console.log(forecastDays)
    const forecastDaysInformation = forecastDays.map(day => {
        const dayData = day.day
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
            ChanceOfSnow: dayData.daily_chance_of_snow,
        }
    })
    console.log('forecast', forecastDaysInformation)
}
