// dev server at http://localhost:8080/
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {apiKey, mapsAPIKey, symptomSearch, doctorSearch} from "./medical-api.js";






// This appends the page with results from the api call
export function printDoctor(searchResult){
  $(".output").text("");
  if ($(".location-state").val() === "" || $(".location-city").val() === "") {
    return $(".output").append(`<div class="doctor-result"><p>Sorry! Please select a city and state!</p></div>`);
  } else if (searchResult.data.length === 0) {
    return $(".output").append(`<div class="doctor-result"><p>Sorry! No results found!</p></div>`);

  }
  let doctorResultID = 0;
  searchResult.data.forEach(function(entry){
    doctorResultID++;
    $(".output").append(`<div class="doctor-result result${doctorResultID}">`)
    $(`.result${doctorResultID}`).append(`<div><h2>${entry.profile.first_name} ${entry.profile.last_name}</h2></div>`);
    // appending phone number, address, website
    $(`.result${doctorResultID}`).append(`<div>Phone: ${entry.practices[0].phones[0].number}</div>`);
    $(`.result${doctorResultID}`).append(`<div>Address: ${entry.practices[0].visit_address.street}</div>`);

    // not every doctor has a website, so if they do:
    if (entry.practices[0].website != undefined) {
        $(`.result${doctorResultID}`).append(`<div>Website:<a href="${entry.practices[0].website}"> ${entry.practices[0].website}</a></div>`);
    }

    // appending accepting patients
    for(let i = 0; i < entry.practices.length; i++){
      if (entry.practices[i].accepts_new_patients === true) {
         $(`.result${doctorResultID}`).append(`<div>Accepting new patients</div>`);
         // set i to the loop end condition so it doesn't keep running
         i=entry.practices.length;
      }
    }
    // appending doctor bio
    $(`.result${doctorResultID}`).append(`<div><p>${entry.profile.bio}</p></div>`);
  });
}


/// maps Logic
// none of the google stuff is working yet, so just commenting it out for now....

function setMapLocation(location){
  console.log(mapsAPIKey);
  $(".maps-wrapper iframe").attr("src",`https://www.google.com/maps/embed/v1/search?q=${$(".location-city").val()}&key=${mapsAPIKey}`);
}

// const googleMapsClient = require('@google/maps').createClient({
//   key: `${mapsAPIKey}`
// });
//
// function setAPIKey(){
//   $("header script").attr("src",`https://maps.googleapis.com/maps/api/js?key=${mapsAPIKey}&callback=initMap`);
// }

// function initMap() {
//   var myLatLng = {lat: -25.363, lng: 131.044};
//
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: myLatLng
//   });
//
//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     title: 'Hello World!'
//   });
// }



//// UI Logic

$(document).ready(function(){

  $(".maps-wrapper iframe").attr("src",`https://www.google.com/maps/embed/v1/search?q=Portland&key=${mapsAPIKey}`);
  // initMap();
  // setAPIKey();

  $(".symptom-search").submit(function(event){
    event.preventDefault();
    console.log("Searching by symptom");
    let userInput = $(".symptom-input").val();
    let location = ($(".location-state").val() +  "-" + $(".location-city").val()).toLowerCase();
    console.log(location);
    symptomSearch(userInput, location);
    setMapLocation(location);


  });


  $(".doctor-search").submit(function(event){
    event.preventDefault();
    console.log("Searching by doctor name");
    let userInput = $(".doctor-input").val();
    let location = ($(".location-state").val() +  "-" + $(".location-city").val()).toLowerCase();
    console.log(location);
    doctorSearch(userInput,location);
    setMapLocation(location);
  });



});
