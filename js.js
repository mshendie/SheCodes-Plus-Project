// current time display //

currentDate();
function currentDate() {
  let now = new Date();
  let hours = now.getHours();
    if (hours < 10) {hours = `0${hours}`;
    }
  let minutes = now.getMinutes();
    if (minutes < 10) {minutes = `0${minutes}`;
    }
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

// search a city function //

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

// current location function //

function navigation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "52349dd2c0a996c2553f897a4e112d4a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function displayWeatherCondition(response) {
  console.log(response);
  let city = response.data.name;
  let image = document.getElementById("image-current");
  let weatherForecast = document.querySelector("h1");
  document.getElementById("current-description").innerHTML = response.data.weather[0].description;
  document.getElementById("temp-current").innerHTML = `${Math.round(response.data.main.temp)}°`;
  document.getElementById("wind-speed-current").innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  document.getElementById("humidity-current").innerHTML = `${response.data.main.humidity}%`;
  image.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  weatherForecast.innerHTML = `Currently in ${city}`;
}
let button = document.getElementById("clbutton");
button.addEventListener("click", navigation);

// 5 day forecast 






