let playLabel;

function PlayLabel() {
    this.text;
    this.color = "#5d8357";

    this.messages = {
        mobile: "Arraste o dedo na tela para jogar",
        pc: "Pressione as setas ou WASD para jogar",

        player1: "Player 1: Mova nas setas",
        player2: "Player 2: Mova no WASD",

        choice: "Escolha uma das opções abaixo:"
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
        
        if(player == 2) {
            ctx.fillText(this.messages["choice"], WIDTH / 2 - ctx.measureText(this.messages["choice"]).width / 2, HEIGHT / 6)
            ctx.fillStyle = "#000"
            ctx.fillText(this.messages["player1"], WIDTH / 2 - ctx.measureText(this.messages["player1"]).width / 2, HEIGHT / 2)   
            ctx.fillStyle = "blue"
            ctx.fillText(this.messages["player2"], WIDTH / 2 - ctx.measureText(this.messages["player2"]).width / 2, HEIGHT / 5 * 3)   
        }
        else {
            ctx.fillText(this.text, WIDTH / 2 - ctx.measureText(this.text).width / 2, HEIGHT / 2)
            if(!isMobileDevice())
                ctx.fillText(this.messages["choice"], WIDTH / 2 - ctx.measureText(this.messages["choice"]).width / 2, HEIGHT / 6)
        }
    }
}