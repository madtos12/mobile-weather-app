// Search Bar to Change City
function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", changeCity);

// Display Weather
function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  // Display Location Temperature
  document.querySelector("h3").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  // Display humidity
  document.querySelector("#current-humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  // Display Wind
  document.querySelector("#current-wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  // Display Weather Description
  document.querySelector("h2").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "cfc9c1e0d02563615818515dbfa8683d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

// Current Location
function searchLocation(position) {
  let apiKey = "cfc9c1e0d02563615818515dbfa8683d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Current Date & Time
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

searchCity("Toronto");
