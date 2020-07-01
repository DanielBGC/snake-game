let canvas, ctx;
let WIDTH, HEIGHT;
let FPS;
let tileSize;

let playing;

let player;

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
    if(player == 1) {
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

    if(player == 2) {
        if (event.key === "ArrowUp") {
            snake.direction = [0, -1];
            playing = true;
        }
        else if (event.key === "ArrowDown") {
            snake.direction = [0, 1];
            playing = true;
        }
        else if (event.key === "ArrowRight") {
            snake.direction = [1, 0];
            playing = true;
        }
        else if (event.key === "ArrowLeft") {
            snake.direction = [-1, 0];
            playing = true;
        }

        if (event.key === "w") {
            snake2.direction = [0, -1];
            playing = true;
        }
        else if (event.key === "s") {
            snake2.direction = [0, 1];
            playing = true;
        }
        else if (event.key === "d") {
            snake2.direction = [1, 0];
            playing = true;
        }
        else if (event.key === "a") {
            snake2.direction = [-1, 0];
            playing = true;
        }
    }
}

//identifica se o usuário está em um dispositivo móvel
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

function players(num) {
    player = num;
    return player;
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

//A função é chamada sempre que o usuário clicar na tela
canvas.onclick = function(event) {
    var rectNav = canvas.getBoundingClientRect();

    //salva a posição do clique do usuário
    var pos = {
        x: event.clientX - rectNav.left,
        y: event.clientY - rectNav.top
     };

    //se o clique for no botao 1
    if(pos.x > button_1.x && pos.x < (button_1.x + button_1.width) && pos.y > button_1.y && pos.y < (button_1.y + button_1.height) ) {
        players(1)
        newGame()
    }
    //se o clique for no botao 2
    else if(pos.x > button_2.x && pos.x < (button_2.x + button_2.width) && pos.y > button_2.y && pos.y < (button_2.y + button_2.height) ) {
        players(2)
        newGame()
    }
}

function newGame() {
    FPS = 15;

    snake = new Snake([[10, 10], [10, 11], [10, 12]], "#000");
    
    snake2 = new Snake([[20, 10], [20, 11], [20, 12]], "blue");

    playLabel = new PlayLabel();

    button_1 = new Button(5, 1);
    button_2 = new Button(3, 2);

    food = new Food();
    points = new Points();
    playing = false;
}

function update() {
    snake.update()

    if(player == 2)
        snake2.update()
}

function draw() {
    //limpa a tela inteira
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    snake.draw()
    
    if(player == 2)
        snake2.draw()
    
    if (playing == false) {
        playLabel.draw()

        //exibe os botões apenas se o usuário estiver em um computador
        if(!isMobileDevice()) {
            button_1.draw()
            button_2.draw()
        }
    }
    
    if (playing) {
        food.draw()
        points.draw()
    }
}

function run() {
    update();
    draw();

    setTimeout(run, 1000 / FPS)
    // requestAnimationFrame(run)
}