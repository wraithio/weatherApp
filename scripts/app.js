import { APIKEY } from "./environmentAPI.js";
import {
  findCurrentWeatherIcon,
  findday1Icon,
  findday2Icon,
  findday3Icon,
  findday4Icon,
  findday5Icon,
} from "./icons.js";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "./localstorage.js";

let Body = document.getElementById("Body");
let currentLoc = [];
let searchBtn = document.getElementById("searchBtn");
let searchCol = document.getElementById("searchCol");
let favBtn = document.getElementById("favBtn");
let favTabs = document.getElementById("favTabs");
let searchResult = "";
let currentCity = "";
let currentCountry = "";
let cityName = document.getElementById("cityName");
let stateName = document.getElementById("stateName");
let countryName = document.getElementById("countryName");
let generateLoc = document.getElementById("generateLoc");
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

navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position) {
  console.log(position);
  currentLoc = position;
  findCurrentCity(currentLoc.coords.latitude, currentLoc.coords.longitude);
  fiveDayCall(currentLoc.coords.latitude, currentLoc.coords.longitude)
  return currentLoc;
}

function errorFunc(error) {
  console.log(error.message);
}
createElements();
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
      cityName.innerText = data.name
      cityTemp.innerText = Math.round(data.main.temp) + "°F";
      cityHigh.innerText = Math.round(data.main.temp_max) + "°/";
      cityLow.innerText = Math.round(data.main.temp_min) + "°";
      weatherType.innerText = data.weather[0].main;
      findCurrentWeatherIcon(data.weather[0].description);
      currentCity = data.name;
      currentCountry = data.sys.country;
      if (localStorage.Names.includes(currentCity)) {
        favBtn.style.color = "red";
        favBtn.className = "fa-solid fa-heart";
      } else {
        favBtn.style.color = "black";
        favBtn.className = "fa-regular fa-heart";
      }
      findWeather(currentCity);
    });
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
      console.log(data[0].name);

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
      fiveDayCall(data[0].lat, data[0].lon);
    });
}

//5day forecast
function fiveDayCall(lat, long) {
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

function favorite(city, country) {
  if (!localStorage.Names.includes(city)) {
    saveToLocalStorage(city, country);
    favBtn.style.color = "red";
    favBtn.className = "fa-solid fa-heart fa-2xl";
    addToFavs(city, country);
  }
}

function createElements() {
  let cityNames = getFromLocalStorage();

  cityNames.map((names) => {
    console.log(names);

    let i = document.createElement("i");
    i.className = "fa-solid fa-heart d-flex p-2 cityHistory";
    i.style.color = "red";
    let h4 = document.createElement("h4");
    h4.innerText = names;
    h4.className = "p-2";
    h4.style.color = "black";
    h4.style.fontFamily = "Farro";
    h4.addEventListener("click", function () {
      findSearchWeather(iterateUntilComma(h4.textContent));
      favTabs.className = "d-none bg-trans";
    });
    let removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "btn";
    removeBtn.innerText = "X";
    removeBtn.addEventListener("click", function () {
      removeFromLocalStorage(names);
      h4.remove();
      i.remove();
    });
    i.appendChild(h4);
    h4.insertAdjacentElement("afterend",removeBtn);
    storedValue.appendChild(i);
  });
}

function addToFavs(city, country) {
  let i = document.createElement("i");
  i.className = "fa-solid fa-heart d-flex p-2";
  i.style.color = "red";
  let h4 = document.createElement("h4");
  h4.innerText = `${city}, ${country}`;
  h4.className = "p-2 cityHistory";
  h4.style.color = "black";
  h4.style.fontFamily = "Farro";

  let removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "btn";
  removeBtn.innerText = "X";
  removeBtn.addEventListener("click", function () {
    removeFromLocalStorage(names);
    h4.remove();
    i.remove();
  });

  i.appendChild(h4);
  h4.appendChild(removeBtn);
  storedValue.appendChild(i);
}

function toTitleCase(s) {
  return s
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function iterateUntilComma(inputString) {
  let result = "";

  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === ",") {
      break;
    }
    result += inputString[i];
  }

  return result;
}

//Event Listeners
// generateLoc.addEventListener("click", function () {
//   findCurrentCity(currentLoc.coords.latitude, currentLoc.coords.longitude);
//   fiveDayCall(currentLoc.coords.latitude, currentLoc.coords.longitude);
// });

favBtn.addEventListener("click", function () {
  favorite(currentCity, currentCountry);
});

inputField.addEventListener("input", function () {
  if (inputField.value == "") {
    searchResult = "no input";
  } else {
    searchResult = toTitleCase(inputField.value);
  }
});

inputField.addEventListener("focus", function () {
  if(storedValue.textContent == '')
  {
    favTabs.className = 'd-none bg-trans'
  }else{
    favTabs.className = " ";  
  }
});

// inputField.addEventListener("blur", function () {
//   console.log('ddd')
//     favTabs.className = "d-none";
// });

// searchCol.addEventListener('mouseout',function(){
//   favTabs.className = 'd-none'
// })

// Body.addEventListener('click',function(){
//   favTabs.className = 'd-none'
// })

searchBtn.addEventListener("click", function () {
  findSearchWeather(searchResult);
  favTabs.className = "d-none";
});
