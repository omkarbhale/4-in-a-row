const board = [];
var playerTurn = "p2";
var isAvailable = [];
var gameState = [];



function drawGrid() {
    const boardElement = document.getElementById("main");
    for (x = 0; x < 6; x++) {
        var row = [];
        var temp1 = [];
        var temp2 = [];
        for (y = 0; y < 7; y++) {
            var cell = {};
            cell.element = document.createElement("div");
            boardElement.appendChild(cell.element);

            row.push(cell);
            temp1.push(false);
            temp2.push("blank");
            cell.element.className = "Normal";
        }
        isAvailable.push(temp1);
        gameState.push(temp2);
        board.push(row);
    }
    setTimeout(startGame, 1000);
    for (i = 0; i < 7; i++) {
        isAvailable[5][i] = true;
    }
}

function startGame() {

}

function clicked(y) {
    if (detectWin() == "no") {
        for (x = 5; x >= 0; x--) {
            if (isAvailable[x][y]) {
                move(x, y);
                isAvailable[x][y] = false;
                if (x != 0) {
                    isAvailable[x - 1][y] = true;
                }
                break;
            }
        }
    }
}


function move(x, y) {
    if (playerTurn == "p2") {
        board[x][y].element.className = "p2";
        gameState[x][y] = "p2";
        playerTurn = "p1";
        console.log("player 2 chance over", "player 1 chance now");
        bestMove();
    }
    detectWin();
}


function glow(ele) {
    console.log("glow called")
    ele.className = "inputglow";
}

function revGlow(ele) {
    ele.className = "input";
}


//human is player2
//computer is player1

function detectWin() {
    var horiwin = checkHorizontal();
    var vertwin = checkVerticle();
    var diawin = checkDiagonal();
    if (horiwin == "p1" || vertwin == "p1" || diawin == "p1") {
        return "p1";
    }
    if (horiwin == "p2" || vertwin == "p2" || diawin == "p2") {
        return "p2";
    }
    return "no";
}


function checkHorizontal() {
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 4; j++) {
            if (gameState[i][j] == "p1" || gameState[i][j] == "p2") {
                if (gameState[i][j] == gameState[i][j + 1] && gameState[i][j] == gameState[i][j + 2] && gameState[i][j] == gameState[i][j + 3]) {
                    switch (playerTurn) {
                        case "p1":
                            alert("Player 1 Wins!!");
                            return "p1";
                            break;
                        case "p2":
                            alert("Player 2 wins!!");
                            return "p2";
                            break;
                    }
                }
            }
        }
    }
}

function checkVerticle() {
    for (m = 0; m < 7; m++) {
        for (l = 0; l < 3; l++) {
            if (gameState[l][m] == "p1" || gameState[l][m] == "p2") {
                if (gameState[l][m] == gameState[l + 1][m] && gameState[l][m] == gameState[l + 2][m] && gameState[l][m] == gameState[l + 3][m]) {
                    switch (playerTurn) {
                        case "p1":
                            alert("Player 1 Wins!!");
                            return "p1";
                            break;
                        case "p2":
                            alert("Player 2 wins!!");
                            return "p2";
                            break;
                    }
                }
            }
        }
    }
}

function checkDiagonal() {
    for (x = 0; x < 3; x++) {
        for (y = 0; y < 4; y++) {
            if (gameState[x][y] == "p1" || gameState[x][y] == "p2") {
                if (gameState[x][y] == gameState[x + 1][y + 1] && gameState[x][y] == gameState[x + 2][y + 2] && gameState[x][y] == gameState[x + 3][y + 3]) {
                    switch (playerTurn) {
                        case "p1":
                            alert("Player 1 Wins!!");
                            return "p1";
                            break;
                        case "p2":
                            alert("Player 2 wins!!");
                            return "p2";
                            break;
                    }
                }
            }
        }
        for (y = 3; y < 7; y++) {
            if (gameState[x][y] == "p1" || gameState[x][y] == "p2") {
                if (gameState[x][y] == gameState[x + 1][y - 1] && gameState[x][y] == gameState[x + 2][y - 2] && gameState[x][y] == gameState[x + 3][y - 3]) {
                    switch (playerTurn) {
                        case "p1":
                            alert("Player 1 Wins!!");
                            return "p1";
                            break;
                        case "p2":
                            alert("Player 2 wins!!");
                            return "p2";
                            break;
                    }
                }
            }
        }
    }

}


