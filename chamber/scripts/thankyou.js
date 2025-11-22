document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const first = params.get("first");
    const last = params.get("last");
    const email = params.get("email");
    const phone = params.get("phone");
    const organization = params.get("organization");
    const timestamp = params.get("timestamp");

    const output = `
    <p><strong>First Name:</strong> ${first}</p>
    <p><strong>Last Name:</strong> ${last}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mobile Phone:</strong> ${phone}</p>
    <p><strong>Organization:</strong> ${organization}</p>
    <p><strong>Submitted At:</strong> ${timestamp}</p>
  `;

    document.getElementById("submitted-data").innerHTML = output;

    // Footer year
    document.getElementById("year").textContent = new Date().getFullYear();
});
