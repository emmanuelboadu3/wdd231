import { temples } from '../data/temples.js';
import { url } from '../data/temples.js';

//GET A REFERENCE TO THE HTML DIALOG ELEMENT
const mydialog = document.querySelector('#mydialog')
const mytitle = document.querySelector('#mydialog h2')
const myinfo = document.querySelector('#mydialog p')
const myclose = document.querySelector('#mydialog button')
myclose.addEventListener("click", () => mydialog.close())

// ---------------- LOOP THROUGH THE ARRAY OF JSON ITEMS
function displayItems(data) {
    console.log(data)
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement('img')
        photo.src = `${url}${x.path}`
        photo.alt = x.name
        //Add an event listener to each division on the page.
        photo.addEventListener('click', () => showStuff(x))
        showHere.appendChild(photo)
    }) // end loop
} // end function

// START DISPLAYING ALL ITEMS IN THE JSON FILE
displayItems(temples)

// POPULATE THE DIALOG WITH INFORMATION WHEN IMAGE IS CLICKED
function showStuff(x) {
    mytitle.innerHTML = x.name
    mydialog.showModal()
} // end of function