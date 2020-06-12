let canvas = document.getElementById('snake');

// O contexto ele rendereiza o conteudo que estara dentro do canvas
let context = canvas.getContext('2d');

let box = 32;
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box,
};

let food = {
    // Limitando a faixa de numeros, multiplicando por 15 vai até 14, 0,9 * 15 max 14
    // somando 1 para que chegue ate 15, 16 ultrapassa o BG
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
};

let direction = 'right';

function createBG() {
    // Propriedade que trabalha com o estilo do canvas
    context.fillStyle = '#202030';
    context.filter = 'blur(0.8px)';
    // Propriedade para setar o tamanho x, y, largura, altura
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = '#303030';
        context.strokeStyle = '#202030';
        context.strokeRect(snake[i].x, snake[i].y, box, box);
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function createFood() {
    // console.log(Math.random() * 16 + 1);
    context.fillStyle = '#431020';
    context.fillRect(food.x, food.y, box, box);
}

// Escutando o evento do teclado
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode === 37 && direction !== 'right') direction = 'left';
    if (event.keyCode === 38 && direction !== 'down') direction = 'up';
    if (event.keyCode === 39 && direction !== 'left') direction = 'right';
    if (event.keyCode === 40 && direction !== 'up') direction = 'down';
}

// Iniciando o jogo
function initialGame() {
    // Verificando se o snake se chocou com o proprio corpo
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(jogo);
        }
    }

    // Verificando se o snake passou da tela
    if (snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Verificando o movimento do snake
    if (direction === 'right') snakeX += box;
    if (direction === 'left') snakeX -= box;

    if (direction === 'up') snakeY -= box;
    if (direction === 'down') snakeY += box;

    if (snakeX !== food.x || snakeY !== food.y) {
        // Retirando o ultimo quadrado
        snake.pop();
    } else {
        console.warn(snake);
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    // Setando os novos valores do snake
    snake.unshift(newHead);

    createBG();
    createSnake();
    createFood();

    console.log(snake[0].x + ' / y: ' + snake[0].y);
}

// Verificando o jogo a cada segundo
let jogo = setInterval(initialGame, 100);
