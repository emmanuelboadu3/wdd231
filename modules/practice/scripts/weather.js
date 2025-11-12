// SELECT HTML ELEMENTS IN THE DOCUMENT
const myTown = document.querySelector("#town");
const myDescription = document.querySelector("#description");
const myTemperature = document.querySelector("#temperature");
const myGraphic = document.querySelector("#graphic");

// CREATE REQUIRED VARIABLES FOR THE URL
const myKey = "443e9831fce9fdd2f2a9a083901ad5da";
const myLat = "42.9106";
const myLong = "-76.802231";

// CONSTRUCT A FULL PATH USING TEMPLATE LITERALS
const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// TRY TO GRAB THE CURRENT WEATHER DATA
async function apiFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json()
            displayResults(data); 
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// DISPLAY THE JSON DATA ONTO MY WEB PAGE
function displayResults(data) {

    // Update text content
    myTown.textContent = data.name;
    myDescription.textContent = data.weather[0].description;
    myTemperature.innerHTML = `${data.main.temp}&deg;F`;

    // Build icon URL
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Update image attributes
    myGraphic.setAttribute('src', iconSrc);
    myGraphic.setAttribute('alt', data.weather[0].description);
}
apiFetch();