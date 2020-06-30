let button_1;
let button_2;

function Button(y, number) {
    this.width = tileSize * 10;
    this.height = tileSize*2;
    this.x = WIDTH/2 - this.width/2;
    this.y = HEIGHT/y;

    this.messages = {
        1: "1 Player",
        2: "2 Players"
    }
    
    this.draw = function() {
        ctx.fillStyle = "#5d8357";
        ctx.fillRect(this.x, this.y, this.width, this.height)

        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(this.messages[number], this.x + tileSize, this.y + this.height - 5)
    }
}