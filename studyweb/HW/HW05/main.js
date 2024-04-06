        var canvas = document.getElementById('GameScreenCanvas');
        var context = canvas.getContext('2d');

        // 중심 좌표
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;

        // 각 사각형의 초기 각도
        var sunAngle = 0;
        var earthAngle = 0;
        var moonAngle = Math.PI; // 달은 지구의 반대편에서 시작합니다.

        // 원점으로부터 사각형까지의 거리
        var earthDistance = 300;
        var moonDistance = 50;

        // 회전 속도
        var sunRotateSpeed = Math.PI / 100;
        var earthOrbitSpeed = -Math.PI / 200;
        var earthRotateSpeed = Math.PI / 150;
        var moonOrbitSpeed = Math.PI / 100;
        var moonRotateSpeed = Math.PI / 80;

        function draw() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            // 각 사각형의 중심 좌표 계산
            var earthCenterX = centerX + Math.cos(earthAngle) * earthDistance;
            var earthCenterY = centerY + Math.sin(earthAngle) * earthDistance;

            var moonCenterX = earthCenterX + Math.cos(moonAngle) * moonDistance;
            var moonCenterY = earthCenterY + Math.sin(moonAngle) * moonDistance;

            // 태양 사각형 그리기
            drawRectangle(centerX, centerY, sunAngle, 'red', 50);

            // 지구 사각형 그리기
            drawRectangle(earthCenterX, earthCenterY, earthAngle, 'blue', 30);

            // 달 사각형 그리기
            drawRectangle(moonCenterX, moonCenterY, moonAngle, 'grey', 10);

            // 각도 업데이트
            sunAngle += sunRotateSpeed;  // 태양의 각도를 회전 속도에 따라 증가시킵니다.
            earthAngle += earthOrbitSpeed; // 지구의 각도를 공전 속도에 따라 증가시킵니다.
            moonAngle += moonOrbitSpeed; // 달의 각도를 공전 속도에 따라 증가시킵니다.

            requestAnimationFrame(draw);   // 다음 프레임을 그리기 위해 draw 함수를 호출합니다.
        }

        // 사각형 그리기 함수
        function drawRectangle(centerX, centerY, angle, color, size) {
            context.save();
            context.fillStyle = color;
            context.lineWidth = 5;
            context.translate(centerX, centerY);
            context.rotate(angle);// 현재 캔버스의 그리기 상태를 각도에 따라 회전합니다
            context.fillRect(-size / 2, -size / 2, size, size); // 중심을 기준으로 사각형을 그립니다.
            context.restore();
        }

        draw();