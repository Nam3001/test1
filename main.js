const cells = Array.from(document.querySelectorAll(".cell"));
const playerCells = cells.slice(30);
const enemyCells = cells.slice(0, 30);
let scoreDisplay = document.querySelector(".score");
let dropCount, speed, score;
let test = document.querySelector('.player');

reset();
document.addEventListener("keydown", (e) => {
  if (!dropCount) {
    start();
  }
  const enemy = document.querySelector(".enemy");
  const player = document.querySelector(".player");
  if (
    e.key === "ArrowRight" &&
    playerCells.includes(player.parentElement.nextElementSibling)
  ) {
    player.parentElement.nextElementSibling.appendChild(player);
  }
  if (
    e.key === "ArrowLeft" &&
    playerCells.includes(player.parentElement.previousElementSibling)
  ) {
    player.parentElement.previousElementSibling.appendChild(player);
  }
});

function reset() {
  score = 0;
  dropCount = 0;
  speed = 600;
  scoreDisplay.innerText = 0;
  cells.forEach((cell) => (cell.innerHTML = ""));
  playerCells[1].innerHTML = '<div class="player"></div>';
}

function start() {
  reset();
  loop();
}

function loop() {
  let stopGame = false;
  if (score >= 200) {
    speed = 120;
  } else if (score >= 100) {
    speed = 150;
  } else if (score >= 40) {
    speed = 150;
  } else if (score >= 20) {
    speed = 220;
  } else if (score >= 10) {
    speed = 300;
  } else if (score >= 6) {
    speed = 370;
  } else if (score >= 3) {
    speed = 450;
  }

  for (let i = enemyCells.length - 1; i >= 0; i--) {
    let cell = cells[i];
    let nextCell = cells[i + 3];
    enemy = cell.children[0];
    if (!enemy) {
      continue;
    }
    nextCell.appendChild(enemy);

    if (playerCells.includes(nextCell)) {
      // if(nextCell.firstElementChild.className == 'player')
      if (nextCell.querySelector('.player')) {
        stopGame = true;
      } else {
        score++;
        scoreDisplay.innerHTML = score;
        enemy.remove();
      }
    }
  }

  if (dropCount % 2 === 0) {
    const postion = Math.floor(Math.random() * 3);
    cells[postion].innerHTML = '<div class="enemy"></div>';
  }
  if (stopGame) {
    alert(`diem cua ban la ${score}. Nhan ok de choi lai`);
    reset();
  } else {
    dropCount++;
    setTimeout(loop, speed);
  }
}


