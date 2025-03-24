document.addEventListener("DOMContentLoaded", () => {
    var config = {
        pieceTheme:
            "https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png",
        position: "start",
        orientation: "white",
    };
    var chess = Chessboard("chessboard", config);

    window.addEventListener("resize", () => {
        chess.resize();
    });

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

    // Generates a random chessboard coordinate (e.g., "e4") by picking a random file (a-h) and rank (1-8)
    function generateCoordinates() {
        const randomAlpha = Math.floor(Math.random() * 8); // Generates random number between 0 to 7
        const randomNum = Math.floor(Math.random() * 8) + 1; // Generates random number between 1 to 8
        const coordinate = `${alpha[randomAlpha]}${randomNum}`;
        return coordinate;
    }

    // Rebinds click events to each chessboard square
    // If training mode is active and the clicked square matches the target square (shown in the overlay)
    // it generates a new random target, increases the score, and updates the display
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

    // Resets the score and timer to 0
    // If the score or timer elements exist in the DOM, it updates their display accordingly
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

    // Updates the score display with the given value if the score element exists in the DOM
    function updateScore(value) {
        if (document.getElementById("score")) {
            document.getElementById("score").innerText = value;
        }
    }

    // Converts the time (in seconds) into a "minutes:seconds" format (e.g., 2:05)
    // and updates the timer display in the DOM
    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        document.getElementById("timer").innerText = `${minutes}:${
            seconds < 10 ? "0" : ""
        }${seconds}`;
    }

    // Starts a timer that increments the time variable every second
    // and updates the timer display using the formatTime function
    let myInterval;
    function updateTimer() {
        myInterval = setInterval(() => {
            time++;
            formatTime(time);
        }, 1000);
    }

    // Creates an overlay element displaying a random chessboard coordinate
    // and attaches it to the board container
    function createOverlay() {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const span = document.createElement("span");
        span.innerText = generateCoordinates();

        overlay.appendChild(span);
        document.querySelector(".board-container").appendChild(overlay);
    }

    // Creates a container holding both the score and timer displays
    // It uses createScoreAndTimerContainer to generate individual sections for score and time
    // then returns the complete container
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

    // Creates a reusable container with a label (e.g., "Score" or "Time") and a value display
    // Takes a class name, label text, element ID, and initial value as arguments
    // then returns the complete container element
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

    // Toggles the visibility of all chess pieces on the board when the "hidePieces" button is clicked
    // If pieces are hidden, it shows them again; otherwise, it hides them
    // The piecesHidden flag keeps track of the current state
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

    // Rotates the chessboard between white's and black's perspective when the "rotateBoard" button is clicked
    // Toggles the board orientation and rebinds square click events to ensure they still function correctly after rotation
    rotateBoard.addEventListener("click", () => {
        if (boardRotated) {
            chess.orientation("white");
        } else {
            chess.orientation("black");
        }

        boardRotated = !boardRotated;
        rebindSquareClicks();
    });

    // Handles the "Start Training" button functionality
    // Toggles training mode on and off
    // - On start: Creates the score and timer display (if missing), resets score and time, creates the target overlay, and starts the timer
    // - On stop: Removes the overlay, stops the timer, and resets the button text
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

    // Resets the training session
    // Removes the score/timer display and the target overlay (if they exist)
    // turns off training mode, and resets the start button text
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
