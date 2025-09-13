document.addEventListener('DOMContentLoaded', function () {
    const gameArena = document.getElementById('game-arena');
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0; //Score of the game.
    let gameStarted = false; //Game Status
    let food = {x: 300, y: 200}; // {x : 15*20, y: 10*20} -> cell coordinate -> pixels 
    let snake = [
        {x: 160, y: 200}, {x:140 , y:200}, {x: 120, y: 200}
    ];  // [HEAD, BODY, BODY, TAIL]

    function drawDiv(x, y, label) { 
        const divElement = document.createElement('div');
        divElement.classList.add(label);
        divElement.style.top = `${y}px`;
        divElement.style.left = `${x}px`;

        return divElement; 
    }

    function drawFoodAndSnake() {
        gameArena.innerHTML = ''; //Clear the game-arena

        snake.forEach((snakeCell) => {
            const snakeElement = drawDiv(snakeCell.x, snakeCell.y, 'snake');
            gameArena.appendChild(snakeElement);
        })

        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement);
    }

    function runGame() {
        if(!gameStarted) {
            gameStarted = true;
            drawFoodAndSnake();
            // gameLoop(); TODO: Will Implement later.
        }
    }

    function initiateGame() {
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';

        document.body.insertBefore(scoreBoard, gameArena); //Insert the score-board before the game-arena.

        const startButton = document.createElement('button');
        startButton.textContent = "Start Game";
        startButton.classList.add('start-button');

        startButton.addEventListener('click', function startGame() {
            startButton.style.display = 'none'; //Hide the start Button.

            runGame(); //To start the game.
        });

        document.body.appendChild(startButton); //Append start button to the body. 
    }

    initiateGame();
});