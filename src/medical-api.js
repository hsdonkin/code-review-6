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
  })

}
