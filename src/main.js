// dev server at http://localhost:8080/
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import {symptomSearch, doctorSearch} from "./medical-api.js";





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
