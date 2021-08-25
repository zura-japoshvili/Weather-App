const api = `https://api.openweathermap.org/data/2.5/weather?q=Tbilisi&units=metric&appid=201058e832fa52692296c02c11766767`;
const cities = [
    {
        name: "tbilisi",
        src: "img/tbilisi-img.jpg"
    },
    {
        name: "kutaisi",
        src: "img/qutaisi-img.jpg"
    },
    {
        name: "batumi",
        src: "img/batumi-img.jpg"
    },
    {
        name: "telavi",
        src: "img/telavi-img.jpg"
    }
];
let weather = {
    apiKey: "201058e832fa52692296c02c11766767",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city +"&units=metric&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city-name").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
          "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
           "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
          "Wind speed: " + speed + " km/h";
    }
}
let chooseC = 0
addEventListener('load', function(){
    weather.fetchWeather(cities[chooseC].name);
    createItemsFunc();
    addImg(chooseC);
});

const content = document.querySelector(".content");
content.innerHTML = createItemsFunc();
function createItemsFunc(){  
    return `<div class="city">
            <div class="city-info">
                <p class="city-name"></p>
                <div class="">
                    <img class="icon">
                    <p class="description"></p>
                </div>
                <p class="temp"></p>
                <p class="humidity"></p>
                <p class="wind"></p>
            </div>
        </div>`;
}

function addImg(arg){
    const content = document.querySelector(".city");
    let img = document.createElement("img");
    img.classList.add("img-space")
    img.src = cities[arg].src;
    content.appendChild(img);
}
function removeImg(){
    const content = document.querySelector(".city");
    const img = document.querySelector(".img-space");
    content.removeChild(img);
}

function clickBtn(arg){
    if(arg == 'tbilisi'){
        chooseC = 0
    }else if(arg == "kutaisi"){
        chooseC = 1;
    }else if(arg == "batumi"){
        chooseC = 2;
    }else if(arg == 'telavi'){
        chooseC = 3;
    }
    weather.fetchWeather(cities[chooseC].name);
    removeImg();
    addImg(chooseC);
}