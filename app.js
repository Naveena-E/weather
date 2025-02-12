const apiKey = '003a38000716362524ef9eab26cc6fc9'; // Replace with your OpenWeatherMap API Key
const baseUrl = "https://home.openweathermap.org/api_keys";

const getWeatherBtn = document.getElementById("get-weather-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const weatherDescription = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const errorMessage = document.getElementById("error-message");

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        errorMessage.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === "404") {
            errorMessage.classList.remove("hidden");
            weatherInfo.classList.add("hidden");
        } else {
            errorMessage.classList.add("hidden");
            weatherInfo.classList.remove("hidden");

            cityName.textContent = `${data.name}, ${data.sys.country}`;
            weatherDescription.textContent = data.weather[0].description;
            temperature.textContent = `${data.main.temp}°C`;
        }
    } catch (error) {
        console.error(error);
        errorMessage.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
    }
}
