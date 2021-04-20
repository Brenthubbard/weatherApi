import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'


$('#weatherLocation').click(function () {
  const city = $('#location').val();
  $('#location').val("");

  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  };
  request.open("GET", url, true);
  request.send();

  function getElements(response) {
    const k = response.main.temp
    const Fahrenheit = Math.floor((k - 273.15) * 9 / 5 + 32)

    $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature in Kelvin is ${response.main.temp} degrees.`);
    $('.showFahrenheit').text(`The temperature in Fahrenheit is ${Fahrenheit} degrees.`);
    $('.showClouds').text(`The current cloud level in ${city} is ${response.clouds.all}`);
    $('.showWind').text(`The current Wind speed in ${city} is ${response.wind.speed}`);
    
  }

});