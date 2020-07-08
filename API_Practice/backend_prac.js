// constant variables
const api = {
  key: "733ceec052cf0316a91d6dac313f58aa",
  base: "https://api.openweathermap.org/data/2.5/",
  covidbase: "https://coronavirus-tracker-api.herokuapp.com/v2"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


// searches the location
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

// converts location into results
function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

// obtains weather information and country for corona data
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

  // Reading in coordinates for location
  let countryCode = weather.sys.country;
  getCountryID(countryCode);
}

// builds the date
function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}

// Function to get COVID-19 API data from countries with no provinces 
function getCoronaResults(countryF) {
  fetch(`${api.covidbase}/locations/${countryF}`)
  .then(function(resp) { return resp.json() })
  .then(function(data) {
      let confirmedCases = data.location.latest.confirmed;
	  let confirmedDeaths = data.location.latest.deaths;
	  let survivalRate = (1 - (confirmedDeaths / confirmedCases)) * 100;
	  let cName = data.location.country;
	  document.getElementById('cases').innerHTML = confirmedCases.toLocaleString('en');
	  document.getElementById('deaths').innerHTML = confirmedDeaths.toLocaleString('en');
	  document.getElementById('sRate').innerHTML = survivalRate.toLocaleString('en') + ' %';
      document.getElementById('countryNm').innerHTML = cName.toLocaleString('en');
  })
  .catch(function() {
      console.log("error");
  })
}

