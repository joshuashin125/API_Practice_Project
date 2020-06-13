//Backend code to read in data will be written here
$.getJSON("http://api.openweathermap.org/data/2.5/weather?id=4351708&appid=733ceec052cf0316a91d6dac313f58aa", function (data) {
    var temp_in_f = (1.8 * (data.main.temp - 273) + 32).toFixed(3);
    var temp_in_c = (data.main.temp - 273).toFixed(3);
    $('.temperature').append(temp_in_f + ' Temperature in Fahrenheit');
});

/*
DROPDOWN MENU CONTENT
When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
} 

function displayF() {
    alert("I am an alert box!");
}

function showC() {
  $('.temperature').append(temp_in_c + ' Temperature in C');
}

function showK() {
  document.getElementById("myDropdown").classList.toggle("show");
}
