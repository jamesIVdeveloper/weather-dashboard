var currentWeatherEl = document.querySelector("#current-weather");
var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-form");
var currentTitleEl = document.querySelector("#city-date-icon");
var weatherDataEl = document.querySelector("#weather-data");
var currentDataList = document.querySelector("#current-data-list");

// handle form submit
var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInputEl.value.trim();

  if (city) {
    getCurrentWeather(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

// fetch current weather data
var getCurrentWeather = function (city) {
  var apiKey = "6f96b0c5c7809d512ddbab8d202413e7";

  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial" +
    "&appid=" +
    apiKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayCurrentWeather(data, city);
        });
      } else {
        alert("Error: City not found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather");
    });
};

// add event listener for form submit
cityFormEl.addEventListener("submit", formSubmitHandler);

// display current weather
var displayCurrentWeather = function (data, searchTerm) {
  currentTitleEl.textContent = searchTerm + " " + data.weather[0].icon;

  var tempEl = document.createElement("li");
  tempEl.textContent = "Temperature: " + data.main.temp + " Fahrenheit";

  var humidityEl = document.createElement("li");
  humidityEl.textContent = "Humidity: " + data.main.humidity + "%";

  var windSpeedEl = document.createElement("li");
  windSpeedEl.textContent = "Wind Speed: " + data.wind.speed + "MPH";

  // var uvIndex = data;

  currentDataList.appendChild(tempEl);
  currentDataList.appendChild(humidityEl);
  currentDataList.appendChild(windSpeedEl);
  // currentDataList.appendChild();
};
