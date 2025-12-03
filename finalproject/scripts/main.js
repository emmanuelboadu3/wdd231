// scripts/main.js
const featuredList = document.getElementById("featured-list");
const DATA_URL = "data/tutorials.json";

// Fetch and display tutorials
async function loadTutorials() {
    try {
        const res = await fetch(DATA_URL);
        if (!res.ok) throw new Error("Failed to fetch tutorials data");
        const tutorials = await res.json();

        displayTutorials(tutorials);
    } catch (error) {
        console.error("Error loading tutorials:", error);
        featuredList.innerHTML = "<p>Failed to load tutorials.</p>";
    }
}

// Render tutorial cards
function displayTutorials(tutorials) {
    const cardsHTML = tutorials.map(t => {
        return `
      <div class="card">
        <img src="${t.image}" alt="${t.title}" loading="lazy">
        <div class="card-content">
          <h3>${t.title}</h3>
          <p>${t.description}</p>
          <p><strong>Duration:</strong> ${t.duration} | <strong>Difficulty:</strong> ${t.difficulty}</p>
          <a href="${t.link}" target="_blank" class="btn btn-primary">View Tutorial</a>
        </div>
      </div>
    `;
    }).join("");

    featuredList.innerHTML = cardsHTML;
}

// Initialize
document.addEventListener("DOMContentLoaded", loadTutorials);
