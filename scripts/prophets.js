// URL of the JSON data
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Select the div that will contain all the prophet cards
const cards = document.querySelector('#cards');

// Fetch the data and display it
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets); // Optional: check in console
    displayProphets(data.prophets);
}

getProphetData();

// Build and display prophet cards
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birthInfo = document.createElement('p');
        let childrenInfo = document.createElement('p');
        let portrait = document.createElement('img');

        // Fill in prophet data
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthInfo.textContent = `Born: ${prophet.birthdate} 
        Place of Birth : ${prophet.birthplace}`;
        childrenInfo.textContent = `Children: ${prophet.numofchildren}`;

        // Image attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Add elements to the card
        card.appendChild(fullName);
        card.appendChild(birthInfo);
        card.appendChild(childrenInfo);
        card.appendChild(portrait);

        // Add the card to the cards container
        cards.appendChild(card);
    });
};
