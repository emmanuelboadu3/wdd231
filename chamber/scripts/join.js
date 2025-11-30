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
        const modalId = btn.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "flex";
    });
});

// Close modal
closeButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        btn.closest(".modal").style.display = "none";
    });
});

// Close modal when clicking outside
window.addEventListener("click", function (e) {
    modals.forEach(modal => {
        if (e.target === modal) modal.style.display = "none";
    });
});

// FOOTER YEAR & LAST MODIFIED
document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = new Date(document.lastModified).toLocaleString();
    }
});