// Converts the individual country code to numerical id for API reference
// (May need to relocate function into different js for efficiancy)
function getCountryID(cAbbrev){
	if (cAbbrev == "AF"){
		getCoronaResults("0");
	}
	else if (cAbbrev == "AL"){
		getCoronaResults("1");
	}
	else if (cAbbrev == "DZ"){
		getCoronaResults("2");
	}
	else if (cAbbrev == "AD"){
		getCoronaResults("3");
	}
	else if (cAbbrev == "AO"){
		getCoronaResults("4");
	}
	else if (cAbbrev == "AG"){
		getCoronaResults("5");
	}
	else if (cAbbrev == "AR"){
		getCoronaResults("6");
	}
	else if (cAbbrev == "AM"){
		getCoronaResults("7");
	}
	// Multiple Provinces Australia (8 - 15)
	else if (cAbbrev == "AU"){
		getCoronaResults("8");
	}
	else if (cAbbrev == "AT"){
		getCoronaResults("16");
	}
	else if (cAbbrev == "AZ"){
		getCoronaResults("17");
	}
	else if (cAbbrev == "BS"){
		getCoronaResults("18");
	}
	else if (cAbbrev == "BH"){
		getCoronaResults("19");
	}
	else if (cAbbrev == "BD"){
		getCoronaResults("20");
	}
	else if (cAbbrev == "BB"){
		getCoronaResults("21");
	}
	else if (cAbbrev == "BY"){
		getCoronaResults("22");
	}
	else if (cAbbrev == "BE"){
		getCoronaResults("23");
	}
	else if (cAbbrev == "BJ"){
		getCoronaResults("24");
	}
	else if (cAbbrev == "BT"){
		getCoronaResults("25");
	}
	else if (cAbbrev == "BO"){
		getCoronaResults("26");
	}
	else if (cAbbrev == "BO"){
		getCoronaResults("26");
	}
	else if (cAbbrev == "BA"){
		getCoronaResults("27");
	}
	else if (cAbbrev == "BR"){
		getCoronaResults("28");
	}
	else if (cAbbrev == "BN"){
		getCoronaResults("29");
	}
	else if (cAbbrev == "BG"){
		getCoronaResults("30");
	}
	else if (cAbbrev == "BF"){
		getCoronaResults("31");
	}
	else if (cAbbrev == "CV"){
		getCoronaResults("32");
	}
	else if (cAbbrev == "KH"){
		getCoronaResults("33");
	}
	else if (cAbbrev == "CM"){
		getCoronaResults("34");
	}
	// Multiple Provinces Cananda (35 - 45 & 244 - 245)
	else if (cAbbrev == "CA"){
		getCoronaResults("35");
	}
	else if (cAbbrev == "CF"){
		getCoronaResults("46");
	}
	else if (cAbbrev == "TD"){
		getCoronaResults("47");
	}
	else if (cAbbrev == "CL"){
		getCoronaResults("48");
	}
	// Multiple Provinces China (49 - 81)
	else if (cAbbrev == "CN"){
		getCoronaResults("49");
	}
	else if (cAbbrev == "CO"){
		getCoronaResults("82");
	}
	// Multiple Provinces Congo (83 - 84)
	else if (cAbbrev == "CG"){
		getCoronaResults("83");
	}
	else if (cAbbrev == "CR"){
		getCoronaResults("85");
	}
	else if (cAbbrev == "CI"){
		getCoronaResults("86");
	}
	else if (cAbbrev == "HR"){
		getCoronaResults("87");
	}
	// Diamond Princess Ship should be included as a GB Province
	else if (cAbbrev == "XX"){
		getCoronaResults("88");
	}
	else if (cAbbrev == "CU"){
		getCoronaResults("89");
	}
	else if (cAbbrev == "CY"){
		getCoronaResults("90");
	}
	else if (cAbbrev == "CZ"){
		getCoronaResults("91");
	}
	//Multiple Provinces Denmark (92 - 94)
	else if (cAbbrev == "DK"){
		getCoronaResults("92");
	}
	else if (cAbbrev == "DJ"){
		getCoronaResults("95");
	}
	else if (cAbbrev == "DO"){
		getCoronaResults("96");
	}
	else if (cAbbrev == "EC"){
		getCoronaResults("97");
	}
	else if (cAbbrev == "EG"){
		getCoronaResults("98");
	}
	else if (cAbbrev == "SV"){
		getCoronaResults("99");
	}
	else if (cAbbrev == "GQ"){
		getCoronaResults("100");
	}
	else if (cAbbrev == "ER"){
		getCoronaResults("101");
	}
	else if (cAbbrev == "EE"){
		getCoronaResults("102");
	}
	else if (cAbbrev == "SZ"){
		getCoronaResults("103");
	}
	else if (cAbbrev == "ET"){
		getCoronaResults("104");
	}
	else if (cAbbrev == "FJ"){
		getCoronaResults("105");
	}
	else if (cAbbrev == "FI"){
		getCoronaResults("106");
	}
	//Multiple Provinces France (107 - 116 & 258)
	else if (cAbbrev == "FR"){
		getCoronaResults("107");
	}
	else if (cAbbrev == "GA"){
		getCoronaResults("117");
	}
	else if (cAbbrev == "GM"){
		getCoronaResults("118");
	}
	else if (cAbbrev == "GE"){
		getCoronaResults("119");
	}
	else if (cAbbrev == "DE"){
		getCoronaResults("120");
	}
	else if (cAbbrev == "GH"){
		getCoronaResults("121");
	}
	else if (cAbbrev == "GR"){
		getCoronaResults("122");
	}
	else if (cAbbrev == "GT"){
		getCoronaResults("123");
	}
	else if (cAbbrev == "GN"){
		getCoronaResults("124");
	}
	else if (cAbbrev == "GY"){
		getCoronaResults("125");
	}
	else if (cAbbrev == "HT"){
		getCoronaResults("126");
	}
	else if (cAbbrev == "VA"){
		getCoronaResults("127");
	}
	else if (cAbbrev == "HN"){
		getCoronaResults("128");
	}
	else if (cAbbrev == "HU"){
		getCoronaResults("129");
	}
	else if (cAbbrev == "IS"){
		getCoronaResults("130");
	}
	else if (cAbbrev == "IN"){
		getCoronaResults("131");
	}
	else if (cAbbrev == "ID"){
		getCoronaResults("132");
	}
	else if (cAbbrev == "IR"){
		getCoronaResults("133");
	}
	else if (cAbbrev == "IQ"){
		getCoronaResults("134");
	}
	else if (cAbbrev == "IE"){
		getCoronaResults("135");
	}
	else if (cAbbrev == "IL"){
		getCoronaResults("136");
	}
	else if (cAbbrev == "IT"){
		getCoronaResults("137");
	}
	else if (cAbbrev == "JM"){
		getCoronaResults("138");
	}
	else if (cAbbrev == "JP"){
		getCoronaResults("139");
	}
	else if (cAbbrev == "JO"){
		getCoronaResults("140");
	}
	else if (cAbbrev == "KZ"){
		getCoronaResults("141");
	}
	else if (cAbbrev == "KE"){
		getCoronaResults("142");
	}
	else if (cAbbrev == "KR"){
		getCoronaResults("143");
	}
	else if (cAbbrev == "KW"){
		getCoronaResults("144");
	}
	else if (cAbbrev == "KG"){
		getCoronaResults("145");
	}
	else if (cAbbrev == "LV"){
		getCoronaResults("146");
	}
	else if (cAbbrev == "147"){
		getCoronaResults("LB");
	}
	else if (cAbbrev == "LR"){
		getCoronaResults("148");
	}
	else if (cAbbrev == "LI"){
		getCoronaResults("149");
	}
	else if (cAbbrev == "LT"){
		getCoronaResults("150");
	}
	else if (cAbbrev == "LU"){
		getCoronaResults("151");
	}
	else if (cAbbrev == "MG"){
		getCoronaResults("152");
	}
	else if (cAbbrev == "MY"){
		getCoronaResults("153");
	}
	else if (cAbbrev == "MV"){
		getCoronaResults("154");
	}
	else if (cAbbrev == "MT"){
		getCoronaResults("155");
	}
	else if (cAbbrev == "MR"){
		getCoronaResults("156");
	}
	else if (cAbbrev == "MU"){
		getCoronaResults("157");
	}
	else if (cAbbrev == "MX"){
		getCoronaResults("158");
	}
	else if (cAbbrev == "MD"){
		getCoronaResults("159");
	}
	else if (cAbbrev == "MC"){
		getCoronaResults("160");
	}
	else if (cAbbrev == "MN"){
		getCoronaResults("161");
	}
	else if (cAbbrev == "ME"){
		getCoronaResults("162");
	}
	else if (cAbbrev == "MA"){
		getCoronaResults("163");
	}
	else if (cAbbrev == "NA"){
		getCoronaResults("164");
	}
	else if (cAbbrev == "NP"){
		getCoronaResults("165");
	}
	// Multiple Provinces Netherlands (166 - 169 & 255)
	else if (cAbbrev == "NL"){
		getCoronaResults("166");
	}
	else if (cAbbrev == "NZ"){
		getCoronaResults("170");
	}
	else if (cAbbrev == "NI"){
		getCoronaResults("171");
	}
	else if (cAbbrev == "NE"){
		getCoronaResults("172");
	}
	else if (cAbbrev == "NG"){
		getCoronaResults("173");
	}
	else if (cAbbrev == "MK"){
		getCoronaResults("174");
	}
	else if (cAbbrev == "NO"){
		getCoronaResults("175");
	}
	else if (cAbbrev == "OM"){
		getCoronaResults("176");
	}
	else if (cAbbrev == "PK"){
		getCoronaResults("177");
	}
	else if (cAbbrev == "PA"){
		getCoronaResults("178");
	}
	else if (cAbbrev == "PG"){
		getCoronaResults("179");
	}
	else if (cAbbrev == "PY"){
		getCoronaResults("180");
	}
	else if (cAbbrev == "PE"){
		getCoronaResults("181");
	}
	else if (cAbbrev == "PH"){
		getCoronaResults("182");
	}
	else if (cAbbrev == "PL"){
		getCoronaResults("183");
	}
	else if (cAbbrev == "PT"){
		getCoronaResults("184");
	}
	else if (cAbbrev == "QA"){
		getCoronaResults("185");
	}
	else if (cAbbrev == "RO"){
		getCoronaResults("186");
	}
	else if (cAbbrev == "RU"){
		getCoronaResults("187");
	}
	else if (cAbbrev == "RW"){
		getCoronaResults("188");
	}
	else if (cAbbrev == "LC"){
		getCoronaResults("189");
	}
	else if (cAbbrev == "VC"){
		getCoronaResults("190");
	}
	else if (cAbbrev == "SM"){
		getCoronaResults("191");
	}
	else if (cAbbrev == "SA"){
		getCoronaResults("192");
	}
	else if (cAbbrev == "SN"){
		getCoronaResults("193");
	}
	else if (cAbbrev == "RS"){
		getCoronaResults("194");
	}
	else if (cAbbrev == "SC"){
		getCoronaResults("195");
	}
	else if (cAbbrev == "SG"){
		getCoronaResults("196");
	}
	else if (cAbbrev == "SK"){
		getCoronaResults("197");
	}
	else if (cAbbrev == "SI"){
		getCoronaResults("198");
	}
	else if (cAbbrev == "SO"){
		getCoronaResults("199");
	}
	else if (cAbbrev == "ZA"){
		getCoronaResults("200");
	}
	else if (cAbbrev == "ES"){
		getCoronaResults("201");
	}
	else if (cAbbrev == "LK"){
		getCoronaResults("202");
	}
	else if (cAbbrev == "SD"){
		getCoronaResults("203");
	}
	else if (cAbbrev == "SR"){
		getCoronaResults("204");
	}
	else if (cAbbrev == "SE"){
		getCoronaResults("205");
	}
	else if (cAbbrev == "CH"){
		getCoronaResults("206");
	}
	else if (cAbbrev == "TW"){
		getCoronaResults("207");
	}
	else if (cAbbrev == "TZ"){
		getCoronaResults("208");
	}
	else if (cAbbrev == "TH"){
		getCoronaResults("209");
	}
	else if (cAbbrev == "TG"){
		getCoronaResults("210");
	}
	else if (cAbbrev == "TT"){
		getCoronaResults("211");
	}
	else if (cAbbrev == "TN"){
		getCoronaResults("212");
	}
	else if (cAbbrev == "TR"){
		getCoronaResults("213");
	}
	else if (cAbbrev == "UG"){
		getCoronaResults("214");
	}
	else if (cAbbrev == "UA"){
		getCoronaResults("215");
	}
	else if (cAbbrev == "AE"){
		getCoronaResults("216");
	}
	//Multiple Provinces Great Brit. (217 - 223, 248 - 250, 257)
	else if (cAbbrev == "GB"){
		getCoronaResults("217");
	}
	else if (cAbbrev == "UY"){
		getCoronaResults("224");
	}
	else if (cAbbrev == "US"){
		getCoronaResults("225");
	}
	else if (cAbbrev == "UZ"){
		getCoronaResults("226");
	}
	else if (cAbbrev == "VE"){
		getCoronaResults("227");
	}
	else if (cAbbrev == "VN"){
		getCoronaResults("228");
	}
	else if (cAbbrev == "ZM"){
		getCoronaResults("229");
	}
	else if (cAbbrev == "ZW"){
		getCoronaResults("230");
	}
	else if (cAbbrev == "DM"){
		getCoronaResults("232");
	}
	else if (cAbbrev == "GD"){
		getCoronaResults("233");
	}
	else if (cAbbrev == "MZ"){
		getCoronaResults("234");
	}
	else if (cAbbrev == "SY"){
		getCoronaResults("235");
	}
	else if (cAbbrev == "TL"){
		getCoronaResults("236");
	}
	else if (cAbbrev == "BZ"){
		getCoronaResults("237");
	}
	else if (cAbbrev == "LA"){
		getCoronaResults("238");
	}
	else if (cAbbrev == "LY"){
		getCoronaResults("239");
	}
	else if (cAbbrev == "PS"){
		getCoronaResults("240");
	}
	else if (cAbbrev == "GW"){
		getCoronaResults("241");
	}
	else if (cAbbrev == "ML"){
		getCoronaResults("242");
	}
	else if (cAbbrev == "KN"){
		getCoronaResults("243");
	}
	else if (cAbbrev == "XK"){
		getCoronaResults("246");
	}
	else if (cAbbrev == "MM"){
		getCoronaResults("247");
	}
	else if (cAbbrev == "BW"){
		getCoronaResults("252");
	}
	else if (cAbbrev == "BI"){
		getCoronaResults("253");
	}
	else if (cAbbrev == "SL"){
		getCoronaResults("254");
	}
	else if (cAbbrev == "MW"){
		getCoronaResults("256");
	}
	else if (cAbbrev == "SS"){
		getCoronaResults("259");
	}
	else if (cAbbrev == "EH"){
		getCoronaResults("260");
	}
	else if (cAbbrev == "ST"){
		getCoronaResults("261");
	}
	else if (cAbbrev == "YE"){
		getCoronaResults("262");
	}
	else if (cAbbrev == "KM"){
		getCoronaResults("263");
	}
	else if (cAbbrev == "TJ"){
		getCoronaResults("264");
	}
	else if (cAbbrev == "LS"){
		getCoronaResults("265");
	}
	else{
		alert("Country Code is Invalid");
		console.log("error");
	}
}





