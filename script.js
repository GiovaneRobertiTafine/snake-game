let canvas = document.getElementById('snake');

// O contexto ele rendereiza o conteudo que estara dentro do canvas
let context = canvas.getContext('2d');

let box = 32;
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box,
};

let direction = 'right';

function createBG() {
    // Propriedade que trabalha com o estilo do canvas
    context.fillStyle = 'lightgreen';

    // Propriedade para setar o tamanho x, y, largura, altura
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = '#303030';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
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
    // Verificando se o snake passou da tela
    if (snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;

    createBG();
    createSnake();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Verificando o movimento do snake
    if (direction === 'right') snakeX += box;
    if (direction === 'left') snakeX -= box;

    if (direction === 'up') snakeY -= box;
    if (direction === 'down') snakeY += box;

    // Retirando o ultimo quadrado
    snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    // Setando os novos valores do snake
    snake.unshift(newHead);
}

// Verificando o jogo a cada segundo
let jogo = setInterval(initialGame, 100);
