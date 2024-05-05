function startGame() {
    document.getElementById("titleScreen").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const enemies = [];

    let heartX = canvas.width / 2;
    let heartY = canvas.height / 2;
    const heartSize = 20;

    let starX = Math.random() * (canvas.width - 60) + 30;
    let starY = Math.random() * (canvas.height - 60) + 30;

    function randomColor() {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }

    function spawnEnemies() {
        const count = 5 + Math.floor(Math.random() * 11);
        for (let i = 0; i < count; i++) {
            const size = 10 + Math.random() * 20;
            const speed = 0.5 + Math.random();
            const angle = Math.random() * 2 * Math.PI;
            const x = Math.cos(angle) * (canvas.width + 20) + canvas.width / 2;
            const y = Math.sin(angle) * (canvas.height + 20) + canvas.height / 2;
            enemies.push({x, y, size, speed, color: randomColor()});
        }
    }

    function drawStar(x, y) {
        ctx.beginPath();
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x + 10, y - 10);
        ctx.lineTo(x + 40, y - 5);
        ctx.lineTo(x + 15, y + 5);
        ctx.lineTo(x + 25, y + 30);
        ctx.lineTo(x, y + 15);
        ctx.lineTo(x - 25, y + 30);
        ctx.lineTo(x - 15, y + 5);
        ctx.lineTo(x - 40, y - 5);
        ctx.lineTo(x - 10, y - 10);
        ctx.closePath();
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    function drawEnemies() {
        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];
            const angle = Math.atan2(heartY - enemy.y, heartX - enemy.x);
            enemy.x += Math.cos(angle) * enemy.speed;
            enemy.y += Math.sin(angle) * enemy.speed;

            const distance = Math.sqrt((enemy.x - heartX) ** 2 + (enemy.y - heartY) ** 2);
            if (distance <= heartSize + enemy.size) {
                enemies.splice(i, 1);
            } else {
                ctx.fillStyle = enemy.color;
                ctx.beginPath();
                ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function drawHeart() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        for (var i = 0; i <= 360; i++) {
            var radian = i * Math.PI / 180;
            var xCoord = 16 * Math.pow(Math.sin(radian), 3);
            var yCoord = 13 * Math.cos(radian) - 5 * Math.cos(2 * radian) - 2 * Math.cos(3 * radian) - Math.cos(4 * radian);
            ctx.lineTo(heartX + xCoord * 2, heartY - yCoord * 2);
        }
        ctx.closePath();
        ctx.fill();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHeart();
        drawStar(starX, starY);
        drawEnemies();
        requestAnimationFrame(draw);
    }

    spawnEnemies();
    setInterval(spawnEnemies, 1000);
    requestAnimationFrame(draw);
}