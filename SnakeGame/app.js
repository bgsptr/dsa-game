let canvas, context, headSnake, snake, apple, baru, current, num, help;
let head = null;
let temp, head2Snake, snake2, baru2, nodeConvert, color, bantu, truth;
let namePlayer = "";
const rows = cols = blockSize = 30;
let Vx = Vy = V2x = V2y = 0;
let snakeDie = false;
const start = 5;
let scoreA = scoreB = highscore = best_score = 0;
let speedUp = 15;

class Snake {
  constructor(init) {
    this.head = init;
    this.tail = null;
  }
}

class ListScore {
  constructor() {
    this.head = null;
  }
}

class Part {
  constructor(x, y) {
    this.prev = null;
    this.x = x;
    this.y = y;
    this.next = null;
  }
}

class SinglePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.next = null;
  }
}

class Score {
  constructor(namePlayer, bestScore) {
    this.name = namePlayer;
    this.bestScore = bestScore;
    this.next = null;
  }
}

class Apple {
  constructor(blockSize, rows, cols) {
    this.x = Math.floor(Math.random() * rows) * blockSize;
    this.y = Math.floor(Math.random() * cols) * blockSize;
  }
}

snake = new Snake(new Part(blockSize * 5, blockSize * 5));
snake2 = new Snake(new Part(blockSize * 25, blockSize * 25));
snake2.tail = snake2.head;
let listScore = new ListScore();

function initSnake() {
  headSnake = new Part(blockSize * start, blockSize * start);
}

function initSnakePlayer2() {
  head2Snake = new Part(blockSize * 25, blockSize * 25);
}

function initApple() {
  apple = new Apple(blockSize, rows, cols);
}

function initPart() {
  baru = new Part(apple.x, apple.y);
}

function initSinglePart() {
  baru2 = new SinglePart(apple.x, apple.y);
}

function snake1Controller() {
  document.addEventListener("keypress", function (res) {
    let key = res.key;
    if (key === "w" && Vy !== 1) {
      Vx = 0;
      Vy = -1;
    } else if (key === "a" && Vx !== 1) {
      Vx = -1;
      Vy = 0;
    } else if (key === "s" && Vy !== -1) {
      Vx = 0;
      Vy = 1;
    } else if (key === "d" && Vx != -1) {
      Vx = 1;
      Vy = 0;
    }
  });
}

function snake2Controller() {
  document.addEventListener("keypress", function(e) {
    let resKey = e.key;
    if (resKey === "i" && V2y !== 1) {
      V2x = 0;
      V2y = -1;
    } else if (resKey === "j" && V2x !== 1) {
      V2x = -1;
      V2y = 0;
    } else if (resKey === "k" && V2y !== -1) {
      V2x = 0;
      V2y = 1;
    } else if (resKey === "l" && V2x != -1) {
      V2x = 1;
      V2y = 0;
    }
  });
}

function addtoTail() {
  initPart();
  if (snake.head.next === null) {
    snake.head.next = baru;
    baru.prev = snake.head;
  } else {
    current = snake.tail;
    current.next = baru;
    baru.prev = current;
  }
  snake.tail = baru;
}

function moveFollowSnakeHead() {
  let last = snake.tail;
  while (last !== null && last !== snake.head) {
    last.x = last.prev.x;
    last.y = last.prev.y;
    last = last.prev; 
  }
  snake.head.x = headSnake.x;
  snake.head.y = headSnake.y;
}

function addToHead2Snake() {
  if(snake2.head === snake2.tail) {
    snake2.head = baru;
    snake2.head.next = snake2.tail;
    snake2.head.prev = null;
    snake2.tail.prev = snake2.head;
  }
  else {
    temp = snake2.head;
    temp.prev = baru;
    snake2.head = baru;
    snake2.head.next = temp;
  }
}

function checkList() {
  console.log(snake);
  console.log(snake.head);
  console.log(snake.tail);
}

function scoring() {
  if(boolA) {
    scoreA += 10;
    document.querySelector(".score").innerHTML = scoreA;
  }
  else {
    scoreB += 10
    document.querySelector(".score2").innerHTML = scoreB;
  }
  console.log(document);
}

function tpB() {
  if (head2Snake.x >= canvas.width) {
    let snakee = snake2.tail;
    while(snakee !== null) {
      snakee.x = 0;
      snakee = snakee.prev;
    }
    head2Snake.x = 0;
  }
  else if(head2Snake.y >= canvas.height) {
    let snakee = snake2.tail;
    while(snakee !== null) {
      snakee.y = 0;
      snakee = snakee.prev;
    }
    head2Snake.y = 0;
  }
  else if(head2Snake.x < 0) {
    let snakee2 = snake2.head.next;
    head2Snake.x = canvas.width;
    while(snakee2 !== null) {
      snakee2.x = canvas.width;
      snakee2 = snakee2.next;
    }
  }
  else if(head2Snake.y < 0) {
    let snakee2 = snake2.head.next;
    head2Snake.x = canvas.height;
    while(snakee2 !== null) {
      snakee2.y = canvas.height;
      snakee2 = snakee2.next;
    }
    head2Snake.y = canvas.height;
  }
}

