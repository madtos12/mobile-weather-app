// Search Bar to Change City
function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  searchCity(city.value);
}

// Display Current Weather
function showWeather(response) {
  let dateElement = document.querySelector("#date"); // Current Date
  let temperatureElement = document.querySelector("#temperature"); // Current Temp in Celsius
  let locationElement = document.querySelector("h1"); // Current Location
  let descriptionElement = document.querySelector("h2"); // Current Weather Description (ex: cloudy)
  let windElement = document.querySelector("#current-wind"); // Current Wind
  let humidityElement = document.querySelector("#current-humidity"); // Current Humidity
  let iconElement = document.querySelector("#icon"); // Weather Description Icon

  celsiusTemperature = response.data.main.temp;

  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  locationElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Display Forecast
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-3"><h3>${formatHours(
      forecast.dt * 1000
    )}
      </h3>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png"/>
      <div class="weather-forecast-temperature">
      <strong>${Math.round(forecast.main.temp_max)}° </strong> ${Math.round(
      forecast.main.temp_min
    )}°
      </div>
    </div>
  `;
  }
}

// Change Location
function searchCity(city) {
  let apiKey = "cfc9c1e0d02563615818515dbfa8683d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

// Current Location
function searchLocation(position) {
  let apiKey = "cfc9c1e0d02563615818515dbfa8683d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Current Date & Time
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

// Convert to Fahrenheit
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

// Convert to Celsius
function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", changeCity);

// Defaults to Display Toronto Weather & Forecast
searchCity("Toronto");
