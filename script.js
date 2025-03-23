document.addEventListener("DOMContentLoaded", () => {
    var config = {
        pieceTheme:
            "https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png",
        position: "start",
        orientation: "white",
    };
    var chess = Chessboard("chessboard", config);

    const startBtn = document.getElementById("start-btn");
    const resetBtn = document.getElementById("reset-btn");
    const leftPane = document.querySelector(".left-pane");
    const hidePieces = document.getElementById("hide-pieces");
    const rotateBoard = document.getElementById("rotate-board");

    let piecesHidden = false;
    let boardRotated = false;
    let isTrainingOn = false;

    let currSquare;
    let time = 0;
    let score = 0;

    const alpha = ["a", "b", "c", "d", "e", "f", "g", "h"];

    function generateCoordinates() {
        const randomAlpha = Math.floor(Math.random() * 8); // Generates random number between 0 to 7
        const randomNum = Math.floor(Math.random() * 8) + 1; // Generates random number between 1 to 8
        const coordinate = `${alpha[randomAlpha]}${randomNum}`;
        return coordinate;
    }

    function rebindSquareClicks() {
        document.querySelectorAll(".square-55d63").forEach((square) => {
            square.addEventListener("click", (e) => {
                if (isTrainingOn) {
                    const squareId = e.target.getAttribute("data-square");
                    const randomSquare =
                        document.querySelector(".overlay span").innerText;

                    if (squareId === randomSquare) {
                        document.querySelector(".overlay span").innerText =
                            generateCoordinates();
                    }
                }
            });
        });
    }

    rebindSquareClicks();

    function createOverlay() {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const span = document.createElement("span");
        span.innerText = generateCoordinates();

        overlay.appendChild(span);
        document.querySelector(".board-container").appendChild(overlay);
    }

    function createScoreXTimer() {
        const scoreXTimerContainer = document.createElement("div");
        scoreXTimerContainer.classList.add("score-x-timer-container");

        scoreXTimerContainer.appendChild(
            createScoreAndTimerContainer(
                "score-container",
                "Score",
                "score",
                "0"
            )
        );

        scoreXTimerContainer.appendChild(
            createScoreAndTimerContainer(
                "timer-container",
                "Time",
                "timer",
                "00:00"
            )
        );

        return scoreXTimerContainer;
    }

    function createScoreAndTimerContainer(className, text, id, idText) {
        const container = document.createElement("div");
        container.classList.add(className);

        const span = document.createElement("span");
        span.innerText = text;

        const scoreAndTime = document.createElement("span");
        scoreAndTime.id = id;
        scoreAndTime.innerText = idText;

        container.appendChild(span);
        container.appendChild(scoreAndTime);

        return container;
    }

    // This toggles the visibility of the chess pieces
    hidePieces.addEventListener("click", () => {
        if (piecesHidden) {
            document.querySelectorAll("#chessboard img").forEach((piece) => {
                piece.style.visibility = "";
            });
        } else {
            document.querySelectorAll("#chessboard img").forEach((piece) => {
                piece.style.visibility = "hidden";
            });
        }

        piecesHidden = !piecesHidden;
    });

    // This rotates the chessboard
    rotateBoard.addEventListener("click", () => {
        if (boardRotated) {
            chess.orientation("white");
        } else {
            chess.orientation("black");
        }

        boardRotated = !boardRotated;
        rebindSquareClicks();
    });

    startBtn.addEventListener("click", () => {
        if (!document.querySelector(".score-x-timer-container")) {
            leftPane.appendChild(createScoreXTimer());
        }

        isTrainingOn = !isTrainingOn;
        if (isTrainingOn) {
            startBtn.innerText = "Stop Training";
            createOverlay();
        } else {
            startBtn.innerText = "Start Training";
            document.querySelector(".overlay").remove();
        }
    });

    resetBtn.addEventListener("click", () => {
        if (document.querySelector(".score-x-timer-container")) {
            document.querySelector(".score-x-timer-container").remove();
        }

        isTrainingOn = false;
        startBtn.innerText = "Start Training";
    });
});

// const settings = document.querySelector(".settings");

// Create Time Control
// function createTimeContol() {
//     const timeControl = document.createElement("div");
//     timeControl.classList.add("time");

//     timeControl.append(createInfiniteDiv());
//     timeControl.append(createSecondsDiv());
//     settings.append(timeControl);

