const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 500);

// let x = CANVAS_WIDTH / 3,
//   y = CANVAS_HEIGHT / 2;
// let dx = 1,
//   dy = -2;
// let colors = ["black", "green", "lightblue", "purple", "orange"];
// let colorIndex = 0;

// function generateRandomIndex(length) {
//   return Math.floor(Math.random() * length);
// }

// function collisionDetection() {
//   if (x + 100 > CANVAS_WIDTH || x < 0) {
//     dx = -dx;
//     colorIndex = generateRandomIndex(colors.length);
//     console.log(colorIndex);
//   }
//   if (y + 100 > CANVAS_HEIGHT || y < 0) {
//     dy = -dy;
//     colorIndex = generateRandomIndex(colors.length);
//   }
// }

// function update() {
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//   ctx.beginPath();
//   ctx.fillStyle = colors[colorIndex];
//   ctx.rect(x, y, 100, 100);
//   ctx.fill();
//   ctx.closePath();
//   x += dx;
//   y += dy;
//   collisionDetection();
//   requestAnimationFrame(update);
// }
// update();

//------------------------------WITH OOP ----------------------------------------

class Rectangle {
  constructor(x, y, dx, dy, w, h, colorIndex) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.w = w;
    this.h = h;
    this.color = colors[colorIndex];
  }

  setColor(color) {
    this.color = color;
  }

  setDx(dx) {
    this.dx = dx;
  }

  setDy(dy) {
    this.dy = dy;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();
    ctx.closePath();
  }

  collisionDetection() {
    if (this.x + this.w > CANVAS_WIDTH || this.x < 0) {
      this.dx = -this.dx;
      colorIndex = getRandomNumber(colors.length, 0);
      this.color = colors[colorIndex];
    }
    if (this.y + this.h > CANVAS_HEIGHT || this.y < 0) {
      this.dy = -this.dy;
      colorIndex = getRandomNumber(colors.length, 0);
      this.color = colors[colorIndex];
    }
  }
}

let colors = ["pink", "purple", "black", "orange", "golden", "gray", "green"];
let colorIndex = 0;

let rectangles = [];
let size = 15;

let rectangleObj = new Rectangle(
  CANVAS_WIDTH / 2,
  CANVAS_HEIGHT / 3,
  1,
  1,
  100,
  100,
  colorIndex
);

rectangles.push(rectangleObj);

function getRandomNumber(max, min, includeZero = true) {
  let num = Math.floor(Math.random() * (max - min) + min);
  if (!includeZero) {
    while (num == 0) {
      num = Math.floor(Math.random() * (max - min) + min);
    }
  }
  return num;
}

for (let i = 0; i < size; i++) {
  rectangles.push(
    new Rectangle(
      getRandomNumber(CANVAS_WIDTH - 150, 0),
      getRandomNumber(CANVAS_HEIGHT - 150, 0),
      getRandomNumber(2, -2, false),
      getRandomNumber(2, -2, false),
      getRandomNumber(150, 50),
      getRandomNumber(150, 50),
      getRandomNumber(colors.length, 0)
    )
  );
}

// function collisionDetection() {
//   rectangles.forEach((rectangle) => {
//     console.log(rectangle.x + rectangle.w);
//     if (rectangle.x + rectangle.w > CANVAS_WIDTH || rectangle.x < 0) {
//       rectangle.setDx(-rectangle.dx);
//       console.log(rectangle.dx);
//     }
//     if (rectangle.y + rectangle.h > CANVAS_HEIGHT || rectangle.y < 0) {
//       rectangle.setDy(-rectangle.dy);
//     }
//   });
// }

function update() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  rectangles.forEach((rectangle) => {
    rectangle.draw();
    rectangle.move();
    rectangle.collisionDetection();
  });

  requestAnimationFrame(update);
}

update();
