var searchBtn = document.getElementById("searchBtn");
var userInput = document.getElementById("userInput");
var weatherArray = "./weather_forecast.html"



function getApi(event) {
    event.preventDefault();
    var location = userInput.value;
    requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=5&appid=4be4899ac70d95d939d052f41a8901e1"
    
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
            getWeather();
        });
}

function getWeather(data) {
    requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=minutely,alerts&appid=4be4899ac70d95d939d052f41a8901e1"

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.current.uvi);
            console.log(data.current.humidity);
            console.log(data.current.wind_speed);
            console.log(data.current.weather[0].icon);
            
            currentData = data.current;
            forecastData = data.daily;
            getForecast();

            //document.location = weatherArray;
        })
    
}

function getForecast() {
    for (var i = 0; i < 5; i++) {
        console.log(forecastData[i].humidity);
        console.log(forecastData[i].temp.day);
        console.log(forecastData[i].uvi);
        console.log(forecastData[i].weather[0].icon);
        console.log(forecastData[i].wind_speed);
    }
}

searchBtn.addEventListener("click", getApi);