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

    let score = 0;
    let time = 0;

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

                        score++;
                        updateScore(score);
                    }
                }
            });
        });
    }

    rebindSquareClicks();

    function formatScoreAndTime() {
        score = 0;
        time = 0;
        if (document.getElementById("score")) {
            document.getElementById("score").innerText = score;
        }

        if (document.getElementById("timer")) {
            document.getElementById("timer").innerText = "0:00";
        }
    }

    function updateScore(value) {
        if (document.getElementById("score")) {
            document.getElementById("score").innerText = value;
        }
    }

    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        document.getElementById("timer").innerText = `${minutes}:${
            seconds < 10 ? "0" : ""
        }${seconds}`;
    }

    let myInterval;
    function updateTimer() {
        myInterval = setInterval(() => {
            time++;
            formatTime(time);
        }, 1000);
    }

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
                "0:00"
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
            formatScoreAndTime();
            createOverlay();
            updateTimer();
        } else {
            startBtn.innerText = "Start Training";
            document.querySelector(".overlay").remove();
            clearInterval(myInterval);
        }
    });

    resetBtn.addEventListener("click", () => {
        if (document.querySelector(".score-x-timer-container")) {
            document.querySelector(".score-x-timer-container").remove();
        }

        if (document.querySelector(".overlay")) {
            document.querySelector(".overlay").remove();
        }

        isTrainingOn = false;
        startBtn.innerText = "Start Training";
    });
});
