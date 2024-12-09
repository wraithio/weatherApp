import {APIKEY} from './environment.js'

navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position){
    console.log(position)
    console.log('Our latitude is ' + position.coords.latitude)
    console.log('Our longitude is ' + position.coords.longitude)
    console.log('Now we know where you are!')
}

function errorFunc(error){
    console.log(error.message)
}

function apiCall () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${APIKEY}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
    })
}

let generateLoc = document.getElementById('generateLoc');

generateLoc.addEventListener('click',function(){
    apiCall();
})