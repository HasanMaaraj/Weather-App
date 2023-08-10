import './style.css';

const APIKey = '2169b314ae6347c5b7d73631230808';

async function getWeather(location) {
    const currentURL = `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${location}`;
    const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${location}&days=3&aqi=yes&alerts=yes`;
    const currentweatherRespnese = fetch(currentURL, {mode: 'cors'});
    const forecastWeatherResponse = fetch(forecastURL, {mode:'cors'});
    const weatherResponse = await Promise.all([
        currentweatherRespnese,
        forecastWeatherResponse,
    ])
    
    const weatherData = weatherResponse.map(value => value.json())
    console.log('response', weatherResponse)
    const [currentWeatherData, forecastWeatherData] = weatherData;
    const currentWeatherInformation = getCurrentInformation(await currentWeatherData)
    const forecastWeatherInformation = getForecastInformation(await forecastWeatherData)
    return currentWeatherData

}

function getForecastInformation(requestData) {

}

function getCurrentInformation(requestData) {
    console.log(requestData)
    const tempC = requestData.current.temp_c;
    const tempF = requestData.current.temp_f;
    const condition = requestData.current.condition.text;
    const humidity = requestData.current.humidity;
    const windSpeedK = requestData.current.wind_kph;
    const windSpeedM = requestData.current.wind_mph;
    const windDirection = requestData.current.wind_dir;
    return {tempC,tempF,humidity,condition,windDirection,windSpeedK,windSpeedM};
}

console.log('data', await getWeather('manama'));