let snake;
let snake2;

//class Snake {}
function Snake(body, color) {
    //tamanho inicial com 3 quadradinhos
    this.body = body;
    this.direction = [0, -1];

    this.points = 0;

    //desenha a cobra
    this.draw = function () {
        //cor da cobra
        ctx.fillStyle = color;

        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i][0] * tileSize, this.body[i][1] * tileSize, tileSize-1, tileSize-1)
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
            this.points++;
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
            if (this.body[i][0] == nextPos[0] && this.body[i][1] == nextPos[1]) {
                this.direction[0] = 0;
                this.direction[1] = 0;
                
                isGameOver = true;
            }
        }

        this.body.splice(0, 0, nextPos);
        this.body.pop();
    }
}