# Personal Portfolio Website

A full stack personal portfolio project built using **HTML, CSS, JavaScript**
on the frontend and **Node.js + Express.js** on the backend.

Instead of MySQL/MongoDB/PostgreSQL, this project stores data in simple
JSON files (`data/projects.json` and `data/messages.json`). This keeps the
project easy to run without installing any database software, while still
showing how a frontend talks to a backend "database" through APIs.

## Features
- Home, About, Skills, Projects and Contact sections
- Projects are fetched from the backend using `fetch()` and displayed dynamically
- Contact form sends messages to the backend, which saves them to `data/messages.json`
- Fully responsive design

## Tech Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- "Database": JSON files (data/projects.json, data/messages.json)

## How to Run

1. Make sure you have [Node.js](https://nodejs.org) installed.
2. Open a terminal in this project folder.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Folder Structure
```
portfolio-project/
│
├── server.js              -> Express backend (APIs)
├── package.json
├── data/
│   ├── projects.json       -> stores project details (acts as database)
│   └── messages.json       -> stores contact form messages
└── public/
    ├── index.html           -> main webpage
    ├── style.css            -> styling
    └── script.js            -> frontend logic (fetches projects, handles form)
```

## Things I can improve later
- Add an admin page to add/edit/delete projects from the browser instead of editing JSON directly
- Add project images
- Deploy on Vercel/Netlify (frontend) + Render/Railway (backend)
- Replace JSON files with a real database like MongoDB
