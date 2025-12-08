document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const firstName = params.get("firstName");
    const lastName = params.get("lastName");
    const email = params.get("email");
    const mobile = params.get("mobile");
    const language = params.get("language");
    const difficulty = params.get("difficulty");
    const title = params.get("title");
    const description = params.get("description");

    const output = `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Language:</strong> ${language}</p>
        <p><strong>Difficulty:</strong> ${difficulty}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
    `;

    document.getElementById("submitted-data").innerHTML = output;

    // Footer year
    document.getElementById("year").textContent = new Date().getFullYear();
});
