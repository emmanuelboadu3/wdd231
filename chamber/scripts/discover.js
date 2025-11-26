import { places } from '../data/places.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("allplaces");
    const lastVisitEl = document.getElementById("last-visit");

    // DYNAMIC PLACE CARDS======//
    places.slice(0, 8).forEach(place => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Title
        const title = document.createElement("h2");
        title.textContent = place.title;

        // Description
        const description = document.createElement("p");
        description.textContent = place.description;

        // Address
        const address = document.createElement("address");
        address.textContent = place.address;

        // Button
        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = "Learn More";

        // Extra info (hidden by default)
        const extraInfo = document.createElement("div");
        extraInfo.classList.add("extra-info");
        extraInfo.textContent = `Cost: ${place.cost}`;

        // Toggle extra info on button click
        button.addEventListener("click", () => {
            extraInfo.classList.toggle("visible");
            button.textContent = extraInfo.classList.contains("visible")
                ? "Hide Info"
                : "Learn More";
        });

        // Text wrapper
        const text = document.createElement("div");
        text.classList.add("text");
        text.append(title, description, address, button, extraInfo);

        // Figure for image
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = `images/${place.image}`;
        img.alt = place.title;
        figure.appendChild(img);

        // Append in correct order
        card.append(figure, text);
        container.appendChild(card);
    });

    // LAST VISIT MESSAGE
    const now = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
        lastVisitEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const diffDays = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        if (diffDays < 1) {
            lastVisitEl.textContent = "Back so soon! Awesome!";
        } else if (diffDays === 1) {
            lastVisitEl.textContent = "You last visited 1 day ago.";
        } else {
            lastVisitEl.textContent = `You last visited ${diffDays} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now.toString());
});
