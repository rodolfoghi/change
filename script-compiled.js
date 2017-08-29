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
  var y = canvas.height - playerHeight;
  var playerStyle = '#1532b2';
  drawRect(playerX, y, playerWidth, playerHeight, playerStyle);
}

/**
 * Draw all game objects.
 */
function draw() {
  if (isRunning) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var enemyStyle = '#ff0000';
    drawRect(randomEnemyX, dy, 50, enemyHeight, enemyStyle);
    drawPlayer();

    if (playerX == randomEnemyX && dy >= canvas.height - playerHeight - enemyHeight) {
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
  if (playerX > 0 && !modoInverso) {
    playerX -= 50;
  } else if (playerX < canvas.width - playerWidth) {
    playerX += 50;
  }
}

/**
 * Move the player to right.
 */
function btnRightHandler() {
  if (playerX < canvas.width - playerWidth && !modoInverso) {
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
  var enemyX = [0, 50];
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
  var btns = document.querySelectorAll('.btn');
  btns.forEach(function (btn) {
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
  var hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(function (elem) {
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
  var elementsStartHidden = document.querySelectorAll('.start-hidden');
  elementsStartHidden.forEach(function (elem) {
    elem.classList.add('hidden');
  });
  btnStart.classList.remove('hidden');
  result.innerHTML = 'GAME OVER! :(<br>' + 'Você marcou ' + '<strong>' + score + '</strong> pontos.<br>' + 'Não desanime, clique em START e tente novamente. :)';
  result.classList.remove('hidden');
}

var dy = 1;
var canvas = document.getElementById('main-game');
var btnLeft = document.getElementById('btnLeft');
var btnRight = document.getElementById('btnRight');
var btnStart = document.getElementById('start-button');
var result = document.getElementById('result');
var scoreUI = document.getElementById('scoreUI');
var imgLeft = document.getElementById('imgLeft');
var imgRight = document.getElementById('imgRight');
var ctx = canvas.getContext('2d');
var playerHeight = 50;
var playerWidth = 50;
var playerX = 0;
var randomEnemyX = getEnemyX();
var enemyHeight = 50;
var score = 0;
var modoInverso = false;
btnLeft.addEventListener('click', btnLeftHandler, false);
btnRight.addEventListener('click', btnRightHandler, false);
btnStart.addEventListener('click', btnStartHandler, false);

var LEFT_IMG_SRC = './assets/img/arrow-left-bold-circle.svg';
var RIGHT_IMG_SRC = './assets/img/arrow-right-bold-circle-outline.svg';

var isRunning = false;

window.setInterval(draw, 10);
