const apiKey = "443e9831fce9fdd2f2a9a083901ad5da";
const city = "Kumasi";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

async function getWeather() {
    // Grab the containers
    const weatherBox = document.getElementById("weather-container");
    const forecastBox = document.getElementById("forecast-container");

    //  Guard clause: if these elements don’t exist.
    if (!weatherBox || !forecastBox) return;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Current weather
        const current = data.list[0];
        const iconCode = current.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        weatherBox.innerHTML = `
            <h4>Current Weather</h4>
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

        // Forecast for next 3 days
        const forecast = data.list.filter((_, index) => index % 8 === 0).slice(0, 3);
        let forecastHTML = '';
        forecast.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
            forecastHTML += `<p><strong>${date}:</strong> ${day.main.temp.toFixed(1)}°F</p>`;
        });
        forecastBox.innerHTML = forecastHTML;

    } catch (error) {
        console.error("Weather fetch error:", error);
        if (weatherBox) weatherBox.textContent = "Unable to load weather data.";
        if (forecastBox) forecastBox.textContent = "Unable to load forecast.";
    }
}

// Run it
getWeather();
