// current time display //

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
currentDate();
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
  changeBackground(response);
}
let button = document.getElementById("clbutton");
button.addEventListener("click", navigation);

// 5 day forecast 

//

// responsive background

//
function changeBackground(response) {
  let apiDescription = response.data.weather[0].description;
  let background = document.getElementById("container");
    if (apiDescription==="scattered clouds") {
      background.style.backgroundImage = "linear-gradient(109.6deg, rgb(223, 234, 247) 11.2%, rgb(244, 248, 252) 91.1%)";
    }
    if (apiDescription==="clear sky") {
  background.style.backgroundImage = "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";
    }
    if (apiDescription==="few clouds") {
  background.style.backgroundImage = "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
    }
    if (apiDescription==="broken clouds"|| apiDescription==="overcast clouds") {
  background.style.backgroundImage = "radial-gradient(circle at 10% 20%, rgb(255, 246, 236) 39.5%, rgba(100, 46, 122, 0.23) 100.2%)";
    }
    if (apiDescription==="light rain") {
  background.style.backgroundImage = "radial-gradient(circle at 10% 20%, rgb(242, 235, 243) 0%, rgb(234, 241, 249) 90.1%)";
    }
    if (apiDescription==="heavy rain") {
  background.style.backgroundImage = "linear-gradient(180.3deg, rgb(221, 221, 221) 5.5%, rgb(110, 136, 161) 90.2%)";
    }
    if (apiDescription==="light snow") {
  background.style.backgroundImage = "radial-gradient(circle at 0% 0.5%, rgb(241, 241, 242) 0.1%, rgb(224, 226, 228) 100.2%)";
    }
}

function nightBackground() {
  let now = new Date();
  let hour = now.getHours();
  let background = document.getElementById("container");
  if (hour <= 6 || hour >= 20) {
    background.style.backgroundImage =
      "linear-gradient(110.6deg, rgb(156, 116, 129) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(27, 23, 36) 99.1%)";
  } 
}