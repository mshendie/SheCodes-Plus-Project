function currentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let heading = document.querySelector("h1");
  heading.innerHTML = `Currently ${temperature}° in ${city}`;
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "52349dd2c0a996c2553f897a4e112d4a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(currentTemperature);
}
navigator.geolocation.getCurrentPosition(retrievePosition);

let button = document.getElementById("clbutton");
button.addEventListener("submit", currentTemperature);


//
function currentDate() {
  let now = new Date();
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
  h2.innerHTML = `${day} ${date}, ${month} ${year}`;
}
currentDate();
//
