// ====== NAVIGATION.JS ======
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("show");
    navMenu.classList.toggle("show");
});
