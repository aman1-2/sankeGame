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

    let dx = cellSize; //+20 
    let dy = 0;

    function updateSnake() {
        let newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(newHead); //Add new-head to the snake array.

        //Check collision with food.
        if(newHead.x === food.x && newHead.y === food.y) {
            score += 10
            //TODO : Move Food
        } else {
            snake.pop(); //Remove the tail.
        }
    }

    function changeDirection(event) {
        console.log("Key Pressed.", event);

        const isGoingDown = dy === cellSize;
        const isGoingUp = dy === -cellSize;
        const isGoingRight = dx === cellSize;
        const isGoingLeft = dx === -cellSize;

        if(event.key === "ArrowUp" && !isGoingDown) {
            dx = 0;
            dy = -cellSize;
        } else if(event.key == "ArrowDown" && !isGoingUp) {
            dx = 0;
            dy = cellSize;
        } else if(event.key == "ArrowLeft" && !isGoingRight) {
            dx = -cellSize;
            dy = 0;
        } else if(event.key == "ArrowRight" && !isGoingLeft) {
            dx = cellSize;
            dy = 0;
        } 

    }

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

    function gameLoop() {
        setInterval(() => {
            updateSnake();
            drawFoodAndSnake();
        }, 200)
    }

    function runGame() {
        if(!gameStarted) {
            gameStarted = true;
            document.addEventListener('keydown', changeDirection);
            // drawFoodAndSnake();
            gameLoop(); 
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