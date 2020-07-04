let gameOver;
let isGameOver = false;
let winner;

function GameOver() {
    this.messages = {
        gameover: "GAME OVER",
        click: "Clique na tela para recomeçar",
        
        player1: "O jogador 1 ganhou!",
        player2: "O jogador 2 ganhou!"
    }
    
    this.draw = function() {
        ctx.fillStyle = "#5d8357";
        ctx.font = tileSize * 2 + "px Arial";
    
        if(player == 2) {
            ctx.fillText(this.messages[winner], WIDTH / 2 - ctx.measureText(this.messages[winner]).width / 2, HEIGHT / 2)   
            ctx.fillText(this.messages["click"], WIDTH / 2 - ctx.measureText(this.messages["click"]).width / 2, HEIGHT / 5 * 3)   
        }
        else {
            ctx.fillText(this.messages["gameover"], WIDTH / 2 - ctx.measureText(this.messages["gameover"]).width / 2, HEIGHT / 2)   
            ctx.fillText(this.messages["click"], WIDTH / 2 - ctx.measureText(this.messages["click"]).width / 2, HEIGHT / 5 * 3)   
        }

    }

}