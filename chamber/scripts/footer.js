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