//     // Function to create infinite time limit
//     function createInfiniteDiv() {
//         const infinite = document.createElement("div");
//         infinite.classList.add("infinite");

//         const span = document.createElement("span");
//         span.innerText = "00";

//         infinite.append(span);

//         return infinite;
//     }

//     // Function to create 30 seconds time limit
//     function createSecondsDiv() {
//         const seconds = document.createElement("div");
//         seconds.classList.add("second");

//         const span = document.createElement("span");
//         span.innerText = "0:30";

//         seconds.append(span);

//         return seconds;
//     }
// }

// // Create Piece Control
// function createPieceControl() {
//     const pieceControl = document.createElement("div");
//     pieceControl.classList.add("piece");

//     pieceControl.append(createWhiteKing());
//     pieceControl.append(createBlackKing());
//     settings.append(pieceControl);

//     // Create White King
//     function createWhiteKing() {
//         const whiteKing = document.createElement("div");
//         whiteKing.classList.add("white-king");

//         const i = document.createElement("i");
//         i.classList.add("fa-solid");
//         i.classList.add("fa-chess-king");

//         whiteKing.append(i);

//         return whiteKing;
//     }

//     // Create Black King
//     function createBlackKing() {
//         const blackKing = document.createElement("div");
//         blackKing.classList.add("black-king");

//         const i = document.createElement("i");
//         i.classList.add("fa-solid");
//         i.classList.add("fa-chess-king");

//         blackKing.append(i);

//         return blackKing;
//     }
// }

// // Create Progress Card
// function createProgressCard() {
//     const progressCard = document.createElement("div");
//     progressCard.classList.add("progress-card");

//     progressCard.append(scoreCard());
//     progressCard.append(timerCard());
//     settings.append(progressCard);

//     // Function to create the score card
//     function scoreCard() {
//         const scoreContainer = document.createElement("div");
//         scoreContainer.classList.add("score-container");

//         const scoreText = document.createElement("span");
//         scoreText.classList.add("score-text");
//         scoreText.innerText = "Score";

//         const scoreValue = document.createElement("span");
//         scoreValue.classList.add("score-value");
//         scoreValue.innerText = "0";

//         scoreContainer.append(scoreText);
//         scoreContainer.append(scoreValue);

//         return scoreContainer;
//     }

//     // Function to create the timer card
//     function timerCard() {
//         const timerContainer = document.createElement("div");
//         timerContainer.classList.add("timer-container");

//         const timerText = document.createElement("span");
//         timerText.classList.add("timer-text");
//         timerText.innerText = "Timer";

//         const timerValue = document.createElement("span");
//         timerValue.classList.add("timer-value");
//         timerValue.innerText = "00:00";

//         timerContainer.append(timerText);
//         timerContainer.append(timerValue);

//         return timerContainer;
//     }
// }

// createTimeContol();
// createPieceControl();

// // Function to remove time control
// function removeTimeControl() {
//     const time = document.querySelector(".time");
//     time.remove();
// }

// // Function to remove piece control
// function removePieceControl() {
//     const piece = document.querySelector(".piece");
//     piece.remove();
// }

// // Function to remove progress card
// function removeProgressCard() {
//     const progressCard = document.querySelector(".progress-card");
//     progressCard.remove();
// }

// // Function to the update the timer
// let myInterval;
// function updateTimer() {
//     let seconds = 0;
//     let minutes = 0;
//     const timerValue = document.querySelector(".timer-value");
//     function formatTime(value) {
//         return value < 10 ? `0${value}` : value;
//     }

//     myInterval = setInterval(() => {
//         seconds++;
//         if (seconds === 60) {
//             seconds = 0;
//             minutes++;
//         }

//         const formattedSeconds = formatTime(seconds);
//         const formattedMinutes = formatTime(minutes);

//         timerValue.innerText = `${formattedMinutes}:${formattedSeconds}`;
//     }, 1000);
// }

// const timer = document.querySelector(".timer");
// const button = document.querySelector("button");
// const board = document.querySelector(".board-container");
// const black = document.querySelectorAll(".black");
// const white = document.querySelectorAll(".white");
// const overlay = document.querySelector(".overlay");
// const squares = document.querySelectorAll(".squares");
// const boardThemes = document.querySelectorAll(".board");
// const startBtn = document.querySelector(".start-btn");
// const resetBtn = document.querySelector(".reset-btn");
// const infinite = document.querySelector(".infinite");
// const second = document.querySelector(".second");
// const whiteKing = document.querySelector(".white-king");
// const blackKing = document.querySelector(".black-king");
// const chessPieceWhite = document.querySelectorAll(".chess-piece-white");
// const chessPieceBlack = document.querySelectorAll(".chess-piece-black");

