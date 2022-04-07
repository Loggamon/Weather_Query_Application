var searchBtn = document.getElementById("searchBtn");
var userInput = document.getElementById("userInput");
var weatherArray = "./weather_forecast.html";

var cityForecast = [];

var currentDate = new Date();
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth() + 1;
var currentYear = currentDate.getFullYear();

var h3 = document.querySelectorAll("h3");
var tempData = document.getElementById("tempData");
var windData = document.getElementById("windData");
var humidityData = document.getElementById("humidityData");
var uviData = document.getElementById("uviData");

var ulEl = document.querySelector("ul");
var historyBtn = document.createElement("button");

console.log(currentMonth + "-" + currentDay + "-" + currentYear);

function getApi(event) {
  event.preventDefault();
  var location = userInput.value;
  requestUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    location +
    "&limit=5&appid=4be4899ac70d95d939d052f41a8901e1";

  //var latitude = data[0].lat;
  //var longitude = data[0].lon;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat);
      console.log(data[0].lon);
      console.log(data[0].state);
      console.log(location);

      latitude = data[0].lat;
      longitude = data[0].lon;
      city = location;
      getWeather();
      searchHistoryBtns();
    });
}

function getWeather(data) {
  requestUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=imperial&exclude=minutely,alerts&appid=4be4899ac70d95d939d052f41a8901e1";
  var todaysDate = currentMonth + "/" + currentDay + "/" + currentYear;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.current.weather[0].icon);

      currForecast = {
        date: todaysDate,
        icon: data.current.weather[0].icon,
        temp: data.current.temp,
        humidity: data.current.humidity,
        windspeed: data.current.wind_speed,
        uvi: data.current.uvi,
      };

      console.log(currForecast);
      cityForecast.push(currForecast);

      console.log(cityForecast);
      currentData = data.current;
      forecastData = data.daily;

      getForecast();
      displayForecast();
    });
}

function getForecast() {
  //var weatherEntries = JSON.parse(localStorage.getItem(city));
  //console.log(weatherEntries);

  for (var i = 0; i < 5; i++) {
    //var weatherEntries = JSON.parse(localStorage.getItem(city));

    //forecastDate =
    //currentMonth + "/" + (currentDay + 1 + i) + "/" + currentYear;

    forecastDate = {
      date: currentMonth + "/" + (currentDay + 1 + i) + "/" + currentYear,
      icon: forecastData[i].weather[0].icon,
      temp: forecastData[i].temp.day,
      humidity: forecastData[i].humidity,
      windspeed: forecastData[i].wind_speed,
      uvi: forecastData[i].uvi,
    };

    console.log(forecastDate);

    //console.log(currentMonth + "/" + (currentDay + 1 + i) + "/" + currentYear)
    //console.log("Daily Humidity: " + forecastData[i].humidity);
    //console.log("Daily Temp: " + forecastData[i].temp.day);
    //console.log("Daily UVI Index: " + forecastData[i].uvi);
    //console.log("Daily Icon: " + forecastData[i].weather[0].icon);
    //console.log("Daily Wind Speed: " + forecastData[i].wind_speed);

    cityForecast.push(forecastDate);
    localStorage.setItem(city, JSON.stringify(cityForecast));
  }
  console.log(cityForecast);
  cityForecast = [];
  console.log(cityForecast);

  displayData();
}

function displayData() {
  var weatherEntries = JSON.parse(localStorage.getItem(city));
  console.log(weatherEntries[0]);

  var headElements = document.getElementsByTagName("h3");
  var iconElements = document.getElementsByClassName("icon");
  var tempElements = document.getElementsByClassName("temperature");
  var windElements = document.getElementsByClassName("windSpeed");
  var humiElements = document.getElementsByClassName("humidity");
  var uviElements = document.getElementsByClassName("uvi");

  for (var i = 0; i < headElements.length + 1; i++) {
    headElements[i].textContent = city + " " + weatherEntries[i].date;
    iconElements[i].setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherEntries[i].icon + "@2x.png"
    );
    iconElements[i].style.opacity = 1;
    document.getElementsByClassName("icon");
    tempElements[i].textContent = "Temp: " + weatherEntries[i].temp + " F°";
    windElements[i].textContent =
      "Wind-Speed: " + weatherEntries[i].windspeed + " MPH";
    humiElements[i].textContent =
      "Humidity: " + weatherEntries[i].humidity + "%";
    uviElements[i].textContent = "UV Index: " + weatherEntries[i].uvi;

    if (weatherEntries[i].uvi.toFixed(1) < 2) {
      uviElements[i].style.background = "rgb(0, 128, 0, 0.7)";
    } else if (
      weatherEntries[i].uvi.toFixed(1) < 5 &&
      weatherEntries[i].uvi.toFixed(1) > 2
    ) {
      uviElements[i].style.background = "rgb(255, 255, 0, 0.7)";
    } else if (
      weatherEntries[i].uvi.toFixed(1) < 7 &&
      weatherEntries[i].uvi.toFixed(1) > 5
    ) {
      uviElements[i].style.background = "rgb(255, 215, 0, 0.7)";
    } else {
      uviElements[i].style.background = "rgb(255, 0, 0, 0.7)";
    }
  }
}

function searchHistoryBtns() {
  for (i = 0; i < localStorage; i++) {
    var key = localStorage.key[i];
    console.log(key);
    historyBtn.textContent = city;
    ulEl.appendChild(historyBtn);
    historyBtn.setAttribute(
      "style",
      "background-color: var(--shadow); color: var(--boxFill); border-radius: 5px; width: 100%; padding: 3px; margin-top: 3px;"
    );
  }
}

searchBtn.addEventListener("click", getApi, searchHistoryBtns);
