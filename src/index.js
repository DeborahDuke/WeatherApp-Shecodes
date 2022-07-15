function getRealTime(date){
    
    let hours = date.getHours();
    if (hours < 10){
      hours = `0${hours}`
    }

    let min = date.getMinutes();
    if (min <10){
        min =`0${min}`;
    }

    let dayIndex = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[dayIndex];

    return `${day} ${hours}:${min}`;

}

let dateTime = document.querySelector("#current-date");
let nowTime = new Date();

dateTime.innerHTML = getRealTime(nowTime);


function weatherCondition(response){
    document.querySelector("#temperature").innerHTML= Math.round(response.data.main.temp)
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);

    console.log(response)
}

function searchCity(city){
    let apiKey = "d4972ed5b674c4f6f2dbcc08bf9b31cb";
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(weatherCondition)

}

function handleSubmit(event){
    event.preventDefault();
    
    let city = document.querySelector("#searched-city").value;
    searchCity(city);

    // let searchCity = document.querySelector("#city");
    // let cityInput = document.querySelector("#searched-city")
    // searchCity.innerHTML = cityInput.value
    // make an api call


}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


function searchLocation(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "d4972ed5b674c4f6f2dbcc08bf9b31cb";
    let unit = "metric";
    let link = "https://api.openweathermap.org/data/2.5/weather?";
    let apiURL = `${link}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

    axios.get(apiURL).then(weatherCondition)
}




function getCurrentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);

}

let currentLocation = document.querySelector("#current-location-button")
currentLocation.addEventListener("click", getCurrentLocation)
searchCity("New York")



// //Bonus Point:
// function convertToFahren(event){
//     event.preventDefault();
//     let tempElement = document.querySelector("#temperature");
//     let temperature = tempElement.innerHTML;
//     temperature = Number(temperature);
//     tempElement.innerHTML = Math.round((temperature * 9 / 5) + 32)

// }








// //Convert back to celsius. 
// function convertToCelsius(event){
//     event.preventDefault();
//     let tempElement = document.querySelector("#temperature");
//     let temperature = tempElement.innerHTML;
//     temperature = Number(temperature);
//     tempElement.innerHTML = Math.round((temperature - 32) / 1.8)
// }


