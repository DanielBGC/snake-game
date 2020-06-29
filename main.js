let canvas, ctx;
let WIDTH, HEIGHT;
let FPS;
let tileSize;

let snake;
let food;
let points;
let playing;
let playLabel;

let globalTouch = [], offset = [];
// let validMovement;

window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
})

//A função é chamada sempre que a tela for redimensionada
window.addEventListener("resize", resizeWindow)

//A função é chamada quando o usuário tocar a tela
window.addEventListener("touchstart", touchStart);

//A função é chamada quando o usuário mover o dedo sobre a tela
window.addEventListener("touchmove", touchMove);

//A função é chamada quando o usuário remove o dedo da tela
window.addEventListener("touchend", touchEnd);

//A função é chamada quando o usuário apertar alguma tecla
window.addEventListener("keydown", keyDown)

function resizeWindow() {
    //largura total da tela
    WIDTH = window.innerWidth;

    //altura total da tela
    HEIGHT = window.innerHeight;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    //fator de escala para cada quadradinho
    tileSize = Math.max(parseInt(WIDTH / 50), parseInt(HEIGHT / 50));
}

function touchStart(event) {
    //salva somente o primeiro toque que o usuário fizer
    let touch = event.touches[0];
    globalTouch = [touch.pageX, touch.pageY];
}

function touchMove(event) {
    event.preventDefault();
    let touch = event.touches[0];

    //diferença entre o valor final e o valor inicial
    offset = [touch.pageX - globalTouch[0], touch.pageY - globalTouch[1]]
}

function touchEnd(event) {
    if (Math.abs(offset[0]) > Math.abs(offset[1])) {
        //move a snake na horizontal
        snake.direction = [offset[0] / Math.abs(offset[0]), 0]
        playing = true;
    }
    else {
        //move a snake na vertical
        snake.direction = [0, offset[1] / Math.abs(offset[1])]
        playing = true;
    }
}

function keyDown(event) {
    if (event.key === "ArrowUp" || event.key === 'w') {
        snake.direction = [0, -1];
        playing = true;
    }
    else if (event.key === "ArrowDown" || event.key === 's') {
        snake.direction = [0, 1];
        playing = true;
    }
    else if (event.key === "ArrowRight" || event.key === 'd') {
        snake.direction = [1, 0];
        playing = true;
    }
    else if (event.key === "ArrowLeft" || event.key === 'a') {
        snake.direction = [-1, 0];
        playing = true;
    }
}

//identifica se o usuário está em um dispositivo móvel
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

function init() {
    canvas = document.createElement("canvas");
    resizeWindow();

    document.body.appendChild(canvas);

    ctx = canvas.getContext("2d");

    FPS = 15;

    newGame();
    run();
};
init()

function newGame() {
    FPS = 15;
    snake = new Snake();
    playLabel = new PlayLabel();

    food = new Food();
    points = new Points();
    playing = false;
}

function Points() {
    this.color = "#FFFFFF";
    this.pontos = 0;

    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.font = tileSize * 2 + "px Arial";
        ctx.fillText(this.pontos, tileSize, tileSize * 2)
    }

    this.update = function () {
        this.pontos++;
    }

}

function PlayLabel() {
    this.text;
    this.color = "#5d8357";

    this.messages = {
        mobile: "Arraste o dedo na tela para jogar",
        pc: "Pressione as setas ou WASD para jogar"
    };

    if (isMobileDevice()) {
        this.text = this.messages["mobile"];
    }
    else {
        this.text = this.messages["pc"];
    }

    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.font = tileSize * 2 + "px Arial";
        ctx.fillText(this.text, WIDTH / 2 - ctx.measureText(this.text).width / 2, HEIGHT / 2)
    }
}

