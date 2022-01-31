const KEY = "3a0fbdbc15644a9090ff8b171dcad037";
// Språk variabel
const language = "sv";
const h4Error = document.getElementById("error-message");
const btn = document.querySelector("button");

btn.addEventListener("click", function (event) {
  // Hämtar information från sökrutan lagra i en variable som jag kan använda
  const input = document.querySelector("input");
  let searchText = input.value;
  //reset error texten
  h4Error.innerText = "";
  const url = `https://api.weatherbit.io/v2.0/current?city=${searchText}&key=${KEY}&lang=${language}`;
  const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchText}&key=${KEY}&lang=${language}`;

  fetch(url).then(fetchCallBack).then(handleData).catch(catchError);
  // kedjorna har varsin Datahanterare
  fetch(forecastUrl)
    .then(fetchCallBack)
    .then(handleForecastData)
    .catch(catchError);
});

function fetchCallBack(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log(response);
    return response.json();
  } else {
    throw "Something went wrong. :(";
  }
}
function handleData(data) {
  // skickar datan till olika metoder
  description(data.data[0].weather.description);
  getImageUrl(data.data[0].weather.icon);
  temprature(data.data[0].temp);
  windSpeed(data.data[0].wind_spd);
  humidityvalue(data.data[0].rh);
}

// Denna functionen består av en for loop som körs 5 gånger för vi vill få data för 5 dagar.
// vi vill ha datan från index 1-5 så för index 0 ger dagens data därför börjar loopen på 1.
// BildOchPlats variablen är till för att skicka värdena 01234 som vi behöver till querySelectorAll längre ner i koden.
// vi skickar 2 värden både datan och bildochplats "i - 1".
function handleForecastData(data) {
  console.log(data);
  for (let i = 1; i < 6; i++) {
    let BildOchDivPlats = i - 1;
    // Lägg märke till att detta skickas till getImageUrl2.
    getImageUrl2(data.data[i].weather.icon, BildOchDivPlats);
    forecasttemprature(data.data[i].temp, BildOchDivPlats);
    forecastDescription(data.data[i].weather.description, BildOchDivPlats);
  }
}

function catchError(error) {
  h4Error.innerText =
    "Du måste fylla i textfältet för att söka. Kolla stavningen på staden du har sökt på";

  console.log(error);
}
function description(description) {
  var h3Description = document.getElementById("current-description");
  h3Description.innerText = description;
}
// sätter tempraturen
function temprature(temprature) {
  let temp = temprature;

  temp = Math.round(temp);

  var tempP = document.getElementById("current-temp");
  temp = "Tempraturen: " + temp + "°";

  tempP.innerText = temp;
}
//sätter wind speed
function windSpeed(windSpeed) {
  let wind = windSpeed;

  wind = Math.round(wind);

  var windP = document.getElementById("current-wind");
  wind = "Vindhastigheten: " + wind + "m/s";

  windP.innerText = wind;
}
// Sätter luftfuktigheten
function humidityvalue(humidityValue) {
  let humidity = humidityValue;

  humidity = Math.round(humidity);

  var humidityP = document.getElementById("current-humidity");
  humidity = "Luftfuktigheten: " + humidity + "%";

  humidityP.innerText = humidity;
}
// hanterar icon värdet lagara de i en url som sedan skickas vidare till displayImg
function getImageUrl(iconcode) {
  let icon = iconcode;

  let imgUrl = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

  displayImg(imgUrl);
}
// sätter url i img src så här src "https://www.weatherbit.io/static/img/icons/${icon}.png"
function displayImg(url) {
  var img = document.querySelector("img");

  img.src = url;
}
// här fungerar den som getImageUrl men skickar vidare 2 värden imgUrl och i.
// i är samma värde som Bildochplats.
function getImageUrl2(iconcode, i) {
  let icon = iconcode;

  let imgUrl = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

  displayImg2(imgUrl, i);
}

function displayImg2(url, i) {
  // Väljer alla sections i html koden
  var forecastSection = document.querySelectorAll("section");
  // väljer specefikt sectionen som är på index 2 och väljer alla bilder där.
  let forecastImges = forecastSection[2].querySelectorAll("img");
  //fösta gången loopen körs är  "bildochplats" 0 sedan 1 osv 234.
  //väljer img tagen på index av bildochplats värdet och Sätter img scr
  forecastImges[i].src = url;
}
function forecasttemprature(temprature, i) {
  // funkar på samma sätt som displayImg2 fast för divarna finns 5 divar som ligger på index 01234.
  var forecastSection = document.querySelectorAll("section");
  var forecastdiv = forecastSection[2].querySelectorAll("div");

  var forecastP = forecastdiv[i].querySelectorAll("p");
  let temp = Math.round(temprature);

  temp = "Tempraturen: " + temp + "°";

  // Väljer första p elmentet i diven sätte texten till temp
  forecastP[0].innerText = temp;
}
// beskrivning
function forecastDescription(description, i) {
  // samma här väljer alla sections
  var forecastSection = document.querySelectorAll("section");
  // väljer sectionen  på index 2.
  var forecastdiv = forecastSection[2].querySelectorAll("div");
  // väljer alla p taggar i en div det som bestämmer vilken div är for loopen
  var forecastP = forecastdiv[i].querySelectorAll("p");

  // p tagen som ligger på index 1 vilket blir andra p tagen i diven.
  forecastP[1].innerText = description;
}
