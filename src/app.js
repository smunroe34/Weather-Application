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
let temperatureElement = document.querySelector("#today-temp");
temperatureElement.innerHTML= Math.round (farhenTemperature);

}

celsiusTemperature = null;

let form = document.querySelector ("#search-form")
form.addEventListener ("submit", handleSubmit);


let fahrenheitLink = document.querySelector ("#fahrenheit-link")
fahrenheitLink.addEventListener ("click", showFarhenheitTemperature)


search ("Toronto")