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

const playerDigImg = new Image();
playerDigImg.src = "./newAssets/Basic Charakter Actions.png";

const cropImg = new Image();
cropImg.src = "./newAssets/Tilled Dirt.png";

class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { maxX: 1, maxY: 1 },
    scale = 1,
  }) {
    this.position = position;
    this.image = image;
    this.velocity = velocity;
    this.frames = { ...frames, count: 0, animationFrame: 0, direction: 0 };
    this.move = false;
    this.scale = scale;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.maxX;
      this.height = this.image.height / this.frames.maxY;
    };
  }

  draw() {
    canvasContext.drawImage(
      this.image,
      48 * this.frames.animationFrame,
      48 * this.frames.direction,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.scale * this.width,
      this.scale * this.height
    );
    if (!this.move) return;
    if (this.frames.maxX > 1) this.frames.count++;
    if (this.frames.count % 10 === 0) {
      if (this.frames.animationFrame < this.frames.maxX - 1)
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
  f: { pressed: false },
};
let ycounter = 0;
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 192 / 4 / 2,
  },
  image: playerImg,
  frames: { maxX: 4, maxY: 4 },
  scale: 3,
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

const testCrop = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 192 / 4 / 2,
  },
  image: cropImg,
  frames: { maxX: 8, maxY: 8 },
  scale: 3,
});
let crop = [testCrop];
console.log("test crop =", testCrop.position.x);
console.log("test cropy =", testCrop.position.y);
console.log("backgroundObject cropy =", backgroundObject.position.x);
console.log("backgroundObject cropy =", backgroundObject.position.y);
let movables = [backgroundObject, ...crop, ...boundriesObjects];
function animate() {
  window.requestAnimationFrame(animate);
  movables = [backgroundObject, ...crop, ...boundriesObjects];
  backgroundObject.draw();
  //testCrop.draw();
  //crop[0]?.draw();
  for (let i = 0; i < crop.length; i++) {
    crop[i].draw();
  }

  boundriesObjects.forEach((boundry) => boundry.draw());
  player.draw();
  player.move = false;
  let moving = true;
  if (keys.w.pressed && lastKey === "w") {
    player.move = true;
    player.frames.direction = 1;
    moving = true; //canPlayerMove(boundriesObjects, player, 0, 3);
    moving && movables.forEach((item) => (item.position.y += 3));
  } else if (keys.s.pressed && lastKey === "s") {
    player.move = true;
    player.frames.direction = 0;
    moving = true; //canPlayerMove(boundriesObjects, player, 0, -3);
    moving && movables.forEach((item) => (item.position.y -= 3));
  } else if (keys.a.pressed && lastKey === "a") {
    player.move = true;
    player.frames.direction = 2;
    moving = true; //canPlayerMove(boundriesObjects, player, 3, 0);
    moving && movables.forEach((item) => (item.position.x += 3));
  } else if (keys.d.pressed && lastKey === "d") {
    player.move = true;
    player.frames.direction = 3;
    moving = true; // canPlayerMove(boundriesObjects, player, -3, 0);
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
    case "f":
      keys.f.pressed = true;
      player.frames.maxX = 2;
      player.frames.maxY = 10;
      player.image = playerDigImg;
      player.draw();
      //player.direction = 1;canvas.width / 2 - 192 / 4 / 2
      player.move = true;
      let cropx = -backgroundObject.position.x;
      let cropy = -backgroundObject.position.y;
      console.log("crop x is", backgroundObject.position.x);
      let newcrop = new Sprite({
        position: {
          x: cropx,
          y: cropy,
        },
        image: cropImg,
        frames: { maxX: 8, maxY: 8 },
        width: 16,
        height: 16,
        scale: 3,
      });
      newcrop.width = 16;
      newcrop.height = 16;
      crop.push(newcrop);
      console.log(crop);

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
    case "f":
      keys.f.pressed = false;
      player.frames.maxX = 4;
      player.frames.maxY = 1;
      player.image = playerImg;
    default:
      break;
  }
});
