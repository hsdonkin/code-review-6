const apiKey = process.env.API_KEY;

export function symptomSearch(symptomName){

  let symptomPromise = new Promise(function(resolve,reject){
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${apiKey}&location=or-portland&query=${symptomName}`

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
  })
}

export function doctorSearch(doctorName){

}