// // Variables
// let isGameOn = false;
// let score = 0;
// let prevRandNum = -1;
// let isWhiteSide = true;
// let isBlackSide = false;

// // Chess coordinates
// const coordinates = [
//     "a1",
//     "b1",
//     "c1",
//     "d1",
//     "e1",
//     "f1",
//     "g1",
//     "h1",
//     "a2",
//     "b2",
//     "c2",
//     "d2",
//     "e2",
//     "f2",
//     "g2",
//     "h2",
//     "a3",
//     "b3",
//     "c3",
//     "d3",
//     "e3",
//     "f3",
//     "g3",
//     "h3",
//     "a4",
//     "b4",
//     "c4",
//     "d4",
//     "e4",
//     "f4",
//     "g4",
//     "h4",
//     "a5",
//     "b5",
//     "c5",
//     "d5",
//     "e5",
//     "f5",
//     "g5",
//     "h5",
//     "a6",
//     "b6",
//     "c6",
//     "d6",
//     "e6",
//     "f6",
//     "g6",
//     "h6",
//     "a7",
//     "b7",
//     "c7",
//     "d7",
//     "e7",
//     "f7",
//     "g7",
//     "h7",
//     "a8",
//     "b8",
//     "c8",
//     "d8",
//     "e8",
//     "f8",
//     "g8",
//     "h8",
// ];

// // Function to generate a random coordinate
// function getRandomCoordinate() {
//     const randomNum = Math.floor(Math.random() * 64);
//     if (prevRandNum !== randomNum) {
//         prevRandNum = randomNum;
//         return coordinates[randomNum];
//     } else {
//         getRandomCoordinate();
//     }
// }

// // Function to rotate the board by 180 degrees
// function rotateBoard() {
//     board.style.transform = "rotate(180deg)";
// }

// // Function to rotate the board back to 0 degrees
// function unRotateBoard() {
//     board.style.transform = "rotate(0deg)";
// }

// // Function to rotate chess pieces by 180 degrees
// function rotateChessPieces() {
//     chessPieceWhite.forEach((piece) => {
//         piece.style.transform = "rotate(180deg)";
//     });

//     chessPieceBlack.forEach((piece) => {
//         piece.style.transform = "rotate(180deg)";
//     });
// }

// // Function to rotate chess pieces by 0 degrees
// function unRotateChessPieces() {
//     chessPieceWhite.forEach((piece) => {
//         piece.style.transform = "rotate(0deg)";
//     });

//     chessPieceBlack.forEach((piece) => {
//         piece.style.transform = "rotate(0deg)";
//     });
// }

// // Function to rotate the overlay by 180 degrees
// function rotateOverlay() {
//     overlay.style.transform = "rotate(180deg)";
// }

// // Function to rotate the overlay by 0 degrees
// function unRotateOverlay() {
//     overlay.style.transform = "rotate(0deg)";
// }

// // Function to choose the theme of the board
// function chooseBoardTheme(theme) {
//     boardThemes.forEach((div) => {
//         div.style.boxShadow = "none";
//         div.style.transition = "all 0.2s linear";
//     });
//     theme.style.boxShadow = "0 0 2px 0.5rem rgba(0, 119, 182, 0.5)";
//     theme.style.transition = "all 0.2s linear";
// }

// // Function to change the theme of the board
// function changeBoardTheme(id) {
//     if (id === "brown") {
//         white.forEach((div) => {
//             div.style.backgroundColor = "#EDD6B0";
//         });

//         black.forEach((div) => {
//             div.style.backgroundColor = "#B88762";
//         });
//     } else if (id === "blue") {
//         white.forEach((div) => {
//             div.style.backgroundColor = "#EAE9D2";
//         });

//         black.forEach((div) => {
//             div.style.backgroundColor = "#4B7399";
//         });
//     } else if (id === "purple") {
//         white.forEach((div) => {
//             div.style.backgroundColor = "#F0F1F0";
//         });

//         black.forEach((div) => {
//             div.style.backgroundColor = "#8476BA";
//         });
//     } else if (id === "tournament") {
//         white.forEach((div) => {
//             div.style.backgroundColor = "#EEEEEB";
//         });

