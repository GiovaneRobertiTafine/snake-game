let canvas = document.getElementById('snake');

// O contexto ele rendereiza o conteudo que estara dentro do canvas
let context = canvas.getContext('2d');

let box = 32;
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box,
};

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

createBG();
createSnake();
