import './style.css';

async function getWeather() {
    const weatherRequest = await fetch('http://api.weatherapi.com/v1/current.json?key=cb91ec8608124e5c83750430230708&q=London&aqi=yes', {
        mode: 'cors',
    });
    const weatherData = await weatherRequest.json()
    getData(weatherData)
}

function getData(requestData) {
    const tempC = requestData.current.temp_c;
    const tempF = requestData.current.temp_f;
    const condition = requestData.current.condition.text;
    const humidity = requestData.current.humidity
    console.log({tempC,tempF,humidity,condition})
}

getWeather();
