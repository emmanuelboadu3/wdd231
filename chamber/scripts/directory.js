// ====== directory.js ======

const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch("./data/members.json"); // safer with ./ for local paths
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = ""; // Clear existing content

    members.forEach((member, index) => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        // Create the image element properly
        const img = document.createElement("img");
        img.src = `images/${member.image}`;
        img.alt = member.name;


        card.appendChild(img);

        // Member info
        const name = document.createElement("h3");
        name.textContent = member.name;

        const desc = document.createElement("p");
        desc.textContent = member.description;

        const address = document.createElement("p");
        address.innerHTML = `<strong>Address:</strong> ${member.address}`;

        const phone = document.createElement("p");
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

        const website = document.createElement("p");
        website.innerHTML = `<strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a>`;

        const membership = document.createElement("p");
        membership.innerHTML = `<strong>Membership Level:</strong> ${getMembershipName(member.membership)}`;

        // Append all content
        card.append(name, desc, address, phone, website, membership);
        membersContainer.appendChild(card);
    });
}

// ====== Convert membership number to name ======
function getMembershipName(level) {
    switch (level) {
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Member";
    }
}

// ====== GRID / LIST VIEW TOGGLE ======
gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

// ====== INITIALIZE ======
getMembers();

document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    const lastModifiedEl = document.getElementById("lastModified");

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    if (lastModifiedEl) {
        lastModifiedEl.textContent = new Date(document.lastModified).toLocaleString();
    }
});
