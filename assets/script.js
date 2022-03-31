var searchBtn = document.getElementById("searchBtn");
var userInput = document.getElementById("userInput");



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
        })
    
    for (var i = 0; i < 5; i++) {
        
    }
}

searchBtn.addEventListener("click", getApi);