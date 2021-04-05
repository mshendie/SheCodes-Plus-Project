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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
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
  retrieveForecast(response.data.coord);
  changeBackground(response);
}

let button = document.getElementById("clbutton");
button.addEventListener("click", navigation);

// 5 day forecast //

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastData = response.data.daily;
  let forecastElement = document.getElementById("weather-forecast");
  let forecastHTML = `<div class="row">`;
  
  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
    forecastHTML = forecastHTML +
      `<div class="col">
          <div class="card text-center">
            <div class="card-body">
                <div class="card-img-top">
                    <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="weather-icon" height="75px" width="75px"/>
                </div>
                <h5 style="font-size: 16px;">
                ${formatDay(forecastDay.dt)}
                </h5>
                <div class="card-text">
                    <ul class="forecast-cards">
                        <li>
                            <strong id="max-temp-day-1"> ${Math.round(forecastDay.temp.max)}° </strong> | <span id="min-temp-day-1"> ${Math.round(forecastDay.temp.min)}° </span>
                        </li>
                        <li>
                            <i class="fas fa-wind"></i> <span id="wind-speed-day-1"> ${Math.round(forecastDay.wind_speed)}km/h </span>
                        </li>
                        <li>
                            <i class="fas fa-tint"></i> <span id="humidity-day-1"> ${Math.round(forecastDay.humidity)}% </span>
                        </li>
                    </ul>
                </div>
            </div>
      </div>
    </div>`;
    }
  });

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function retrieveForecast(coordinates) {
console.log(coordinates);
let apiKey= "52349dd2c0a996c2553f897a4e112d4a";
let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

// responsive background

// if after sunset, then nightBackground, if not then changeBackground

function changeBackground(response) {
  let apiDescription = response.data.weather[0].description;
  let background = document.getElementById("container");
  let currentSection = document.getElementById("current-section");
  let time = response.data.dt;
  let sunset = response.data.sys.sunset;
    if (time < sunset) {
      if (apiDescription==="scattered clouds") {
        background.style.backgroundImage = "linear-gradient(109.6deg, rgb(223, 234, 247) 11.2%, rgb(244, 248, 252) 91.1%)";
      }
      if (apiDescription==="clear sky") {
    background.style.backgroundImage = "radial-gradient(circle at 0.7% 1%, rgb(215, 248, 247) 0%, rgb(102, 188, 239) 100.2%);";
      }
      if (apiDescription==="few clouds") {
    background.style.backgroundImage = "linear-gradient(120deg, #fff1eb 0%, #ace0f9 100%)";
      }
      if (apiDescription==="broken clouds"|| apiDescription==="overcast clouds") {
    background.style.backgroundImage = "radial-gradient(circle at 10% 20%, rgb(221, 215, 215) 30%, rgba(100, 46, 122, 0.23) 100%)";
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
    } else {
      background.style.backgroundImage =
      "linear-gradient(110.6deg, rgb(156, 116, 129) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(27, 23, 36) 99.1%)";
      currentSection.style.color = "ffffff";
    }
  }