const socket = io();
const chess = new Chess();
const boardElement = document.getElementById("board");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";

    board.forEach((row, rowIndex) => {
        row.forEach((square, colIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square", (rowIndex + colIndex) % 2 === 0 ? "light" : "dark");
            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = colIndex;

            if (square) {
                const piece = document.createElement("div");
                piece.classList.add("piece", square.color === "w" ? "white" : "black");
                piece.textContent = getPieceUnicode(square);
                piece.draggable = square.color === playerRole;

                piece.addEventListener("dragstart", (e) => {
                    if (piece.draggable) {
                        draggedPiece = piece;
                        sourceSquare = { row: rowIndex, col: colIndex };
                        e.dataTransfer.setData("text", "");
                    }
                });

                piece.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(piece);
            }

            squareElement.addEventListener("dragover", (e) => e.preventDefault());
            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (!draggedPiece) return;

                const targetSquare = {
                    row: parseInt(squareElement.dataset.row),
                    col: parseInt(squareElement.dataset.col),
                };
                handleMove(sourceSquare, targetSquare);
            });

            boardElement.appendChild(squareElement);
        });
    });

    boardElement.classList.toggle("flipped", playerRole === "b");
};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: "q",
    };
    socket.emit("move", move);
};

const getPieceUnicode = (piece) => {
    const symbols = {
        p: "♙", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
        P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔"
    };
    const key = piece.color === "w" ? piece.type.toUpperCase() : piece.type.toLowerCase();
    return symbols[key];
};

socket.on("playerRole", (role) => {
    playerRole = role;
    renderBoard();
});

socket.on("spectatorRole", () => {
    playerRole = null;
    renderBoard();
});

socket.on("boardState", (fen) => {
    chess.load(fen);
    renderBoard();
});

socket.on("move", (move) => {
    chess.move(move);
    renderBoard();
});

renderBoard();
