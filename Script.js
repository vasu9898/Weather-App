document.getElementById("location-input").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        document.getElementById("search-button").click();
    }
});

const searchButton = document.getElementById("search-button");
const container = document.querySelector('.container');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

searchButton.addEventListener('click', async () => {
    const apiKey = '728b0ee6df5687559812bd3169ad77b7'; // Replace with your OpenWeatherMap API key
    const city = document.getElementById('location-input').value;

    if (city === '') return;

    const response = await fetch(https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ea7f865aa1d63d118942e1db48658289);
    const data = await response.json();

    if (data.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const weatherIcon = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');
    const pressure = document.querySelector('.weather-details .pressure-details span');
    const visibility = document.querySelector('.weather-details .visibility-details span');

    switch (data.weather[0].main) {
        case 'Clear':
            weatherIcon.src = 'images/clear.png';
            break;
        case 'Rain':
            weatherIcon.src = 'images/rain.png';
            break;
        case 'Snow':
            weatherIcon.src = 'images/snow.png';
            break;
        case 'Clouds':
            weatherIcon.src = 'images/cloud.png';
            break;
        case 'Haze':
        case 'Mist':
            weatherIcon.src = 'images/mist.png';
            break;
        case 'Smoke':
            weatherIcon.src = 'images/smoke.png';
            break;
        case 'Sand':
        case 'Dust':
            weatherIcon.src = 'images/sand.png';
            break;
        default:
            weatherIcon.src = '';
    }

    temperature.innerHTML = ${parseInt(data.main.temp)}<span>°C</span>;
    description.innerHTML = data.weather[0].description;
    humidity.innerHTML = ${data.main.humidity}%;
    wind.innerHTML = ${parseInt(data.wind.speed)}Km/h;
    pressure.innerHTML = ${data.main.pressure} mb;
    visibility.innerHTML = ${data.visibility / 1000} km;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
});
