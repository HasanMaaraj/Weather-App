import './style.css';

async function getWeather() {
    const weatherRequest = await fetch('http://api.weatherapi.com/v1/current.json?key=cb91ec8608124e5c83750430230708&q=London&aqi=yes', {
        mode: 'cors',
    });
    const weatherData = await weatherRequest.json()
    return weatherData
}

console.log(await getWeather());