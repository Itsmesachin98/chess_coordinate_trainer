const point = document.querySelector(".score");
const button = document.querySelector("button");
const board = document.querySelector(".board-container");
const black = document.querySelectorAll(".black");
const white = document.querySelectorAll(".white");
const overlay = document.querySelector(".overlay");
const squares = document.querySelectorAll(".squares");
const boardThemes = document.querySelectorAll(".board");
const startBtn = document.querySelector(".start-btn");
const infinite = document.querySelector(".infinite");
const second = document.querySelector(".second");
const whiteKing = document.querySelector(".white-king");
const blackKing = document.querySelector(".black-king");

// Variables
let isGameOn = false;
let score = 0;

// Chess coordinates
const coordinates = [
    "a1",
    "b1",
    "c1",
    "d1",
    "e1",
    "f1",
    "g1",
    "h1",
    "a2",
    "b2",
    "c2",
    "d2",
    "e2",
    "f2",
    "g2",
    "h2",
    "a3",
    "b3",
    "c3",
    "d3",
    "e3",
    "f3",
    "g3",
    "h3",
    "a4",
    "b4",
    "c4",
    "d4",
    "e4",
    "f4",
    "g4",
    "h4",
    "a5",
    "b5",
    "c5",
    "d5",
    "e5",
    "f5",
    "g5",
    "h5",
    "a6",
    "b6",
    "c6",
    "d6",
    "e6",
    "f6",
    "g6",
    "h6",
    "a7",
    "b7",
    "c7",
    "d7",
    "e7",
    "f7",
    "g7",
    "h7",
    "a8",
    "b8",
    "c8",
    "d8",
    "e8",
    "f8",
    "g8",
    "h8",
];

// Function to generate a random coordinate
function getRandomCoordinate() {
    const randomNum = Math.floor(Math.random() * 64);
    return coordinates[randomNum];
}

// Function to choose the theme of the board
function chooseBoardTheme(theme) {
    boardThemes.forEach((div) => {
        div.style.boxShadow = "none";
    });
    theme.style.boxShadow = "0 0 2px 0.5rem rgba(0, 119, 182, 0.5)";
}

// Function to change the theme of the board
function changeBoardTheme(id) {
    if (id === "brown") {
        white.forEach((div) => {
            div.style.backgroundColor = "#EDD6B0";
        });

        black.forEach((div) => {
            div.style.backgroundColor = "#B88762";
        });
    } else if (id === "blue") {
        white.forEach((div) => {
            div.style.backgroundColor = "#EAE9D2";
        });

        black.forEach((div) => {
            div.style.backgroundColor = "#4B7399";
        });
    } else if (id === "purple") {
        white.forEach((div) => {
            div.style.backgroundColor = "#F0F1F0";
        });

        black.forEach((div) => {
            div.style.backgroundColor = "#8476BA";
        });
    } else if (id === "tournament") {
        white.forEach((div) => {
            div.style.backgroundColor = "#EEEEEB";
        });

        black.forEach((div) => {
            div.style.backgroundColor = "#33694C";
        });
    }
}

// Event Listeners
for (let theme of boardThemes) {
    theme.addEventListener("click", (evt) => {
        const id = evt.target.id;
        chooseBoardTheme(theme);
        changeBoardTheme(id);
    });
}

// Infinite & Seconds
infinite.addEventListener("click", () => {
    infinite.style.backgroundColor = "#d64f00";
    second.style.backgroundColor = "inherit";
});

second.addEventListener("click", () => {
    second.style.backgroundColor = "#d64f00";
    infinite.style.backgroundColor = "inherit";
});

// White & Black King
whiteKing.addEventListener("click", () => {
    whiteKing.style.backgroundColor = "#d64f00";
    blackKing.style.backgroundColor = "inherit";
});

blackKing.addEventListener("click", () => {
    blackKing.style.backgroundColor = "#d64f00";
    whiteKing.style.backgroundColor = "inherit";
});

// It listens when the Start Training button is clicked
startBtn.addEventListener("click", () => {
    if (isGameOn) {
        isGameOn = false;
        overlay.innerText = "";
        startBtn.innerText = "Start Training";
    } else {
        isGameOn = true;
        score = 0;
        point.innerText = 0;
        overlay.innerText = getRandomCoordinate();
        startBtn.innerText = "Stop Training";
    }
});

// It listens when the squares are clicked
for (let square of squares) {
    square.addEventListener("click", (evt) => {
        if (isGameOn) {
            id = evt.target.id;
            if (id === overlay.innerText) {
                score++;
                point.innerText = score;
                overlay.innerText = getRandomCoordinate();
            }
        }
    });
}
