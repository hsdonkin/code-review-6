// dev server at http://localhost:8080/
import 'bootstrap';
import './styles.css';
import $ from 'jquery';
import {symptomSearch, doctorSearch} from "./medical-api.js";




// This appends the page with results from the api call
export function printDoctor(searchResult){
  if (searchResult.data.length === 0) {
    return $(".output").append(`<p>Sorry! No results found!</p>`);

  }
  $(".output").text("");
  let doctorResultID = 0;
  searchResult.data.forEach(function(entry){
    doctorResultID++;
    $(".output").append(`<div class="doctor-result result${doctorResultID}">`)
    $(`.result${doctorResultID}`).append(`<div><p>${entry.profile.first_name} ${entry.profile.last_name}</p></div>`);
    // appending phone number, address, website
    $(`.result${doctorResultID}`).append(`<div>Phone: ${entry.practices[0].phones[0].number} Address: ${entry.practices[0].visit_address.street}</div>`);
    // appending accepting patients

    // appending doctor bio
    $(`.result${doctorResultID}`).append(`<div><p>${entry.profile.bio}</p></div>`);
  })
}



//// UI Logic

$(document).ready(function(){
  $(".symptom-search").submit(function(event){
    event.preventDefault();
    console.log("Searching by symptom");
    let userInput = $(".symptom-input").val();
    symptomSearch(userInput);


  });


  $(".doctor-search").submit(function(event){
    event.preventDefault();
    console.log("Searching by doctor name");
    let userInput = $(".doctor-input").val();
    doctorSearch(userInput);
  });



});
