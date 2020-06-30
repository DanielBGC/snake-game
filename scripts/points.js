let points;

function Points() {
    this.color = "#000";
    this.pontos = 0;

    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.font = tileSize * 2 + "px Arial";

        ctx.fillText(snake.points, WIDTH - tileSize * 2, tileSize * 2)

        if(player == 2) {
            ctx.fillStyle = "blue";
            ctx.fillText(snake2.points, tileSize, tileSize * 2)
        }
    }
}