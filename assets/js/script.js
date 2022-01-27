var cityInputEl = document.querySelector("#city-name");

// fetch current weather data
var getCurrentWeather = function (city) {
  var apiKey = "6f96b0c5c7809d512ddbab8d202413e7";

  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=nashville&appid=" +
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

getCurrentWeather();
