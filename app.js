const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const { Chess } = require("chess.js");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const chess = new Chess();
const players = {};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Chess Game" });
});

io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    if (!players.white) {
        players.white = socket.id;
        socket.emit("playerRole", "w");
    } else if (!players.black) {
        players.black = socket.id;
        socket.emit("playerRole", "b");
    } else {
        socket.emit("spectatorRole");
    }

    socket.emit("boardState", chess.fen());

    socket.on("move", (move) => {
        try {
            const turn = chess.turn();
            const currentSocket = turn === "w" ? players.white : players.black;
            if (socket.id !== currentSocket) return;

            const result = chess.move(move);
            if (result) {
                io.emit("move", move);
                io.emit("boardState", chess.fen());
            } else {
                socket.emit("invalidMove", move);
            }
        } catch (err) {
            console.error("Error processing move:", err.message);
            socket.emit("error", "Invalid move attempt");
        }
    });

    socket.on("disconnect", () => {
        if (socket.id === players.white) delete players.white;
        if (socket.id === players.black) delete players.black;
        console.log("Disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
