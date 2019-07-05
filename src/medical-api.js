import {printDoctor} from "./main.js";

//// API Logic
export let apiKey = process.env.DOCTOR_API_KEY;
export let mapsAPIKey = process.env.MAPS_API_KEY;
console.log(apiKey);
console.log(mapsAPIKey);

export function symptomSearch(symptomName,location){

  let symptomPromise = new Promise(function(resolve,reject){
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${apiKey}&location=${location}&query=${symptomName}`

    request.onload = function(){
      if (this.status === 200) {
        resolve(request.response);
        console.log("Api responded!");
      }else {
        reject(Error(request.statusText));
      }
    }

    request.open("GET", url, true);
    request.send();

  });

  symptomPromise.then(function(response){
    let apiResult = JSON.parse(response);
    console.log(apiResult);
    printDoctor(apiResult);
    generateMarkers(apiResult);

  })
}

export function doctorSearch(doctorName,location){

  let doctorPromise = new Promise(function(resolve,reject){
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${apiKey}&location=${location}&name=${doctorName}`;

    request.onload = function(){
      if (this.status === 200) {
        resolve(request.response);
        console.log("Api responded!");
      }else {
        reject(Error(request.statusText));
      }
    }

    request.open("GET", url, true);
    request.send();

  });

  doctorPromise.then(function(response){
    let apiResult = JSON.parse(response);
    console.log(apiResult);
    printDoctor(apiResult);
    generateMarkers(apiResult);
  })

}

/// google maps markers

export class MapMarker{
  constructor(name, address){
    this.name = name;
    this.address = address;
  }
}

export function generateMarkers(apiResult){
  let officeLoc = [];
  // this goes through all the objects and creates an array of office locations
  apiResult.data.forEach(function(entry){
    entry.practices.forEach(function(practice){
      let marker = new MapMarker(practice.name,practice.visit_address.street);
      officeLoc.push(marker);

    });
  });
  console.log(officeLoc);
}