// OLD CODE FOR REFERENCE !!!
/*
//Link Passes Through But Certificate is not accepted
function getCoronaResults (countryF) {
  fetch(`${api.covidbase}/locations/${countryF}`)
    .then(coronaData => {
      return coronaData.json();
    }).then(displayCoronaResults);
}

function displayCoronaResults (coronaData) {
	let hilow = document.querySelector('.data-container .stats-container #cases');
  hilow.innerText = `${coronaData.latest.confirmed}`;
}
*/

/*
function getCovidStats(countryToFind) {
  fetch(`${api.covidbase}eucdc?country=${countryToFind}&daysInPast=1`)
  .then(weather => {
      return weather.json();
    }).then(displayResults);


      let confirmedCases = data.historicData[0].reportedCt;
      let deaths = data.historicData[0].deathCt;
	  let recovery = data.historicData[0].recoveredCt; 
	  let countrySearched = data.countryName;

      document.getElementById('cases').innerHTML = confirmedCases.toLocaleString('en');
      document.getElementById('deaths').innerHTML = deaths.toLocaleString('en');
	  document.getElementById('recover').innerHTML = recovery.toLocaleString('en');
	  document.getElementById('countryNm').innerHTML = countrySearched.toLocaleString('en');

  })
  .catch(function() {
      console.log("error");
  })
}
*/