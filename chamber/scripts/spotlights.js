// ====== spotlights.js ======
async function loadSpotlights() {
    try {
        const response = await fetch("./data/members.json"); // adjust path if needed
        const members = await response.json();

        // Filter Gold and Silver members (assuming membership is numeric: 2=Silver, 3=Gold)
        const goldSilver = members.filter(m =>
            m.membership === 2 || m.membership === 3
        );

        // Randomly select 2–3 members
        const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const selected = goldSilver.sort(() => 0.5 - Math.random()).slice(0, count);

        const container = document.getElementById("spotlight-container");
        container.innerHTML = ""; // clear previous

        selected.forEach(member => {
            const card = document.createElement("div");
            card.className = "spotlight-card";

            card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p><strong>Membership:</strong> ${getMembershipName(member.membership)}</p>
      `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Spotlights fetch error:", error);
        document.getElementById("spotlight-container").textContent = "Unable to load member spotlights.";
    }
}

// Reuse membership name converter
function getMembershipName(level) {
    switch (level) {
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Member";
    }
}

// Initialize
loadSpotlights();
