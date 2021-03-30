currentDate();
function currentDate() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day} ${date}, ${month} ${year}, ${hours}:${minutes}`;
}

//

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = "52349dd2c0a996c2553f897a4e112d4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
let form = document.getElementById("search-button");
form.addEventListener("click", handleSubmit);

//

function navigation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "52349dd2c0a996c2553f897a4e112d4a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function displayWeatherCondition(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let weatherForecast = document.querySelector("h1");
  weatherForecast.innerHTML = `Currently ${temperature}° in ${city}`;
}
let button = document.getElementById("clbutton");
button.addEventListener("click", navigation);

//




