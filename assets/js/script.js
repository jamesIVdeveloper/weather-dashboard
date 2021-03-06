var cities = {};

var currentWeatherEl = document.querySelector("#current-weather");
var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-form");
var currentTitleEl = document.querySelector("#city-date-icon");
var weatherDataEl = document.querySelector("#weather-data");
var currentDataList = document.querySelector("#current-data-list");
var fiveDayEl = document.querySelector("#five-day-forecast");
var searchedList = document.querySelector("#searched-list");

// handle form submit
var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInputEl.value.trim();

  if (city) {
    localStorage.setItem("city", city);
    getCurrentWeather(city);
    getFiveDayForecast(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

// load cities
var loadCities = function () {
  cities = JSON.parse(localStorage("cities"));

  if (!cities) {
    cities = [];
  }
};

// save city searches to local storage
var saveCity = function () {
  localStorage.setItem("city", JSON.stringify(city));
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
  currentTitleEl.textContent = "";
  currentDataList.textContent = "";

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

// fetch five day forecast
var getFiveDayForecast = function (city) {
  apiKey = "6f96b0c5c7809d512ddbab8d202413e7";
  apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial" +
    "&appid=" +
    apiKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayFiveDayForecast(data);
        });
      } else {
        alert("Error: City not found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather");
    });
};

// display five day forecast
var displayFiveDayForecast = function (data) {
  fiveDayEl.textContent = "";

  // loop through list
  for (var i = 0; i < data.list.length; i += 8) {
    // format data
    var dateEl = data.list[i].dt_txt;
    var iconEl = data.list[i].weather[0].icon;
    var tempEl = data.list[i].main.temp;
    var windSpeedEl = data.list[i].wind.speed;
    var humidityEl = data.list[i].main.humidity;

    // create a container for each day
    var dayEl = document.createElement("div");
    dayEl.classList = "border border-dark p-2 m-2 bg-secondary text-light";

    // create h4 for date
    var dayDateEl = document.createElement("h4");
    dayDateEl.textContent = dateEl;

    // create p for icon, temp, wind speed, humidity
    var dayIconEl = document.createElement("p");
    dayIconEl.textContent = iconEl;
    var dayTempEl = document.createElement("p");
    dayTempEl.textContent = "Temperature: " + tempEl + " Fahrenheit";
    var dayWindSpeedEl = document.createElement("p");
    dayWindSpeedEl.textContent = "Wind Speed: " + windSpeedEl + "MPH";
    var dayHumidityEl = document.createElement("p");
    dayHumidityEl.textContent = "Humidity: " + humidityEl + "%";

    // append to dayEl
    dayEl.appendChild(dayDateEl);
    dayEl.appendChild(dayIconEl);
    dayEl.appendChild(dayTempEl);
    dayEl.appendChild(dayWindSpeedEl);
    dayEl.appendChild(dayHumidityEl);

    // append to fiveDayEl
    fiveDayEl.appendChild(dayEl);
  }
  console.log(dateEl, iconEl, tempEl, windSpeedEl, humidityEl);
};

// loop through local storage and make buttons
for (var i = 0; i < localStorage.length; i++) {
  // create element for local storage item
  var storedCityEl = document.createElement("button");
  storedCityEl.id = "searched-city";

  // set local storage item
  var storedCity = localStorage.getItem(localStorage.key(i));
  storedCityEl.textContent = storedCity;

  // append to list
  searchedList.appendChild(storedCityEl);
}

// add event listener for searched city button
/*
document
  .getElementById("#searched-city")
  .addEventListener("click", function () {
    var searchedCityEl = document.getElementById("#searched-city");
    var searchedCity = searchedCityEl.value.trim();
    getCurrentWeather(searchedCity);
    getFiveDayForecast(searchedCity);
  });
*/