//class Snake {}
function Snake() {
    //tamanho inicial com 3 quadradinhos
    this.body = [[10, 10], [10, 11], [10, 12]];
    this.direction = [0, -1];

    //desenha a cobra
    this.draw = function () {
        //cor da cobra
        ctx.fillStyle = "#000";

        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i][0] * tileSize, this.body[i][1] * tileSize, tileSize, tileSize)
        }
    }

    this.update = function () {
        let nextPos = [this.body[0][0] + this.direction[0] , this.body[0][1] + this.direction[1] ];

        //se o usuário não estiver jogando
        if (playing == false) {
            //quando estiver indo para cima
            if (this.direction[1] < 0 && nextPos[1] <= (HEIGHT * 0.1 / tileSize)) {
                this.direction = [1, 0]
            }

            //quando estiver indo para a direita
            else if (this.direction[0] > 0 && nextPos[0] >= (WIDTH * 0.9 / tileSize)) {
                this.direction = [0, 1]
            }

            //quando estiver indo para baixo
            else if (this.direction[1] > 0 && nextPos[1] >= (HEIGHT * 0.9 / tileSize)) {
                this.direction = [-1, 0]
            }

            //quando estiver indo para a esquerda
            else if (this.direction[0] < 0 && nextPos[0] <= (WIDTH * 0.1 / tileSize)) {
                this.direction = [0, -1];
            }
        }

        if (nextPos[0] == this.body[1][0] && nextPos[1] == this.body[1][1]) {
            // this.body.reverse();
            // nextPos = [this.body[0][0] + this.direction[0], this.body[0][1] + this.direction[1]];

            //impede a snake de trocar o seu sentido instantaneamente
            nextPos[0] = this.body[0][0] + this.direction[0] * -1;
            nextPos[1] = this.body[0][1] + this.direction[1] * -1;
        }

        //quando o usuário coletar a comida
        if (nextPos[1] == food.y / tileSize && nextPos[0] == food.x / tileSize) {
            food.update()
            points.update()
            FPS += 0.5;

            //adiciona à ultima posição do array this.body
            // this.body.push([x,y])
            this.body.push([this.body[this.body.length - 1][0] + 1, this.body[this.body.length - 1][1] + 1])
        }

        //reinicia o jogo se a snake sair da tela
        // if( nextPos[0] >= Math.ceil(WIDTH/tileSize) || nextPos[0] < 0 || nextPos[1] >= Math.ceil(HEIGHT/tileSize) || nextPos[1] < 0)
        //     newGame()

        if (nextPos[0] >= Math.ceil(WIDTH / tileSize))
            nextPos[0] = 0;
        else if (nextPos[0] < 0)
            nextPos[0] = Math.ceil(WIDTH / tileSize);

        if (nextPos[1] >= Math.ceil(HEIGHT / tileSize))
            nextPos[1] = 0;
        else if (nextPos[1] < 0)
            nextPos[1] = Math.ceil(HEIGHT / tileSize);

        for (let i = 3; i < this.body.length; i++) {
            //verifica se o começo da cobra irá colidir com o resto do corpo (a partir do 4º bloco)
            if (this.body[i][0] == nextPos[0] && this.body[i][1] == nextPos[1])
                newGame()
        }

        this.body.splice(0, 0, nextPos);
        this.body.pop();
    }
}

function Food() {
    this.color = "#FF0000"
    this.x = tileSize * parseInt(Math.random() * parseInt(WIDTH / tileSize));
    this.y = tileSize * parseInt(Math.random() * parseInt(HEIGHT / tileSize));

    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, tileSize, tileSize)
    }

    this.update = function () {
        this.x = tileSize * parseInt(Math.random() * parseInt(WIDTH / tileSize));
        this.y = tileSize * parseInt(Math.random() * parseInt(HEIGHT / tileSize));
    }
}

function update() {
    snake.update()
}

function draw() {
    //limpa a tela inteira
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    snake.draw()

    points.draw()

    if (playing == false)
        playLabel.draw()

    if (playing)
        food.draw()
}

function run() {
    update();
    draw();

    setTimeout(run, 1000 / FPS)
    // requestAnimationFrame(run)
}