// Canvas config
const canvas = document.querySelector("canvas");
canvasContext = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
const TileWidth = 16;
const mapZoom = 5;

// map img
const mapImg = new Image();
mapImg.src = "./newAssets/mapZoomed.png";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);
const offset = { x: -860, y: -600 };

// player img
const playerImg = new Image();
playerImg.src = "./newAssets/Basic Charakter Spritesheet.png";
const initPlayerPosition = { x: 0, y: 0 };
let move = 0;

class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.velocity = velocity;
    this.frames = { ...frames, count: 0, animationFrame: 0, direction: 0 };
    this.move = false;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height / this.frames.max;
      console.log(this.width);
    };
  }

  draw() {
    canvasContext.drawImage(
      this.image,
      48 * this.frames.animationFrame,
      48 * this.frames.direction,
      this.image.width / this.frames.max,
      this.image.height / this.frames.max,
      this.position.x,
      this.position.y,
      this.image.width,
      this.image.height
    );
    if (!this.move) return;
    if (this.frames.max > 1) this.frames.count++;
    if (this.frames.count % 10 === 0) {
      if (this.frames.animationFrame < this.frames.max - 1)
        this.frames.animationFrame++;
      else this.frames.animationFrame = 0;
    }
  }
}

const backgroundObject = new Sprite({
  position: { x: offset.x, y: offset.y },
  image: mapImg,
});

class Boundry {
  static width = TileWidth * 4;
  static height = TileWidth * 4;
  constructor({ position }) {
    this.position = position;
    this.width = TileWidth * 4;
    this.height = TileWidth * 4;
  }

  draw() {
    canvasContext.fillStyle = "rgba(255, 0,0, 0.2)";
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

const boundries = [];
for (i = 0; i < collisions.length; i += 53) {
  boundries.push(collisions.slice(i, i + 53));
}
let boundriesObjects = [];
boundries.forEach((row, i) =>
  row.forEach((cell, j) => {
    if (cell === 240) {
      boundriesObjects.push(
        new Boundry({
          position: {
            x: j * Boundry.width + offset.x,
            y: i * Boundry.height + offset.y,
          },
        })
      );
    }
  })
);

let keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
};
let ycounter = 0;
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 192 / 4 / 2,
  },
  image: playerImg,
  frames: { max: 4 },
});

function checkCollision({ rectPlayer, rectBoundry }) {
  return (
    rectPlayer.position.x + rectPlayer.width >=
      rectBoundry.position.x - rectBoundry.width &&
    rectPlayer.position.x - rectPlayer.width <=
      rectBoundry.position.x - rectBoundry.width &&
    rectPlayer.position.y <= rectBoundry.position.y &&
    rectPlayer.position.y >= rectBoundry.position.y - 2 * rectBoundry.height
  );
}

function canPlayerMove(boundriesObjects, player, xMove, yMove) {
  for (let i = 0; i < boundriesObjects.length; i++) {
    const boundry = boundriesObjects[i];
    if (
      checkCollision({
        rectPlayer: player,
        rectBoundry: {
          ...boundry,
          position: {
            y: boundry.position.y + yMove,
            x: boundry.position.x + xMove,
          },
        },
      })
    ) {
      return false;
    }
  }
  return true;
}
console.log(player.height);
let movables = [backgroundObject, ...boundriesObjects];
function animate() {
  window.requestAnimationFrame(animate);
  backgroundObject.draw();
  player.draw();
  boundriesObjects.forEach((boundry) => boundry.draw());
  player.move = false;
  let moving = true;
  if (keys.w.pressed && lastKey === "w") {
    player.move = true;
    player.frames.direction = 1;
    moving = canPlayerMove(boundriesObjects, player, 0, 3);
    moving && movables.forEach((item) => (item.position.y += 3));
  } else if (keys.s.pressed && lastKey === "s") {
    player.move = true;
    player.frames.direction = 0;
    moving = canPlayerMove(boundriesObjects, player, 0, -3);
    moving && movables.forEach((item) => (item.position.y -= 3));
  } else if (keys.a.pressed && lastKey === "a") {
    player.move = true;
    player.frames.direction = 2;
    moving = canPlayerMove(boundriesObjects, player, 3, 0);
    moving && movables.forEach((item) => (item.position.x += 3));
  } else if (keys.d.pressed && lastKey === "d") {
    player.move = true;
    player.frames.direction = 3;
    moving = canPlayerMove(boundriesObjects, player, -3, 0);
    moving && movables.forEach((item) => (item.position.x -= 3));
  }
}
animate();
lastKey = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      lastKey = "s";
      keys.s.pressed = true;
      break;
    case "w":
      lastKey = "w";
      keys.w.pressed = true;
      break;
    case "a":
      lastKey = "a";
      keys.a.pressed = true;
      break;
    case "d":
      lastKey = "d";
      keys.d.pressed = true;
      break;
    default:
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