let boolA;
function eat() {
  if (headSnake.x === apple.x && headSnake.y === apple.y) {
    initPart();
    addtoTail();
    initApple();
    console.log("true");
    checkList();
    boolA = true;
    scoring();
  }
  moveFollowSnakeHead();
}

function blueEat() {
  if(head2Snake.x === apple.x && head2Snake.y === apple.y) {
    initPart();
    addToHead2Snake();
    initApple();
    boolA = false;
    scoring();
    console.log(snake2);
    console.log(snake2.head.x, snake2.head.y);
    console.log(snake2.tail.x, snake2.tail.y);
  }
  let test = snake2.tail;
  while (test !== null && test !== snake2.head) {
    test.x = test.prev.x;
    test.y = test.prev.y;
    test = test.prev; 
  }
  snake2.head.x = head2Snake.x;
  snake2.head.y = head2Snake.y;
}

function generateCanvas() {
  canvas = document.getElementById("canvas");
  canvas.height = rows * blockSize;
  canvas.width = cols * blockSize;
  context = canvas.getContext("2d");
}

function saveBest() {
  let highscore;
  if (scoreA > scoreB) {
    highscore = scoreA;
  } else {
    highscore = scoreB;
  }
  
  const bestScore = localStorage.getItem("best_score");
  if (!bestScore || highscore > bestScore) {
    localStorage.setItem("best_score", highscore);
  }
  
  const winnerScore = localStorage.getItem("best_score");
  document.querySelector(".bestScore").innerHTML = winnerScore;
  console.log(listScore);
}


function goOutside() {
  if (headSnake.x < 0 || headSnake.y < 0 || headSnake.x >= canvas.width || headSnake.y >= canvas.height) {
    snakeDie = true;
    saveBest();
    alert("Game Over");
    return;
  }
}

let chSnake, chHeadSnake, snakeOpt;
function eatSelf(chSnake) {
  if(chSnake === snake) {
    chHeadSnake = headSnake;
    snakeOpt = snake.head;
  }
  else {
    chHeadSnake = head2Snake;
    snakeOpt = snake2.head;
  }
  let check = snakeOpt.next;
  while (check !== null) {
    if (chHeadSnake.x === check.x && chHeadSnake.y === check.y) {
      snakeDie = true;
      saveBest();
    }
    check = check.next;
  }
}

function blackBoardCell() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, blockSize, blockSize);
}

function snake1BoardCell() {
  context.fillStyle = "lime";
  headSnake.x += Vx * blockSize;
  headSnake.y += Vy * blockSize;
  context.fillRect(headSnake.x, headSnake.y, blockSize, blockSize);
}

function snake2boardCell() {
  context.fillStyle = "blue";
  head2Snake.x += V2x * blockSize;
  head2Snake.y += V2y * blockSize;
  context.fillRect(head2Snake.x, head2Snake.y, blockSize, blockSize);
}

function convertAppleSnake(nodeConvert) {
  if(nodeConvert == snake) {
    color = 'rgb('+
    Math.floor(Math.random()*256)+','+
    Math.floor(Math.random()*256)+','+
    Math.floor(Math.random()*256)+')';
  }
  else {
    color = "blue";
  }
  let point = nodeConvert.head;
  while (point.next != null) {
      context.fillStyle = color;
      context.fillRect(point.x, point.y, blockSize, blockSize);
      point = point.next;
  }
}

function snakeLost() {
  let tmpnode = snake.head.next;
  while(tmpnode !== null) {
    if(head2Snake.x === tmpnode.x && head2Snake.y === tmpnode.y) {
        truth = true;
        return;
      }
      tmpnode = tmpnode.next;
    }
  }

  function snake2Lost() {
    let tmpNode2 = snake2.head.next;
    while(tmpNode2 != null) {
      if(headSnake.x === tmpNode2.x && headSnake.y === tmpNode2.y) {
        let snakeNode = snake.head; 
        while(snakeNode !== null) {
          snakeNode.x = snakeNode.y = Number.MAX_VALUE;
          snakeNode = snakeNode.next;
        }
        headSnake.x = headSnake.y = Number.MAX_VALUE;
        return;
      }
    }
  }

function update() {
  console.log(apple.x, apple.y);  
  if(snakeDie) {
    return;
  }
  if(truth) {
    let snakee = snake2.tail;
    snake2.tail = null;
    while(snakee !== null) {
      snakee.x = snakee.y = Number.MAX_VALUE;
      context.strokeStyle = "black";
      context.strokeRect(snakee.x, snakee.y, blockSize, blockSize);
      snakee = snakee.prev;
    }
    head2Snake.x = head2Snake.y = Number.MAX_VALUE
    console.log("snake 2 lost");
  }
  blackBoardCell();
  eat();
  blueEat();
  snake1BoardCell();
  snake2boardCell();
  convertAppleSnake(snake);
  convertAppleSnake(snake2);
  goOutside();
  eatSelf(snake);
  eatSelf(snake2);
  snakeLost();
  // snake2Lost();
  tpB();
}

window.onload = function () {
  generateCanvas();
  initSnake();
  initSnakePlayer2();
  initApple();
  snake1Controller();
  snake2Controller();
  setInterval(update, 1000 / speedUp);
};

// checkList();
// console.log(snake2);

