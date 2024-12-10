import { APIKEY } from "./environment.js";

let currentLoc = [];
let searchBtn = document.getElementById("searchBtn");
let searchResult = ""
let currentCity = ""
let cityName = document.getElementById('cityName')
let stateName = document.getElementById('stateName')
let countryName = document.getElementById('countryName')
let cityLat = document.getElementById('cityLat')
let cityLong = document.getElementById('cityLong')

navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position) {
  console.log(position);
  currentLoc = position;
  return currentLoc;
}

function errorFunc(error) {
  console.log(error.message);
}

function apiCall() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${APIKEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

let generateLoc = document.getElementById("generateLoc");
let inputField = document.getElementById("inputField");

generateLoc.addEventListener("click", function () {
  findCurrentCity(currentLoc.coords.latitude, currentLoc.coords.longitude);
    findWeather(currentCity)
});

function findCurrentCity(currentLat, currentLong) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${APIKEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      cityName.innerText = data.name;
      currentCity = data.name;
    });
}



function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

inputField.addEventListener("input", function () {
  if (inputField.value == "") {
    searchResult = "no input";
  } else {
    searchResult = inputField.value.toString();
    titleCase(searchResult);
  }
});

searchBtn.addEventListener("click", function () {
  findWeather(searchResult);
  console.log(searchResult);
});

function findWeather(place) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${APIKEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        // console.log(data[0].name)
      if (!data[0].name.includes(searchResult)) {
        console.log("no results found");
      }  else{
        cityName.innerText = data[0].name
        stateName.innerText = data[0].state
        countryName.innerText = data[0].country
        console.log(data[0].state)
      }
    });
}
