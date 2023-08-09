//function to get user location using ip geolocation API
async function getUserLocation(){
    responce=await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=41cd215cc4094fd5be5a6f0f735fe079')
    responce=await responce.json()
    let city=responce.time_zone.name.split('/').pop()
    getForecastApi(city)
}

// async function to get the weather API
async function getForecastApi(city){
    var responce = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=904da4a032874a7fa81125718230608&q=${city}&days=3`)
    responce = await responce.json()
    display(responce)
}
//function to display the result
function display(responce){
    let forecast=document.querySelector(".forecast");
    let forecastArr=[];
    forecastArr=responce.forecast.forecastday;
    // for current day weather
    let cartoona =`
                <div class="col-lg-4 ">
                   <div class="bg-white rounded-4 p-3 weather-card">
                    <div class="date d-flex justify-content-between font-monospace fw-bold">
                        <p>${determineDay(forecastArr[0].date)}</p>
                        <p>${determineDate(responce.current.last_updated)}</p>
                    </div>
                    <h3 class="country">${responce.location.name}</h3>
                    <h1 class="degree">${responce.current.temp_c}<sup>o</sup>C</h1>
                    <img src="https:${responce.current.condition.icon}" class="weather-icon ">
                    <p class="weather-description text-info fw-bolder">${responce.current.condition.text}</p>
                    <div class="card-button d-flex justify-content-start ">
                        <div class="d-flex">
                            <img src="https://routeweather.netlify.app/images/icon-umberella.png">
                            <p>${responce.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
                        </div>
                        <div class="d-flex px-lg-3 px-5 " >
                            <img src="https://routeweather.netlify.app/images/icon-wind.png">
                            <p>${responce.current.wind_kph}km/h</p>
                        </div>
                        <div class="d-flex">
                            <img src="https://routeweather.netlify.app/images/icon-compass.png">
                            <p>${determineWindDirection(responce.current.wind_dir)}<sup>o</sup></p>
                        </div>
                    </div>
                   </div>
                </div>
                

                
    `
    // for the forecast of next 2 days
   
    let forecastCartoona =``
    for(var i=1;i<forecastArr.length;i++){
        forecastCartoona+=`
        <div class="col-lg-4  ">
        <div class="weather-card bg-white rounded-4 p-3 text-center ">
         <div class="date  font-monospace fw-bold">
             <p>${determineDay(forecastArr[i].date)}</p>
         </div>
         <img src="https:${forecastArr[i].day.condition.icon}" class="weather-icon pb-3">
         <h3 class="degree">${forecastArr[i].day.maxtemp_c}<sup>o</sup>C</h3>
         <h6 class="pb-4">${forecastArr[i].day.mintemp_c}<sup>o</sup>C</h6>
         <p class=" pb-4 text-info fw-bolder">${forecastArr[i].day.condition.text}</p>
        </div>
     </div>
        `
    }
    // display
    forecast.innerHTML=(cartoona+forecastCartoona)
}
// caling getUserLocation function to display weather according to user location
getUserLocation()


// variable for the input
let searchBar=document.querySelector(".search")

//function to display weather according to the location entered by the user
async function search(){
    if(searchBar.value.length>2){
       let searchResponce = await fetch(`https://api.weatherapi.com/v1/search.json?key=904da4a032874a7fa81125718230608&q=${searchBar.value}`)
       searchResponce = await searchResponce.json()
       city=searchResponce[0].name;
       getForecastApi(city);
    }
}
searchBar.addEventListener("keyup",search)
   

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function to convert date recieved from API into day name
function determineDay(date){
    let day= new Date(date)
    let daysOfWeek = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
    return daysOfWeek[day.getDay()];
 }
 
 // function to convert date recieved from API into day and month
 function determineDate (date){
     let reqDate =new Date(date);
     let monthNames = [ "January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December" ];
     return reqDate.getDate()+' '+monthNames[reqDate.getMonth()]
 }
 
 // function to change the letter that determine direction of wind into word 
 function determineWindDirection(word){
     const firstLetter =word.charAt(0);
     switch (firstLetter){
         case'N':
         return "North";
         break;
         case'S':
         return "South";
         break;
         case'E':
         return "East";
         break;
         case'W':
         return "West";
         break;
     }
 
 }
 





