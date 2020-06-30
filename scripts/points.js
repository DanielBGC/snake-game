let points;

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