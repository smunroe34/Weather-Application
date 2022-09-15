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
  console.log (coordinates)
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

function showFarhenheitTemperature (event) {
event.preventDefault();
let farhenTemperature = (celsiusTemperature * 9)/5+32;
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let temperatureElement = document.querySelector("#today-temp");
temperatureElement.innerHTML= Math.round (farhenTemperature);

}

function showCelsiusTemperature (event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove ("active");
  let temperatureElement = document.querySelector ("#today-temp");
  temperatureElement.innerHTML = Math.round (celsiusTemperature);
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
let forecastElement = document.querySelector ("#forecast");

let forecastHTML = `<div class ="row">`;
let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday","Tuesday"]
days.forEach (function(day) {
  forecastHTML = forecastHTML + ` 
              <div class="col-2">
                <div class="weather-forecast-date">
                ${day}
                </div>
                <img src="https://ssl.gstatic.com/onebox/weather/48/sunny.png" alt="sunny" width=45px" />
                <br>
              <div class="weather-temperatures"> 
                <span class="weather-forecast-temperature-max">
                18°
                </span> 
                <span class="weather-forecast-temperature-min">
                12°
                </span>
              </div>
              </div>`;

});

  forecastHTML = forecastHTML +`</div>`;       
  forecastElement.innerHTML = forecastHTML;

}

let celsiusTemperature = null;

let form = document.querySelector ("#search-form")
form.addEventListener ("submit", handleSubmit);


let fahrenheitLink = document.querySelector ("#fahrenheit-link")
fahrenheitLink.addEventListener ("click", showFarhenheitTemperature)

let celsiusLink = document.querySelector ("#celsius-link")
celsiusLink.addEventListener ("click", showCelsiusTemperature)

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

search ("Toronto")
displayForecast();