//         black.forEach((div) => {
//             div.style.backgroundColor = "#33694C";
//         });
//     }
// }

// // Function to switch between the two kings
// function switchKings(white, black) {
//     white.style.backgroundColor = "#d64f00";
//     white.style.transition = "all 0.2s linear";
//     black.style.backgroundColor = "inherit";
// }

// // Function to switch between infinite and 30 seconds
// function switchTimeControl(unlimitedTime, limitedTime) {
//     unlimitedTime.style.backgroundColor = "#d64f00";
//     unlimitedTime.style.transition = "all 0.2s linear";
//     limitedTime.style.backgroundColor = "inherit";
// }

// // This function triggers when the chosen coordinate is wrong
// // This function changes the overlay color for 0.2 seconds
// function overlayColorChange() {
//     overlay.style.color = "rgba(255, 0, 0, 0.7)";
//     setTimeout(() => {
//         overlay.style.color = "rgba(255, 255, 255, 0.7)";
//     }, 200);
//     overlay.style.transition = "all 0.1s linear";
// }

// // Function to set the settings to default when reset button is clicked
// function defaultSettings() {
//     // Dafault time control
//     switchTimeControl(infinite, second);

//     // Default piece control settings
//     switchKings(whiteKing, blackKing);

//     // Default game behaviour
//     isGameOn = false;
//     overlay.innerText = "";
//     startBtn.innerText = "Start Training";

//     unRotateBoard();
//     unRotateChessPieces();
//     unRotateOverlay();
//     isWhiteSide = true;
//     isBlackSide = false;
// }

// // EVENT LISTENERS

// // This changes the theme of the board
// for (let theme of boardThemes) {
//     theme.addEventListener("click", (evt) => {
//         const id = evt.target.id;
//         chooseBoardTheme(theme);
//         changeBoardTheme(id);
//     });
// }

// function handleClicks() {
//     const infinite = document.querySelector(".infinite");
//     const second = document.querySelector(".second");
//     const whiteKing = document.querySelector(".white-king");
//     const blackKing = document.querySelector(".black-king");

//     infinite.addEventListener("click", () => {
//         switchTimeControl(infinite, second);
//     });

//     second.addEventListener("click", () => {
//         switchTimeControl(second, infinite);
//     });

//     whiteKing.addEventListener("click", () => {
//         switchKings(whiteKing, blackKing);

//         if (!isWhiteSide) {
//             unRotateBoard();
//             unRotateChessPieces();
//             unRotateOverlay();
//             isWhiteSide = true;
//             isBlackSide = false;
//         }
//     });

//     blackKing.addEventListener("click", () => {
//         switchKings(blackKing, whiteKing);

//         if (!isBlackSide) {
//             rotateBoard();
//             rotateChessPieces();
//             rotateOverlay();
//             isBlackSide = true;
//             isWhiteSide = false;
//         }
//     });
// }

// handleClicks();

// // It listens when the Start Training button is clicked
// startBtn.addEventListener("click", () => {
//     if (isGameOn) {
//         isGameOn = false;
//         overlay.innerText = "";
//         startBtn.innerText = "Start Training";
//         clearInterval(myInterval);
//     } else {
//         isGameOn = true;
//         try {
//             removeTimeControl();
//             removePieceControl();
//         } catch (error) {}

//         if (!document.querySelector(".progress-card")) {
//             createProgressCard();
//         }
//         updateTimer();
//         score = 0;
//         try {
//             document.querySelector(".score-value").innerText = "0";
//         } catch (error) {}
//         overlay.innerText = getRandomCoordinate();
//         startBtn.innerText = "Stop Training";
//     }
// });

// // It listens when the reset button is clicked
// resetBtn.addEventListener("click", () => {
//     try {
//         removeProgressCard();
//     } catch (error) {}

//     if (!document.querySelector(".time")) {
//         createTimeContol();
//         createPieceControl();
//         handleClicks();
//     }

//     defaultSettings();
// });

// // It listens when the squares are clicked
// for (let square of squares) {
//     square.addEventListener("click", (evt) => {
//         if (isGameOn) {
//             const id = evt.target.id;
//             if (id === overlay.innerText) {
//                 score++;
//                 document.querySelector(".score-value").innerText = score;
//                 overlay.innerText = getRandomCoordinate();
//             } else {
//                 overlayColorChange();
//             }
//         }
//     });
// }
