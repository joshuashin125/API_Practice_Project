// constant variables
const api = {
  key: "733ceec052cf0316a91d6dac313f58aa",
  base: "https://api.openweathermap.org/data/2.5/",
  covidbase: "https://coronavirus-tracker-api.herokuapp.com/v2"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', goSearch);

//when clicking the search box
document.getElementById("search-btn").onclick = function setQueryBtn () {
  getResults(searchbox.value)
}
// searches the location based on pressing enter
function goSearch(loc) {
  if (loc.keyCode == 13) {
    getWeatherResults(searchbox.value);
  }
}

// builds the date
function getDate(curr) {
  let month = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currDay = day[curr.getDay()];
  let currMonth = month[curr.getMonth()];
  let currDate = curr.getDate();
  let currYr = curr.getFullYear();

  // builds string to return date
  curr = currDay + ', ' + currMonth + ' ' + currDate + ', ' + currYr;
  return curr;
}

// converts location into results
function getWeatherResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(function(resp) { return resp.json() })
  .then(function(weather) {
    //obtains data from API and sets that data
    let city = document.querySelector('.city');
    let temp = document.querySelector('.temp');
    let date = document.querySelector('.date');
    let weather_el = document.querySelector('.weather');
    let hilow = document.querySelector('.hAndl');
    
    // Prints values to webpage
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    temp.innerHTML = `${((Math.round(weather.main.temp)) * (9/5) + 32).toFixed(1)}<span>°F</span>`;
    weather_el.innerText = weather.weather[0].main;
    hilow.innerText = `${((Math.round(weather.main.temp_min)) * (9/5) + 32).toFixed(1)}°F - ${((Math.round(weather.main.temp_max)) * (9/5) + 32).toFixed(1)}°F`;
  
    //Helper function to build dates
    let currDate = new Date();
    date.innerText = getDate(currDate);
  
    // Reading in coordinates for location
    let countryCode = weather.sys.country;
    getCountryID(countryCode);

  })
  .catch(function() {
      console.log("error");
  })
}

