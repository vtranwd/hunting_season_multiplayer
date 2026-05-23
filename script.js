// board
var blockSize = 25;
var rows = 25;
var cols = 25;
var board;
var context;


// player head
var player1X = blockSize * 5;
var player1Y = blockSize * 5;
// player movement
var velocityX = 0;
var velocityY = 0;

var player1Trail = []; // trail behind character

// signage
var signageX;
var signageY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // used for drawing on the board

    placeSignage();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); // 100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="orange";
    context.fillRect(signageX, signageY, blockSize, blockSize);

    if (player1X == signageX && player1Y == signageY) {
        player1Trail.push([signageX, signageY])
        placeSignage();
    }

    for (let i = player1Trail.length-1; i > 0; i--) {
        player1Trail[i] = player1Trail[i-1];
    }
    if (player1Trail.length) {
        player1Trail[0] = [player1X, player1Y];
    }

    context.fillStyle="silver";
    player1X += velocityX * blockSize;
    player1Y += velocityY * blockSize;
    context.fillRect(player1X, player1Y, blockSize, blockSize);
    for (let i = 0; i < player1Trail.length; i++) {
        context.fillRect(player1Trail[i][0], player1Trail[i][1], blockSize, blockSize);
    }

    // game over conditions
    if (player1X < 0 || player1X > cols * blockSize || player1Y < 0 || player1Y > rows *blockSize) {
        gameOver = true;
        alert("Game Over");
    }

}

function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeSignage() {
    signageX = Math.floor(Math.random() * cols) * blockSize;
    signageY = Math.floor(Math.random() * rows) * blockSize;
}

// start game and restart game


// objects only exist within gamemap

// player 1
// player 1 is "Wabb". 
// player starts with TRAIL, TRAIL.length = 5
// If player touches BOARD, TRAIL.length -1

// player 2
// player 2 is "Duck". 
// player starts with TRAIL, TRAIL.length = 5
// If player touches BOARD, TRAIL.length -1

// player 3
// player 3 is "FUDD"
// player 3 starts the game with a 5 second delay, represented as a countdown
// player 3 VISION.RADIUS = 3
// if player 3 touches "board", visibility radius increases +1
// player 3 moves through gamearea to find "Wabb" or "Duck".

// interactive board
// if any player touches BOARD, BOARD location randomly appears in location within gamearea
// if player 1 touches BOARD, BOARD disappears, "DUCK SEASON" text appears for 1 second, fades out.
// if player 2 touches BOARD, BOARD disappears, "RABBIT SEASON" text appears for 1 second, fades out.
// if player 3 touches BOARD, BOARD disappears, BOARD location randomly appears in location within gamearea

// win condition and end game