function bestMove() {
    var bestScore = -Infinity;
    var move;
    for (y = 0; y < 7; y++) {
        for (x = 0; x < 6; x++) {
            //is the spot Available?
            if (isAvailable[x][y]) {
                console.log("Found that", x, y, "is available");
                board[x][y].element.className = "p1";
                isAvailable[x][y] = false;
                if (x != 0) {
                    isAvailable[x - 1][y] = true;
                }
                gameState[x][y] = "p1";
                console.log("drawn p1 on", x, y, " and returning isavailable", isAvailable);
                var score = minimax(1, false);
                console.log("returned score for", x, y, "in main. returned isavailable", isAvailable);
                board[x][y].element.className = "Normal";
                isAvailable[x][y] = true;
                if (x != 0) {
                    isAvailable[x - 1][y] = false;
                }
                gameState[x][y] = "blank";
                console.log("Undraw stuff on", x, y, "and return isavailable", isAvailable);
                if (score > bestScore) {
                    bestScore = score;
                    move = { x, y };
                }
            }
        }
    }
    board[move.x][move.y].element.className = "p1";
    gameState[move.x][move.y] = "p1";
    isAvailable[move.x][move.y] = false;
    if (x != 0) {
        isAvailable[move.x - 1][move.y] = true;
    }


}

function minimax(depth, isMaximising) {
    if (!(detectWin() == "no") || depth == 0) {
        return staticScore();
    } else {
        if (isMaximising) {
            var bestScore = -Infinity;
            for (y = 0; y < 7; y++) {
                for (x = 0; x < 6; x++) {
                    //is the spot Available?
                    if (isAvailable[x][y]) {
                        board[x][y].element.className = "p1";
                        isAvailable[x][y] = false;
                        if (x != 0) {
                            isAvailable[x - 1][y] = true;
                        }
                        gameState[x][y] = "p1";
                        console.log("drawn p2 on", x, y, " and returning isavailable", isAvailable);
                        let score = minimax(depth - 1, false);
                        console.log("returned score for", x, y, "returned isavailable", isAvailable);
                        board[x][y].element.className = "Normal";
                        isAvailable[x][y] = true;
                        if (x != 0) {
                            isAvailable[x - 1][y] = false;
                        }
                        gameState[x][y] = "blank";
                        console.log("Undraw stuff max", x, y, "and return isavailable", isAvailable);
                        if (score > bestScore) {
                            score = bestScore;

                        }
                    }

                }
            }
            return bestScore;
        } else {
            var bestScore = Infinity;
            for (y = 0; y < 7; y++) {
                for (x = 0; x < 6; x++) {
                    //is the spot Available?
                    if (isAvailable[x][y]) {
                        console.log("minimising, depth is", depth, "on", x, y);
                        board[x][y].element.className = "p2";
                        isAvailable[x][y] = false;
                        if (x != 0) {
                            isAvailable[x - 1][y] = true;
                        }
                        gameState[x][y] = "p2";
                        console.log("drawn p2 on", x, y, " and returning isavailable", isAvailable);
                        let score = minimax(depth - 1, true);
                        console.log("returned score for", x, y, "returned isavailable", isAvailable);
                        board[x][y].element.className = "Normal";
                        isAvailable[x][y] = true;
                        if (x != 0) {
                            isAvailable[x - 1][y] = false;
                        }
                        gameState[x][y] = "blank";
                        console.log("undraw at min", x, y, "depth", depth, "isavail", isAvailable);
                        if (score < bestScore) {
                            score = bestScore;

                        }
                    }

                }
            }
            return bestScore;
        }
    }
}

function staticScore() {
    if (detectWin == "p1") {
        return 100;
    }
    if (detectWin == "p2") {
        return -100;
    }
    //horizontal static score
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 4; j++) {
            var iff = (gameState[i][j] == gameState[i][j + 1] && gameState[i][j] == gameState[i][j + 2]) || (gameState[i][j] == gameState[i][j + 1] && gameState[i][j] == gameState[i][j + 3]) || (gameState[i][j] == gameState[i][j + 2] && gameState[i][j] == gameState[i][j + 3]);
            console.log(iff);
            if (gameState[i][j] == "p1" || gameState[i][j] == "p2") {
                if (gameState[i][j] == gameState[i][j + 1] && gameState[i][j] == gameState[i][j + 2] && gameState[i][j] == gameState[i][j + 3]) {
                    switch (playerTurn) {
                        case "p1":
                            alert("Player 1 Wins!!");
                            return "p1";
                            break;
                        case "p2":
                            alert("Player 2 wins!!");
                            return "p2";
                            break;
                    }
                }
            }
        }
    }
}