// Loop function to search location API (replace hard coded converter)
function getCountryID(countryAbb) {
  fetch(`${api.covidbase}/locations`)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
      // Countries with multiple provinces
      if (countryAbb == "AU") {
        var cAu = 0;
        var dAu = 0;
        for (var auCount = 8; auCount <= 15; auCount++) {
          cAu = cAu + data.locations[auCount].latest.confirmed;
          dAu = dAu + data.locations[auCount].latest.deaths;
        }
        let confirmedCasesAu = cAu;
        let confirmedDeathsAu = dAu;
        let survivalRateAu = (1 - (confirmedDeathsAu / confirmedCasesAu)) * 100;
        let cNameAu = data.locations[8].country;
        document.getElementById('cases').innerHTML = confirmedCasesAu.toLocaleString('en');
        document.getElementById('deaths').innerHTML = confirmedDeathsAu.toLocaleString('en');
        document.getElementById('sRate').innerHTML = survivalRateAu.toLocaleString('en') + ' %';
        document.getElementById('countryNm').innerHTML = cNameAu.toLocaleString('en');
        return;
      }
      else if (countryAbb == "CA") {
        var cCa = 0;
        var dCa = 0;
        for (var cACount = 35; cACount <= 45; cACount++) {
          cCa = cCa + data.locations[cACount].latest.confirmed;
          dCa = dCa + data.locations[cACount].latest.deaths;
        }
        cCa = cCa + data.locations[244].latest.confirmed;
        dCa = dCa + data.locations[244].latest.deaths;
        cCa = cCa + data.locations[245].latest.confirmed;
        dCa = dCa + data.locations[245].latest.deaths;
        let confirmedCasesCa = cCa;
        let confirmedDeathsCa = dCa;
        let survivalRateCa = (1 - (confirmedDeathsCa / confirmedCasesCa)) * 100;
        let cNameCa = data.locations[35].country;
        document.getElementById('cases').innerHTML = confirmedCasesCa.toLocaleString('en');
        document.getElementById('deaths').innerHTML = confirmedDeathsCa.toLocaleString('en');
        document.getElementById('sRate').innerHTML = survivalRateCa.toLocaleString('en') + ' %';
        document.getElementById('countryNm').innerHTML = cNameCa.toLocaleString('en');
        return;
      }
      else if (countryAbb == "CN") {
        var cCn = 0;
        var dCn = 0;
        for (var cNCount = 49; cNCount <= 81; cNCount++) {
          cCn = cCn + data.locations[auCount].latest.confirmed;
          dCn = dCn + data.locations[auCount].latest.deaths;
        }
        let confirmedCasesCn = cCn;
        let confirmedDeathsCn = dCn;
        let survivalRateCn = (1 - (confirmedDeathsCn / confirmedCasesCn)) * 100;
        let cNameCn = data.locations[50].country;
        document.getElementById('cases').innerHTML = confirmedCasesCn.toLocaleString('en');
        document.getElementById('deaths').innerHTML = confirmedDeathsCn.toLocaleString('en');
        document.getElementById('sRate').innerHTML = survivalRateCn.toLocaleString('en') + ' %';
        document.getElementById('countryNm').innerHTML = cNameCn.toLocaleString('en');
        return;
      }
      else if (countryAbb == "CG") {
        var cCg = 0;
        var dCg = 0;
        for (var cgCount = 83; cgCount <= 84; cgCount++) {
          cCg = cCg + data.locations[cgCount].latest.confirmed;
          dCg = dCg + data.locations[cgCount].latest.deaths;
        }
        let confirmedCasesCg = cCg;
        let confirmedDeathsCg = dCg;
        let survivalRateCg = (1 - (confirmedDeathsCg / confirmedCasesCg)) * 100;
        let cNameCg = data.locations[83].country;
        document.getElementById('cases').innerHTML = confirmedCasesCg.toLocaleString('en');
        document.getElementById('deaths').innerHTML = confirmedDeathsCg.toLocaleString('en');
        document.getElementById('sRate').innerHTML = survivalRateCg.toLocaleString('en') + ' %';
        document.getElementById('countryNm').innerHTML = cNameCg.toLocaleString('en');
        return;
      }
      else if (countryAbb == "DK") {
        var cDk = 0;
        var dDk = 0;
        for (var dkCount = 92; dkCount <= 94; dkCount++) {
          cDk = cDk + data.locations[dkCount].latest.confirmed;
          dDk = dDk + data.locations[dkCount].latest.deaths;
        }
        let confirmedCasesDk = cDk;
        let confirmedDeathsDk = dDk;
        let survivalRateDk = (1 - (confirmedDeathsDk / confirmedCasesDk)) * 100;
        let cNameDk = data.locations[92].country;
        document.getElementById('cases').innerHTML = confirmedCasesDk.toLocaleString('en');
        document.getElementById('deaths').innerHTML = confirmedDeathsDk.toLocaleString('en');
        document.getElementById('sRate').innerHTML = survivalRateDk.toLocaleString('en') + ' %';
        document.getElementById('countryNm').innerHTML = cNameDk.toLocaleString('en');
        return;
      }
      else if (countryAbb == "FR") {
        var cFr = 0;
        var dFr = 0;
        for (var frCount = 107; frCount <= 116; frCount++) {
          cFr = cFr + data.locations[frCount].latest.confirmed;
          dFr = dFr + data.locations[frCount].latest.deaths;
        }
        cFr = cFr + data.locations[258].latest.confirmed;
        dFr = dFr + data.locations[258].latest.deaths;
        let confirmedCasesFr = cFr;
        let confirmedDeathsFr = dFr;
        let survivalRateFr = (1 - (confirmedDeathsFr / confirmedCasesFr)) * 100;
        let cNameFr = data.locations[107].country;
        document.getElementById('cases').innerHTML = confirmedCasesFr.toLocaleString('en');
        document.getElementById('deaths').innerHTML = confirmedDeathsFr.toLocaleString('en');
        document.getElementById('sRate').innerHTML = survivalRateFr.toLocaleString('en') + ' %';
        document.getElementById('countryNm').innerHTML = cNameFr.toLocaleString('en');
        return;
      }
      else if (countryAbb == "NL") {
        var cNl = 0;
        var dNl = 0;
        for (var nlCount = 166; nlCount <= 169; nlCount++) {
          cNl = cNl + data.locations[nlCount].latest.confirmed;
          dNl = dNl + data.locations[nlCount].latest.deaths;
        }
        cNl = cNl + data.locations[255].latest.confirmed;
        dNl = dNl + data.locations[255].latest.deaths;
        let confirmedCasesNl = cNl;
        let confirmedDeathsNl = dNl;
        let survivalRateNl = (1 - (confirmedDeathsNl / confirmedCasesNl)) * 100;
        let cNameNl = data.locations[169].country;
        document.getElementById('cases').innerHTML = confirmedCasesNl.toLocaleString('en');
        document.getElementById('deaths').innerHTML = confirmedDeathsNl.toLocaleString('en');
        document.getElementById('sRate').innerHTML = survivalRateNl.toLocaleString('en') + ' %';
        document.getElementById('countryNm').innerHTML = cNameNl.toLocaleString('en');
        return;
      }
      else if (countryAbb == "GB") {
        var cGb = 0;
        var dGb = 0;
        for (var gbCount = 217; gbCount <= 223; gbCount++) {
          cGb = cGb + data.locations[gbCount].latest.confirmed;
          dGb = dGb + data.locations[gbCount].latest.deaths;
        }
        for (var gbCount2 = 248; gbCount2 <= 250; gbCount2++) {
          cGb = cGb + data.locations[gbCount2].latest.confirmed;
          dGb = dGb + data.locations[gbCount2].latest.deaths;
        }
        cGb = cGb + data.locations[257].latest.confirmed;
        dGb = dGb + data.locations[257].latest.deaths;
        let confirmedCasesGb = cGb;
        let confirmedDeathsGb = dGb;
        let survivalRateGb = (1 - (dGb / cGb)) * 100;
        let cNameGb = data.locations[217].country;
        document.getElementById('cases').innerHTML = confirmedCasesGb.toLocaleString('en');
        document.getElementById('deaths').innerHTML = confirmedDeathsGb.toLocaleString('en');
        document.getElementById('sRate').innerHTML = survivalRateGb.toLocaleString('en') + ' %';
        document.getElementById('countryNm').innerHTML = cNameGb.toLocaleString('en');
        return;
      }
      else {
        // for loop to obtain the country desired (currently hard coded range)
        for (var counter = 0; counter < data.locations.length; counter++) {
          if (data.locations[counter].country_code == countryAbb) {
            let confirmedCases = data.locations[counter].latest.confirmed;
            let confirmedDeaths = data.locations[counter].latest.deaths;
            let survivalRate = (1 - (confirmedDeaths / confirmedCases)) * 100;
            let cName = data.locations[counter].country;
            document.getElementById('cases').innerHTML = confirmedCases.toLocaleString('en');
            document.getElementById('deaths').innerHTML = confirmedDeaths.toLocaleString('en');
            document.getElementById('sRate').innerHTML = survivalRate.toLocaleString('en') + ' %';
            document.getElementById('countryNm').innerHTML = cName.toLocaleString('en');
            return;
          }
        }// end for loop
        alert("Could not find the desired country's data");
        console.log("error: not found");
      }

    })
    .catch(function () {
      alert("Could not find the desired country's data");
      console.log("error: not found");
    })
}