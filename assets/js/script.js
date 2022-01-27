var currentWeatherEl = document.querySelector("#current-weather");
var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-form");

// handle form submit
var formSubmitHandler = function (event) {
  event.preventDefault();

  console.log("working");

  var city = cityInputEl.value.trim();

  if (city) {
    getCurrentWeather(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

// add event listener for form submit
cityFormEl.addEventListener("submit", formSubmitHandler);

// fetch current weather data
var getCurrentWeather = function (city) {
  var apiKey = "6f96b0c5c7809d512ddbab8d202413e7";

  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error: City not found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather");
    });
};

getCurrentWeather("nashville");
