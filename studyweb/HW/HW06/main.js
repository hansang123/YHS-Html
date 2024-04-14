var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

var colors = ["#C7C5FF", "black", "blue", "magenta", "pink", "cyan", "orange"]; 

class HeartObject {
    constructor(colorIndex, radius, positionX, positionY) {
        this.color = colors[colorIndex];
        this.radius = radius;
        this.positionX = positionX;
        this.positionY = positionY;;
    }
    
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.positionX, this.positionY);
        ctx.scale(this.radius, this.radius);

        for (var i = 0; i <= 360; i++) {
            var radian = i * Math.PI / 180;
            var x = 16 * Math.pow(Math.sin(radian), 3);
            var y = 13 * Math.cos(radian) - 5 * Math.cos(2 * radian) - 2 * Math.cos(3 * radian) - Math.cos(4 * radian);
            ctx.lineTo(x, -y);
        }

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();        
        ctx.restore();
    }
}

function render() {
    var heart = new HeartObject(Math.round(Math.random() * 6), Math.random() * 100, Math.random() * 500, Math.random() * 500);
    heart.draw();
    requestAnimationFrame(render);
}

render();
