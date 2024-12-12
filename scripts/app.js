import { APIKEY } from "./environment.js";
import { findCurrentWeatherIcon, findday1Icon, findday2Icon, findday3Icon, findday4Icon, findday5Icon } from "./icons.js";

let currentLoc = [];
let searchBtn = document.getElementById("searchBtn");
let searchResult = "";
let currentCity = "";
let cityName = document.getElementById("cityName");
let stateName = document.getElementById("stateName");
let countryName = document.getElementById("countryName");
let cityLat = "";
let cityLong = "";
let generateLoc = document.getElementById("generateLoc");
let generate5day = document.getElementById("generate5day");
let inputField = document.getElementById("inputField");
let weatherIcon = document.getElementById("weatherIcon");
let forecasttabs = document.getElementById("forecasttabs");
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const d = new Date();
let day = weekday[d.getDay()];

forecasttabs.className = "d-none";
inputField.placeholder = "please wait...";
cityName.innerText = "loading...";

navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position) {
  forecasttabs.className = "fivedayForecast container";
  inputField.placeholder = "Search for a City";
  console.log(position);
  currentLoc = position;
  cityName.innerText = "load complete!";
  // findCurrentCity(currentLoc.coords.latitude, currentLoc.coords.longitude);
  // apiCall(currentLoc.coords.latitude, currentLoc.coords.longitude)
  return currentLoc;
}

function errorFunc(error) {
  console.log(error.message);
}

//5day forecast
function apiCall(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIKEY}&units=imperial`
  )
    .then((response) => {
      return response.json();
    })
    .then((weekdata) => {
      console.log(weekdata);
      day1Display(weekdata, 0);
      day2Display(weekdata, 8);
      day3Display(weekdata, 16);
      day4Display(weekdata, 24);
      day5Display(weekdata, 32);
    });
}

function day1Display(arr, i) {
  day1Temp.innerText = Math.round(arr.list[i].main.temp) + "°";
  day1Type.innerText = arr.list[i].weather[0].description;
  day1Name.innerText = findday1Icon(arr.list[i].weather[0].description);
  day1Name.innerText = weekday[d.getDay() + 1];
}
function day2Display(arr, i) {
  day2Temp.innerText = Math.round(arr.list[i].main.temp) + "°";
  day2Type.innerText = arr.list[i].weather[0].description;
  day2Name.innerText = findday2Icon(arr.list[i].weather[0].description);
  day2Name.innerText = weekday[d.getDay() + 2];
}
function day3Display(arr, i) {
  day3Temp.innerText = Math.round(arr.list[i].main.temp) + "°";
  day3Type.innerText = arr.list[i].weather[0].description;
  day3Name.innerText = findday3Icon(arr.list[i].weather[0].description);
  day3Name.innerText = weekday[d.getDay() + 3];
}
function day4Display(arr, i) {
  day4Temp.innerText = Math.round(arr.list[i].main.temp) + "°";
  day4Type.innerText = arr.list[i].weather[0].description;
  day4Name.innerText = findday4Icon(arr.list[i].weather[0].description);
  day4Name.innerText = weekday[d.getDay() + 4];
}
function day5Display(arr, i) {
  day5Temp.innerText = Math.round(arr.list[i].main.temp) + "°";
  day5Type.innerText = arr.list[i].weather[0].description;
  day5Name.innerText = findday5Icon(arr.list[i].weather[0].description);
  day5Name.innerText = weekday[d.getDay() + 5];
}

//current location fetch
function findCurrentCity(currentLat, currentLong) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${APIKEY}&units=imperial`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      cityTemp.innerText = Math.round(data.main.temp) + "°F";
      cityHigh.innerText = Math.round(data.main.temp_max) + "°/";
      cityLow.innerText = Math.round(data.main.temp_min) + "°";
      weatherType.innerText = data.weather[0].main;
      findCurrentWeatherIcon(data.weather[0].description);
      currentCity = data.name;
      findWeather(currentCity);
    });
}

function findweatherIcon(icon) {
  switch (icon) {
    case "haze":
      weatherIcon.className =
        "fa-solid fa-cloud fa-2xl d-flex justify-content-center";
      break;
    case "clear sky":
      day1Icon.className = "fa-regular fa-sun fa-2xl";
      break;

    default:
      break;
  }
}

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
      } else {
        cityName.innerText = data[0].name + ",";
        stateName.innerText = data[0].state;
        countryName.innerText = data[0].country;
        if (data[0].state == null) {
          stateName.innerText = " ";
          stateName.className = "p-1";
        }
      }
    });
}
function findSearchWeather(place) {
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
      } else {
        cityName.innerText = data[0].name + ",";
        stateName.innerText = data[0].state;
        countryName.innerText = data[0].country;
        console.log(data);
        if (data[0].state == null) {
          stateName.innerText = " ";
          stateName.className = "p-1";
        } else {
          stateName.className = "";
        }
        findCurrentCity(data[0].lat, data[0].lon);
        apiCall(data[0].lat, data[0].lon);
      }
    });
}

function toTitleCase(s) {
  return s.toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
}

generateLoc.addEventListener("click", function () {
  findCurrentCity(currentLoc.coords.latitude, currentLoc.coords.longitude);
  apiCall(currentLoc.coords.latitude, currentLoc.coords.longitude);
});
// generate5day.addEventListener("click", function () {
//   apiCall(currentLoc.coords.latitude, currentLoc.coords.longitude);
// });

inputField.addEventListener("input", function () {
  if (inputField.value == "") {
    searchResult = "no input";
  } else {
    searchResult = toTitleCase(inputField.value)
  }
});

searchBtn.addEventListener("click", function () {
  findSearchWeather(searchResult);
});
