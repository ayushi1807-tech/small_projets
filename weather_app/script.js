document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.querySelector(".input-box");
    const searchBtn = document.getElementById("searchBtn");
    const weatherBody = document.querySelector(".weather-body");
    const locationNotFound = document.querySelector(".location-not-found");
    const weatherImg = document.querySelector(".weather-img");
    const temperature = document.querySelector(".temperature");
    const description = document.querySelector(".description");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");

    async function fetchWeather(city) {
        const apiKey = "d7dfda00a624cf80c504a687584c5391";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.cod === "404") {
                locationNotFound.style.display = "block";
                weatherBody.style.display = "none";
                return;
            }

            locationNotFound.style.display = "none";
            weatherBody.style.display = "flex";

            temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
            description.innerHTML = data.weather[0].description;
            humidity.innerHTML = `${data.main.humidity}%`;
            windSpeed.innerHTML = `${data.wind.speed} Km/H`;

            const weatherCondition = data.weather[0].main.toLowerCase();
            const weatherImages = {
                clouds: "images/cloud.png",
                clear: "images/clear.png",
                rain: "images/rain.png",
                mist: "images/mist.png",
                snow: "images/snow.png"
            };

            weatherImg.src = weatherImages[weatherCondition] || "images/404.png";
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    searchBtn.addEventListener("click", () => {
        fetchWeather(inputBox.value);
    });
});
