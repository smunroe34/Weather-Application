function formatDate(timestamp) {
  let date= new Date(timestamp);
  let month = ["January", "Feburay","March","April","May","June","July","August","September","October","November","December"];  
  let months = month[date.getMonth()];
  let dates = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${months} ${dates}, ${hours}:${minutes}`
}
function getForecast (coordinates) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get (apiUrl).then (displayForecast);
}

function displayTemperature (response) {
  let temperatureElement = document.querySelector ("#today-temp");
  let cityElement = document.querySelector ("#city");
  let descriptionElement = document.querySelector ("#description");
  let humidityElement = document.querySelector ("#humidity");
  let windElement = document.querySelector ("#wind");
  let dateElement = document.querySelector ("#date");
  let iconElement = document.querySelector ("#icon");
  
  celsiusTemperature = response.data.main.temp;
  
  temperatureElement.innerHTML = Math.round (celsiusTemperature);
  cityElement.innerHTML= response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round (response.data.wind.speed);
  dateElement.innerHTML = formatDate (response.data.dt * 1000);
  iconElement.setAttribute ("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",response.data.weather[0].description);
  
getForecast(response.data.coord);
}
function search(city) {
let apiKey = "dc55516602874d9b155a4733747850c9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get (apiUrl).then (displayTemperature);
}

function handleSubmit(event){
event.preventDefault();
let cityInput = document.querySelector ("#city-input");
search (cityInput.value);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position) {
  let apiKey = "dc55516602874d9b155a4733747850c9";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}
function showCurrentTemperature(response) {
  let temperatureElement = document.querySelector("city");
  temperatureElement.innerHTML = `${response.data.name}`;

  showTemperature(response);
}

function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector ("#forecast");


let forecastHTML = `<div class ="row">`;
let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday","Tuesday"]
forecast.forEach (function(forecastDay, index) {
  if (index <6) {
  forecastHTML = forecastHTML + ` 
              <div class="col-2">
                <div class="weather-forecast-date">
                ${formatDay(forecastDay.dt)}
                </div>
                <img src= "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"; alt="sunny" width= "70px" />
                <br>
              <div class="weather-temperatures"> 
                <span class="weather-forecast-temperature-max">
                ${Math.round(forecastDay.temp.max)}??
                </span> 
                <span class="weather-forecast-temperature-min">
                ${Math.round (forecastDay.temp.min)}??
                </span>
              </div>
              </div>`;
  }
});

function formatDay (timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sunday", "Monday", "Tuesday","Wednesday","Thursday", "Friday","Saturday"]
return days [day]
}
  forecastHTML = forecastHTML +`</div>`;       
  forecastElement.innerHTML = forecastHTML;

}

let form = document.querySelector ("#search-form")
form.addEventListener ("submit", handleSubmit);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

search ("Toronto")
displayForecast();