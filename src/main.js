// dev server at http://localhost:8080/
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {symptomSearch, doctorSearch} from "./medical-api.js";




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



    // appending doctor bio
    $(`.result${doctorResultID}`).append(`<div><p>${entry.profile.bio}</p></div>`);
  });
}



//// UI Logic

$(document).ready(function(){
  $(".symptom-search").submit(function(event){
    event.preventDefault();
    console.log("Searching by symptom");
    let userInput = $(".symptom-input").val();
    let location = ($(".location-state").val() +  "-" + $(".location-city").val()).toLowerCase();
    console.log(location);
    symptomSearch(userInput, location);


  });


  $(".doctor-search").submit(function(event){
    event.preventDefault();
    console.log("Searching by doctor name");
    let userInput = $(".doctor-input").val();
    let location = ($(".location-state").val() +  "-" + $(".location-city").val()).toLowerCase();
    console.log(location);
    doctorSearch(userInput,location);
  });



});
