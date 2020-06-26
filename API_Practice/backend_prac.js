const api = {
  key: "733ceec052cf0316a91d6dac313f58aa",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

window.onload = function() {
  getCovidStats();
}

function getCovidStats() {
  fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/225')
  .then(function(resp) { return resp.json() })
  .then(function(data) {
      let population = data.location.country_population;
      let update = data.location.last_updated;
      let confirmedCases = data.location.latest.confirmed;
      let deaths = data.location.latest.deaths;

      document.getElementById('population').innerHTML = population.toLocaleString('en');
      document.getElementById('update').innerHTML = update.substr(0, 10);
      document.getElementById('cases').innerHTML = confirmedCases.toLocaleString('en');
      document.getElementById('deaths').innerHTML = deaths.toLocaleString('en');
      document.getElementById('percent').innerHTML = ((Number(deaths)/Number(confirmedCases))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";




  })
  .catch(function() {
      console.log("error");
  })
}

