// script.js
// This file connects our frontend to the backend APIs we made in server.js

// 1. Load projects from backend when page loads
async function loadProjects() {
  try {
    const response = await fetch("/api/projects");
    const projects = await response.json();

    const container = document.getElementById("projects-container");
    container.innerHTML = ""; // clear "Loading..." text

    projects.forEach((project) => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      card.innerHTML = `
        <h3>${project.title}</h3>
        <p class="tech">${project.tech}</p>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">View Project</a>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.log("Error loading projects:", error);
    document.getElementById("projects-container").innerHTML =
      "<p>Could not load projects. Please make sure the server is running.</p>";
  }
}

// call the function once page loads
loadProjects();

// 2. Handle contact form submit
const contactForm = document.getElementById("contact-form");
const formResponse = document.getElementById("form-response");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault(); // stop page from refreshing

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();
    formResponse.textContent = data.message;

    // clear the form
    contactForm.reset();
  } catch (error) {
    console.log("Error sending message:", error);
    formResponse.textContent = "Something went wrong. Please try again.";
  }
});
