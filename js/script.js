let score = 0;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0, dy = 0;
let tileSize = 20;
let canvas = document.getElementById("snakeGame");
let ctx = canvas.getContext("2d");
let inventory = [];

document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

function drawGame() {
  ctx.fillStyle = "#2e2e3e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let part of snake) {
    ctx.fillStyle = "#6c5ce7";
    ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize - 2, tileSize - 2);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize - 2, tileSize - 2);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score").textContent = score;
    food = {
      x: Math.floor(Math.random() * (canvas.width / tileSize)),
      y: Math.floor(Math.random() * (canvas.height / tileSize))
    };
  } else {
    snake.pop();
  }

  if (snake.some(segment => segment.x === head.x && segment.y === head.y) ||
      head.x < 0 || head.x >= canvas.width / tileSize ||
      head.y < 0 || head.y >= canvas.height / tileSize) {
    alert("Конец игры!");
    snake = [{ x: 10, y: 10 }];
    dx = dy = 0;
    score = 0;
    document.getElementById("score").textContent = score;
  }

  snake.unshift(head);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
  if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
  if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
  if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
});

function gameLoop() {
  moveSnake();
  drawGame();
  setTimeout(gameLoop, 150);
}

gameLoop();

document.getElementById("openCase").addEventListener("click", () => {
  if (score < 100) {
    alert("Недостаточно очков!");
    return;
  }

  score -= 100;
  document.getElementById("score").textContent = score;

  const nft = "NFT #" + Math.floor(Math.random() * 1000);
  inventory.push(nft);

  const div = document.createElement("div");
  div.textContent = nft;
  document.getElementById("nftInventory").appendChild(div);
});

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Удалить активный класс у всех
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Добавить активный класс к выбранной вкладке и кнопке
    const target = button.getAttribute('data-tab');
    button.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});
