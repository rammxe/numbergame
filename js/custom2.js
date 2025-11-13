let randomNumber = 0;
let inputNum = document.getElementById("inputNumber");
let gameText = document.getElementById("game-text");
let chanceArea = document.getElementById("chance");
let chance = 5;
let gameEnd = false;
let inputNumList = [];

// 화면 전환 요소
let startScreen = document.getElementById("startScreen");
let playScreen = document.getElementById("playScreen");
let startGameBtn = document.getElementById("startGameBtn");

// 배경 이미지 요소
let startBackground = document.querySelector(".start-background");
let gameBackgroundPc = document.querySelector(".game-background-pc");
let gameBackgroundMobile = document.querySelector(".game-background-mobile");

// START 버튼 클릭 시 게임 시작
startGameBtn.addEventListener("click", function () {
  this.style.transform = "translateY(6px) scale(0.95)";

  setTimeout(() => {
    startScreen.style.animation = "fadeOut 0.5s ease forwards";

    setTimeout(() => {
      // 시작 화면 숨기기
      startScreen.style.display = "none";
      startBackground.style.display = "none";

      // 화면 크기에 따라 적절한 배경 보이기
      if (window.innerWidth >= 1200) {
        // PC
        gameBackgroundPc.style.display = "block";
        gameBackgroundMobile.style.display = "none";
      } else {
        // 태블릿/모바일
        gameBackgroundPc.style.display = "none";
        gameBackgroundMobile.style.display = "block";
      }

      playScreen.style.display = "block";

      computerNum();
      gameText.textContent = "START";
      gameText.className = "start";
    }, 500);
  }, 150);
});

// 화면 크기 변경 시 배경 이미지 전환
window.addEventListener("resize", function () {
  if (playScreen.style.display === "block") {
    if (window.innerWidth >= 1200) {
      gameBackgroundPc.style.display = "block";
      gameBackgroundMobile.style.display = "none";
    } else {
      gameBackgroundPc.style.display = "none";
      gameBackgroundMobile.style.display = "block";
    }
  }
});

// 랜덤 번호 지정
function computerNum() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log("정답:", randomNumber);
}

// 버튼 이벤트 - 모든 GO 버튼에 이벤트 등록
document.addEventListener("click", function (e) {
  // GO 버튼 클릭
  if (
    e.target.classList.contains("go-button") ||
    e.target.classList.contains("go-button-circle")
  ) {
    start();
  }
  // RESET 버튼 클릭
  if (
    e.target.classList.contains("reset-button") ||
    e.target.classList.contains("reset-button-circle")
  ) {
    reset();
  }
});

// 입력창 포커스 시 초기화
inputNum.addEventListener("focus", function () {
  inputNum.value = "";
});

// Enter 키로도 입력 가능
inputNum.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    start();
  }
});

// 하트 업데이트 함수
function updateHearts() {
  let hearts = "";
  for (let i = 0; i < chance; i++) {
    hearts += "❤️ ";
  }
  for (let i = chance; i < 5; i++) {
    hearts += "🖤 ";
  }
  chanceArea.textContent = hearts;
}

// 게임 시작
function start() {
  let inputNumValue = inputNum.value;

  if (inputNumValue === "" || inputNumValue === null) {
    gameText.textContent = "숫자입력!";
    gameText.className = "";
    return;
  }

  if (inputNumValue > 100 || inputNumValue < 1) {
    gameText.textContent = "1~100만!";
    gameText.className = "";
    return;
  }

  if (inputNumList.includes(inputNumValue)) {
    gameText.textContent = "중복!";
    gameText.className = "";
    return;
  }

  chance--;
  updateHearts();

  if (inputNumValue < randomNumber) {
    gameText.textContent = "UP UP UP";
    gameText.className = "up";
  } else if (inputNumValue > randomNumber) {
    gameText.textContent = "DOWN DOWN DOWN";
    gameText.className = "down";
  } else {
    gameText.textContent = "🎉 BINGO! 🎉";
    gameText.className = "bingo";
    gameEnd = true;
  }

  inputNumList.push(inputNumValue);

  if (chance == 0 && !gameEnd) {
    gameEnd = true;
    gameText.textContent = "GAME OVER";
    gameText.className = "gameover";
  }

  if (gameEnd == true) {
    // 모든 GO 버튼 비활성화
    document
      .querySelectorAll(".go-button, .go-button-circle")
      .forEach((btn) => {
        btn.disabled = true;
      });
  }

  inputNum.value = "";
}

// 리셋
function reset() {
  computerNum();
  gameEnd = false;
  chance = 5;

  // 모든 GO 버튼 활성화
  document.querySelectorAll(".go-button, .go-button-circle").forEach((btn) => {
    btn.disabled = false;
  });

  updateHearts();
  inputNumList = [];
  gameText.textContent = "START";
  gameText.className = "start";
  inputNum.value = "";
}

// 초기 하트 표시
updateHearts();

// fadeOut 애니메이션
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }
`;
document.head.appendChild(style);
