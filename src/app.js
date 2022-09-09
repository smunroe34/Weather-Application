function displayTemperature (response) {
  let temperatureElement = document.querySelector ("#today-temp");
  let cityElement = document.querySelector ("#city");
  let descriptionElement = document.querySelector ("#description");
  temperatureElement.innerHTML = Math.round (response.data.main.temp);
  cityElement.innerHTML= response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
}

let apiKey = "dc55516602874d9b155a4733747850c9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${apiKey}&units=metric`;

axios.get (apiUrl).then (displayTemperature);