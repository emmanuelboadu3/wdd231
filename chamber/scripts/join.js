// Set timestamp
document.getElementById("timestamp").value = new Date().toISOString();

// Modal functionality
const openButtons = document.querySelectorAll(".open-modal");
const closeButtons = document.querySelectorAll(".close");
const modals = document.querySelectorAll(".modal");

// Open modal
openButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(btn.getAttribute("href")).style.display = "flex";
    });
});

// Close modal
closeButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        btn.parentElement.parentElement.style.display = "none";
    });
});

// Close modal when clicking outside content
window.addEventListener("click", function (e) {
    modals.forEach(modal => {
        if (e.target === modal) modal.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Update year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Update last modified
    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = new Date(document.lastModified).toLocaleString();
    }
});

