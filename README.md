# ♟️ Real-Time Multiplayer Chess Game

A real-time multiplayer chess game built with **Node.js**, **Socket.IO**, **Express**, and **chess.js**. Supports live two-player gameplay, legal moves, drag-and-drop functionality, and auto board-flipping based on role.

---

## 🚀 Live Demo

> 🌐 [Play Now on Render](https://chess-game-yyiz.onrender.com/)  


---

## 📸 Preview

Chess Game Screenshot![Screenshot (41)](https://github.com/user-attachments/assets/4cf97d1d-35d6-4626-9c9a-a3664df405b2)![Screenshot (106)](https://github.com/user-attachments/assets/3d86e4b9-e2d7-494e-ab81-0ef67c5fac69)



---

## ✨ Features

- ♟️ Real-time multiplayer via **Socket.IO**
- 🔁 Board auto-flips for black player
- 🧠 Game logic powered by **chess.js**
- 🎯 Drag-and-drop piece movement
- 👁️ Spectator support (watch live game)
- 💄 Styled with **Tailwind CSS**
- 🌐 Deployed using **Render**

---

## 🧠 Tech Stack

| Layer        | Technology               |
|--------------|--------------------------|
| Frontend     | HTML, Tailwind CSS, JS   |
| Backend      | Node.js, Express         |
| Realtime     | Socket.IO                |
| Chess Logic  | chess.js (legal validation) |
| Templating   | EJS                      |
| Deployment   | Render.com               |

---

## 🗂️ Folder Structure
📦 chess-game/

┣ 📂 public/

┃ ┗ 📂 js/

┃ ┗ 📜 chessgame.js # Client-side game logic

┣ 📂 views/

┃ ┗ 📜 index.ejs # Main view template

┣ 📜 app.js # Express + Socket.IO server

┣ 📜 package.json

┣ 📜 .gitignore

┗ 📜 README.md

---

## 🧪 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/chess-game.git
cd chess-game

# Install dependencies
npm install

# Run the server
node app.js

# Open in browser
http://localhost:3000

