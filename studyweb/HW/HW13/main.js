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

function getLineEquation(x1, y1, x2, y2) {
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    return { m, b };
}

function isPointAboveLine(px, py, line) {
    return py < line.m * px + line.b;
}

function isPointBelowLine(px, py, line) {
    return py > line.m * px + line.b;
}

function rotatePoint(x, y, angle, centerX, centerY) {
    const rad = angle * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const nx = cos * (x - centerX) - sin * (y - centerY) + centerX;
    const ny = sin * (x - centerX) + cos * (y - centerY) + centerY;
    return { x: nx, y: ny };
}

function isPointInTriangle(px, py, points) {
    const [p1, p2, p3] = points;

    const line1 = getLineEquation(p1.x, p1.y, p2.x, p2.y);
    const line2 = getLineEquation(p2.x, p2.y, p3.x, p3.y);
    const line3 = getLineEquation(p3.x, p3.y, p1.x, p1.y);

    const isBelowLine1 = isPointBelowLine(px, py, line1);
    const isAboveLine2 = isPointAboveLine(px, py, line2);
    const isBelowLine3 = isPointBelowLine(px, py, line3);

    return isBelowLine1 && isAboveLine2 && isBelowLine3;
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 100;

    // 클릭한 좌표를 원래 좌표계로 변환
    const transformedPoint = rotatePoint(x, y, -angle, centerX, centerY);

    const points = [
        { x: 0, y: -size / 2 },
        { x: size / 2, y: size / 2 },
        { x: -size / 2, y: size / 2 }
    ];

    if (isPointInTriangle(transformedPoint.x - centerX, transformedPoint.y - centerY, points)) {
        triangleColor = triangleColor === 'blue' ? 'red' : 'blue';
    }
});

drawTriangle();