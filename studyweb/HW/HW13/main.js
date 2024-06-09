const canvas = document.getElementById('triangleCanvas');
const ctx = canvas.getContext('2d');
let angle = 0;
let triangleColor = 'blue';

function drawTriangle() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 100;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, -size / 2);
    ctx.lineTo(size / 2, size / 2);
    ctx.lineTo(-size / 2, size / 2);
    ctx.closePath();
    ctx.fillStyle = triangleColor;
    ctx.fill();
    ctx.restore();
    
    angle += 1;
    requestAnimationFrame(drawTriangle);
}

function pointInTriangle(px, py, ax, ay, bx, by, cx, cy) {
    const v0x = cx - ax;
    const v0y = cy - ay;
    const v1x = bx - ax;
    const v1y = by - ay;
    const v2x = px - ax;
    const v2y = py - ay;

    const dot00 = v0x * v0x + v0y * v0y;
    const dot01 = v0x * v1x + v0y * v1y;
    const dot02 = v0x * v2x + v0y * v2y;
    const dot11 = v1x * v1x + v1y * v1y;
    const dot12 = v1x * v2x + v1y * v2y;

    const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    return (u >= 0) && (v >= 0) && (u + v < 1);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 100;

    // 클릭한 좌표를 삼각형의 로컬 좌표로 변환
    const cos = Math.cos(angle * Math.PI / 180);
    const sin = Math.sin(angle * Math.PI / 180);
    const localX = cos * (x - centerX) + sin * (y - centerY);
    const localY = -sin * (x - centerX) + cos * (y - centerY);

    const points = [
        { x: 0, y: -size / 2 },
        { x: size / 2, y: size / 2 },
        { x: -size / 2, y: size / 2 }
    ];

    const inside = pointInTriangle(localX, localY,
        points[0].x, points[0].y,
        points[1].x, points[1].y,
        points[2].x, points[2].y);

    if (inside) {
        triangleColor = triangleColor === 'blue' ? 'red' : 'blue';
    }
});

drawTriangle();