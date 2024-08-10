document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    const cactusElements = document.querySelectorAll('.cactus');
    const scoreElement = document.createElement('div');
    scoreElement.classList.add('score');
    document.body.appendChild(scoreElement);

    let isJumping = false;
    let speed = 1;
    const speedIncrease = 0.005;
    const initialPosition = 100;
    let score = 0;
    let gameInterval;

    // 점수를 0.01초마다 1점씩 증가시키는 함수
    function increaseScore() {
        setInterval(() => {
            if (score < 300) {
                score++;
                scoreElement.textContent = `Score: ${score}`;
                if (score === 100) {
                    startFlashing(); // 점수가 100점에 도달하면 깜박이기 시작
                }
                if (score === 200) {
                    startFlashing(); // 점수가 100점에 도달하면 깜박이기 시작
                }
            }
            if (score >= 300) {
                WinGame(); // 점수가 300점에 도달하면 게임 종료
            }
        }, 100); // 0.01초는 10 밀리초
    }
    function startFlashing() {
        // 점수가 깜박이는 효과를 주기 위해 주기적으로 색상을 변경
        flashInterval = setInterval(() => {
            scoreElement.style.visibility = 
                scoreElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 50); // 0.5초마다 깜박임
    }

    function stopFlashing() {
        clearInterval(flashInterval);
        scoreElement.style.visibility = 'visible'; // 깜박임이 끝났을 때 점수를 보이게 함
    }

    // 공룡과 장애물 충돌 감지 함수
    function checkCollision() {
        const dinoRect = dino.getBoundingClientRect();
        
        cactusElements.forEach(cactus => {
            const cactusRect = cactus.getBoundingClientRect();
            if (
                dinoRect.left < cactusRect.right &&
                dinoRect.right > cactusRect.left &&
                dinoRect.top < cactusRect.bottom &&
                dinoRect.bottom > cactusRect.top
            ) {
                endGame();
            }
        });
    }

    function resetGame() {
        // 점수 초기화
        score = 0;
        scoreElement.textContent = `Score: ${score}`;

        // 장애물 초기화
        cactusElements.forEach(cactus => {
            cactus.style.left = `${initialPosition}vw`;
            cactus.classList.remove('cactus1', 'cactus2', 'cactus3');
            cactus.classList.add('cactus1'); // 기본 장애물로 설정
        });

        // 공룡 위치 초기화
        dino.classList.remove('jump');

        // 속도 초기화
        speed = 1;
    }

    function endGame() {
        clearInterval(gameInterval);
        alert(`Game Over! Your score was ${score}`);
        resetGame(); // 게임 초기화 함수 호출
        // 게임을 새로 시작하려면 페이지를 새로 고침합니다.
        document.location.reload();
    }
    function WinGame() {
        clearInterval(gameInterval);
        alert(`Game end! Your score was ${score}`);
        resetGame(); // 게임 초기화 함수 호출
        // 게임을 새로 시작하려면 페이지를 새로 고침합니다.
        document.location.reload();
    }
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !isJumping) {
            jump();
        }
    });

    function jump() {
        isJumping = true;
        dino.classList.add('jump');
        setTimeout(() => {
            dino.classList.remove('jump');
            isJumping = false;
        }, 500);
    }

    function moveCactus() {
        let cactusPosition = initialPosition;

        gameInterval = setInterval(() => {
            cactusElements.forEach(cactus => {
                cactusPosition -= speed;
                cactus.style.left = cactusPosition + 'vw';
                
                if (cactusPosition < -5) {
                    cactusPosition = initialPosition;
                    cactus.style.left = cactusPosition + 'vw';
                    // 장애물 종류를 랜덤하게 변경
                    cactus.classList.remove('cactus1', 'cactus2', 'cactus3');
                    const randomCactus = `cactus${Math.floor(Math.random() * 3) + 1}`;
                    cactus.classList.add(randomCactus);
                }

                checkCollision(); // 매 프레임마다 충돌 검사
            });

            speed += speedIncrease;
        }, 50);
    }

    // 점수 증가 및 카투스 이동 시작
    increaseScore();
    moveCactus();
});
