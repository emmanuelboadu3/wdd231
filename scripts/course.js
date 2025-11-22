const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes...',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseCards = document.getElementById("courseCards");
const totalCredits = document.getElementById("totalCredits");

// Modal elements
const modal = document.getElementById("courseModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalCourseTitle");
const modalCode = document.getElementById("modalCourseCode");
const modalDescription = document.getElementById("modalCourseDescription");
const modalCredits = document.getElementById("modalCourseCredits");

// Close modal on button click
closeModal.addEventListener("click", () => modal.close());

// Close modal on clicking outside
modal.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();
    const inside = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );
    if (!inside) modal.close();
});

// Render course cards
function renderCourses(filter = "all") {
    courseCards.innerHTML = "";

    let filtered = courses;
    if (filter === "wdd") filtered = courses.filter(c => c.subject === "WDD");
    if (filter === "cse") filtered = courses.filter(c => c.subject === "CSE");

    const creditSum = filtered.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = `Total Credits: ${creditSum}`;

    filtered.forEach(course => {
        const card = document.createElement("div");
        card.className = course.completed ? "course-card completed" : "course-card incomplete";
        card.innerHTML = `
          <h3>${course.subject} ${course.number}: ${course.title}</h3>
          <p><strong>Credits:</strong> ${course.credits}</p>
          <p><strong>Certificate:</strong> ${course.certificate}</p>
          <p>${course.description}</p>
          <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
        `;

        // Add click listener to open modal with course details
        card.addEventListener("click", () => {
            modalTitle.textContent = course.title;
            modalCode.textContent = `${course.subject} ${course.number}`;
            modalDescription.textContent = course.description;
            modalCredits.textContent = `Credits: ${course.credits}`;
            modal.showModal();
        });

        courseCards.appendChild(card);
    });
}

// Filter buttons
document.getElementById("allCourses").addEventListener("click", () => renderCourses("all"));
document.getElementById("wddCourses").addEventListener("click", () => renderCourses("wdd"));
document.getElementById("cseCourses").addEventListener("click", () => renderCourses("cse"));

// Initial render
renderCourses();
