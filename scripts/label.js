let playLabel;

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