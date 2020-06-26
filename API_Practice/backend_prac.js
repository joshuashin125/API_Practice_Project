//Backend code to read in data will be written here
//Own Weather Code
/*$.getJSON("http://api.openweathermap.org/data/2.5/weather?id=4351708&appid=733ceec052cf0316a91d6dac313f58aa", function (data) {
    var temp_in_f = (1.8 * (data.main.temp - 273) + 32).toFixed(3);
    var temp_in_c = (data.main.temp - 273).toFixed(3);
    var temp_in_k = data.main.temp.toFixed(3);
    $('.temperatureF').append(temp_in_f + ' Temperature in Fahrenheit');
    $('.temperatureC').append(temp_in_c + ' Temperature in Celsius');
    $('.temperatureK').append(temp_in_k + ' Temperature in Kelvin');
var disTemp = [temp_in_f +" F : Temperature in Fahrenheit",
temp_in_c + " C : Temperature in Celsius",
temp_in_k +" K : Temperature in Kelvin"];
$("cburg-weather-container").append("<ul class=weatherTempList></ul>");
for(var counter in disTemp) {
    var li = "<li>";
    $("ul").append(li.concat(disTemp[counter]))
}
});*/


//Youtube Weather API Code
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

  //Coronavirus API Code
  /*window.onload = function() {
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
	*/
	