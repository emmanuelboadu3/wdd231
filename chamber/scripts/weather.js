// ====== weather.js ======
const apiKey = "443e9831fce9fdd2f2a9a083901ad5da";
const city = "Kumasi";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
// use imperial for °F, change to metric for °C

async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const weatherBox = document.getElementById("weather-container");
        const forecastBox = document.getElementById("forecast-container");

        // Current weather (first forecast item)
        const current = data.list[0];
        const iconCode = current.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Sunrise & Sunset come from city object
        const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        weatherBox.innerHTML = `
      <h3>Current Weather</h3>
      <p><strong>Temperature:</strong> ${current.main.temp.toFixed(1)}°F</p>
      <p><strong>Condition:</strong> ${current.weather[0].description}
        <img src="${iconUrl}" alt="${current.weather[0].description}" class="weather-icon">
      </p>
      <p><strong>High:</strong> ${current.main.temp_max.toFixed(1)}°F</p>
      <p><strong>Low:</strong> ${current.main.temp_min.toFixed(1)}°F</p>
      <p><strong>Humidity:</strong> ${current.main.humidity}%</p>
      <p><strong>Sunrise:</strong> ${sunrise}</p>
      <p><strong>Sunset:</strong> ${sunset}</p>
    `;

        // Forecast for today + next 2 days
        const forecast = data.list.filter((_, index) => index % 8 === 0).slice(0, 3);

        forecastBox.innerHTML = "<h3>Weather Forecast</h3>";
        forecast.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
            forecastBox.innerHTML += `
        <p><strong>${date}:</strong> ${day.main.temp.toFixed(1)}°F</p>
      `;
        });
    } catch (error) {
        console.error("Weather fetch error:", error);
        document.getElementById("weather-container").textContent = "Unable to load weather data.";
        document.getElementById("forecast-container").textContent = "Unable to load forecast.";
    }
}

getWeather();
