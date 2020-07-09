// CODE TO BE TESTED AND TRIED IS TO BE PLACED HERE

/*
CODE TO ACCOUNT FOR MULTIPLE DIFFERENT PROVINCES
// Function for countries with multiple provinces (testing for GB)
function gbCaseTotals(){
	var total = 0;
	total = total + getGBResults(217);
	total = total + getGBResults(218);
	total = total + getGBResults(219);
	total = total + getGBResults(220);
	total = total + getGBResults(221);
	total = total + getGBResults(222);
	total = total + getGBResults(223);
}
// Helper function
function getGBResults(countryF) {
  fetch(`${api.covidbase}/locations/${countryF}`)
  .then(function(resp) { return resp.json() })
  .then(function(data) {
      let confirmedCases = data.location.latest.confirmed;
      return confirmedCases;
  })
  .catch(function() {
      console.log("error");
  })
}
*/

// DO NOT RUN THIS CODE YET
// Loop function to search location API (replace hard coded converter)
function countrySearch(countryAbb) {
    fetch(`${api.covidbase}/locations`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            // Countries with multiple provinces
            if (countryAbb == AU && countryAbb == CA &&
                countryAbb == CN && countryAbb == CG && countryAbb == DK &&
                countryAbb == NL && countryAbb == GB) {
                if (countryAbb == AU) {
                    return;
                }
                else if (countryAbb == CA) {
                    return;
                }
                else if (countryAbb == CN) {
                    return;
                }
                else if (countryAbb == CG) {
                    return;
                }
                else if (countryAbb == DK) {
                    return;
                }
                else if (countryAbb == NL) {
                    return;
                }
                else if (countryAbb == GB) {
                    return;
                }
            }
            // for loop to obtain the country desired (currently hard coded range)
            for (var counter = 0; counter < 265; counter++) {
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

        })
        .catch(function () {
            alert("Could not find the desired country's data");
            console.log("error: not found");
        })
}