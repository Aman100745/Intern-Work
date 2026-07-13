// server.js
// This is the backend of my portfolio website.
// I used Node.js and Express to create simple APIs.
// Instead of a real database, I am storing data in JSON files
// inside the "data" folder. This is easier for a small project.

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// paths to our "database" files
const projectsFile = path.join(__dirname, "data", "projects.json");
const messagesFile = path.join(__dirname, "data", "messages.json");

// middleware
app.use(express.json()); // to read JSON data sent from frontend
app.use(express.static(path.join(__dirname, "public"))); // serve html/css/js files

// ------------------ ROUTES ------------------

// GET all projects -> read from projects.json and send to frontend
app.get("/api/projects", (req, res) => {
  fs.readFile(projectsFile, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Could not read projects" });
    }
    res.json(JSON.parse(data));
  });
});

// POST a new project -> add a new project to projects.json
app.post("/api/projects", (req, res) => {
  const newProject = req.body;

  fs.readFile(projectsFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Could not read projects" });
    }

    const projects = JSON.parse(data);

    // give the new project an id (just last id + 1)
    newProject.id = projects.length > 0 ? projects[projects.length - 1].id + 1 : 1;
    projects.push(newProject);

    fs.writeFile(projectsFile, JSON.stringify(projects, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Could not save project" });
      }
      res.json({ message: "Project added!", project: newProject });
    });
  });
});

// POST contact form message -> save to messages.json
app.post("/api/contact", (req, res) => {
  const newMessage = req.body;
  newMessage.date = new Date().toLocaleString();

  fs.readFile(messagesFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Could not read messages" });
    }

    const messages = JSON.parse(data);
    messages.push(newMessage);

    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Could not save message" });
      }
      res.json({ message: "Thanks for your message! I will get back to you soon." });
    });
  });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
