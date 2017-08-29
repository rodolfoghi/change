'use strict';

/**
 * Draw a new rect.
 * @param {number} x The position X.
 * @param {number} y The position Y.
 * @param {number} w The width.
 * @param {number} h The height.
 * @param {string} style The fill style of rect.
 */
function drawRect(x, y, w, h, style) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = style;
  ctx.fill();
  ctx.closePath();
};

/**
 * Draw the player
 */
function drawPlayer() {
  let y = canvas.height - playerHeight;
  const playerStyle = '#1532b2';
  drawRect(playerX, y, playerWidth, playerHeight, playerStyle);
}

/**
 * Draw all game objects.
 */
function draw() {
  if (isRunning) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const enemyStyle = '#ff0000';
  drawRect(randomEnemyX, dy, 50, enemyHeight, enemyStyle);
  drawPlayer();

  if ((playerX == randomEnemyX)
      && (dy >= canvas.height - playerHeight - enemyHeight)) {
    gameOver();
  }

  if (dy <= canvas.height) {
    dy = dy + 1;
  } else {
    marcaPonto(1);
    drawScore();

    if (score % 4 == 0) {
      changeControls();
    }

    dy = 1;
    randomEnemyX = getEnemyX();
  }
}
};

/**
 * Move the player to left.
 */
function btnLeftHandler() {
  if ((playerX > 0) && (!modoInverso)) {
    playerX -= 50;
  } else if (playerX < canvas.width-playerWidth) {
    playerX += 50;
  }
}

/**
 * Move the player to right.
 */
function btnRightHandler() {
  if ((playerX < canvas.width-playerWidth)
      && (!modoInverso)) {
    playerX += 50;
  } else if (playerX > 0) {
    playerX -= 50;
  }
}

/**
 * Get the random X position for the enemy.
 * @return {number} X position.
 */
function getEnemyX() {
  let enemyX = [0, 50];
  return enemyX[Math.round(Math.random())];
}

/**
 * Incremente the score.
 * @param {number} numeroDePontos 
 */
function marcaPonto(numeroDePontos) {
  score += numeroDePontos;
}

/**
 * Draw the score.
 */
function drawScore() {
  scoreUI.innerHTML = 'Pontos: ' + score;
}

/**
 * Inverse the left and righr controls.
 */
function changeControls() {
  modoInverso = !modoInverso;
  let btns = document.querySelectorAll('.btn');
  btns.forEach((btn) => {
    btn.classList.remove('btn-primary');
    btn.classList.remove('btn-danger');
  });

  if (modoInverso) {
    btnLeft.classList.add('btn-primary');
    imgLeft.src = RIGHT_IMG_SRC;
    btnRight.classList.add('btn-danger');
    imgRight.src = LEFT_IMG_SRC;
  } else {
    btnLeft.classList.add('btn-danger');
    imgLeft.src = LEFT_IMG_SRC;
    btnRight.classList.add('btn-primary');
    imgRight.src = RIGHT_IMG_SRC;
  }
}

/**
 * Remove the class hidden for all elements.
 */
function removeHiddenClassForAll() {
  let hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((elem) => {
    elem.classList.remove('hidden');
  });
}

/**
 * Start the game
 */
function btnStartHandler() {
  removeHiddenClassForAll();
  btnStart.classList.add('hidden');
  result.classList.add('hidden');
  dy = 1;
  score = 0;
  drawScore();
  isRunning = true;
}

/**
 * Show message with button to play again
 */
function gameOver() {
  isRunning = false;
  removeHiddenClassForAll();
  let elementsStartHidden = document.querySelectorAll('.start-hidden');
  elementsStartHidden.forEach((elem) => {
    elem.classList.add('hidden');
  });
  btnStart.classList.remove('hidden');
  result.innerHTML = 'GAME OVER! :(<br>'
    + 'Você marcou '
    + '<strong>' + score + '</strong> pontos.<br>'
    + 'Não desanime, clique em START e tente novamente. :)';
  result.classList.remove('hidden');
}

let dy = 1;
let canvas = document.getElementById('main-game');
let btnLeft = document.getElementById('btnLeft');
let btnRight = document.getElementById('btnRight');
let btnStart = document.getElementById('start-button');
let result = document.getElementById('result');
let scoreUI = document.getElementById('scoreUI');
let imgLeft = document.getElementById('imgLeft');
let imgRight = document.getElementById('imgRight');
let ctx = canvas.getContext('2d');
let playerHeight = 50;
let playerWidth = 50;
let playerX = 0;
let randomEnemyX = getEnemyX();
let enemyHeight = 50;
let score = 0;
let modoInverso = false;
btnLeft.addEventListener('click', btnLeftHandler, false);
btnRight.addEventListener('click', btnRightHandler, false);
btnStart.addEventListener('click', btnStartHandler, false);

const LEFT_IMG_SRC = './assets/img/arrow-left-bold-circle.svg';
const RIGHT_IMG_SRC = './assets/img/arrow-right-bold-circle-outline.svg';

let isRunning = false;

window.setInterval(draw, 10);

