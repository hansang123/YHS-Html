var canvas = document.getElementById("GameScreenCanvas");
        var ctx = canvas.getContext("2d");

        var colors = ["#C7C5FF", "black", "blue", "magenta", "pink", "cyan", "orange"];

        class HeartObject {
            constructor(colorIndex, radius, positionX, positionY, moveSpeed, rotateSpeed, moveDirection) {
                this.color = colors[colorIndex];
                this.radius = radius;
                this.positionX = positionX;
                this.positionY = positionY;
                this.moveSpeed = moveSpeed; // 이동 속도
                this.rotateSpeed = rotateSpeed; // 회전 속도
                this.moveDirection = moveDirection; // 이동 방향
                this.rotation = 0; // 초기 회전 각도
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.translate(this.positionX, this.positionY);
                this.rotation += this.rotateSpeed; // 회전 속도를 더함
                ctx.rotate(this.rotation * Math.PI / 180); // 회전 속도에 따라 회전
                for (var i = 0; i <= 360; i++) {
                    var radian = i * Math.PI / 180;
                    var x = 16 * Math.pow(Math.sin(radian), 3);
                    var y = 13 * Math.cos(radian) - 5 * Math.cos(2 * radian) - 2 * Math.cos(3 * radian) - Math.cos(4 * radian);
                    ctx.lineTo(x * (this.radius / 100), -y * (this.radius / 100)); // 크기 조절
                }

                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            }

            update() {
                // 이동 방향에 따른 위치 변경
                if (this.moveDirection === 'up') {
                    this.positionY -= this.moveSpeed;
                } else if (this.moveDirection === 'down') {
                    this.positionY += this.moveSpeed;
                } else if (this.moveDirection === 'left') {
                    this.positionX -= this.moveSpeed;
                } else if (this.moveDirection === 'right') {
                    this.positionX += this.moveSpeed;
                }
            }
        }

        function getCanvasMousePosition(event) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        var hearts = [];

        function update() {
            clearCanvas();
            for (var i = 0; i < hearts.length; i++) {
                var heart = hearts[i];
                heart.update();
                heart.draw();
            }
        }

        function render() {
            canvas.addEventListener('mousemove', function(event) {
                var mousePos = getCanvasMousePosition(event);

                
                if (hearts.length < 100) {
                    // 랜덤하게 이동속도, 회전속도, 이동방향 선택
                    var moveSpeed = Math.random() * 3 + 1; // 1에서 4까지의 랜덤한 이동속도
                    var rotateSpeed = Math.random() * 6 - 3; // -3에서 3까지의 랜덤한 회전속도
                    var directions = ['up', 'down', 'left', 'right'];
                    var moveDirection = directions[Math.floor(Math.random() * directions.length)]; // 랜덤한 이동방향 선택

                    var heart = new HeartObject(
                        Math.round(Math.random() * 6),
                        Math.random() * 200 + 100,
                        mousePos.x,
                        mousePos.y,
                        moveSpeed,
                        rotateSpeed,
                        moveDirection
                    );
                    hearts.push(heart);
                }
            });

            setInterval(update, 1000 / 60); // 60 FPS로 업데이트
        }

        render();