let food;

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
