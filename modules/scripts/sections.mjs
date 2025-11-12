// sections.mjs
export function setSectionSelection(sections) {
    console.log("Populating sections:", sections); // Debug line

    const sectionSelect = document.querySelector("#sectionNumber");
    sectionSelect.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = 0;
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = "--";
    sectionSelect.appendChild(placeholder);

    sections.forEach((section) => {
        const option = document.createElement("option");
        option.value = section.sectionNumber;
        option.textContent = section.sectionNumber;
        sectionSelect.appendChild(option);
    });
}
