// Canvas config
const mainCanvas = document.querySelector("canvas");
mainCanvasContext = mainCanvas.getContext("2d");
mainCanvas.width = 1024;
mainCanvas.height = 576;
const TileWidth = 16;
const mapZoom = 5;

// map img
const mapImg = new Image();
mapImg.src = "./newAssets/mapZoomed.png";
mainCanvasContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
const offset = { x: -900, y: 600 };

// player img
const playerImg = new Image();
playerImg.src = "./newAssets/Basic Charakter Spritesheet.png";
const initPlayerPosition = { x: 0, y: 0 };
let move = 0;

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
    this.velocity = velocity;
  }

  draw() {
    mainCanvasContext.drawImage(this.image, this.position.x, this.position.y);
  }
}

const backgroundObject = new Sprite({
  position: { x: -900, y: -600 },
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
    mainCanvasContext.fillStyle = "red";
    mainCanvasContext.fillRect(
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
            x: j * Boundry.width - 900,
            y: i * Boundry.height - 600,
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
console.log(boundriesObjects);
function animate() {
  window.requestAnimationFrame(animate);
  mainCanvasContext.drawImage(
    playerImg,
    move * 48,
    0,
    playerImg.width / 4,
    playerImg.height / 4,
    mainCanvas.width / 2 - playerImg.width / 8,
    mainCanvas.height / 2 - playerImg.height / 8,
    playerImg.width,
    playerImg.height
  );
  if (keys.w.pressed && lastKey === "w") {
    move < 3 ? move++ : (move = 2);
    ycounter = 1;
    backgroundObject.position.y += 3;
  } else if (keys.s.pressed && lastKey === "s") {
    move < 3 ? move++ : (move = 2);
    ycounter = 0;
    //mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    //mainCanvasContext.drawImage(mapImg, -900, -600);
    backgroundObject.position.y -= 3;
  } else if (keys.a.pressed && lastKey === "a") {
    move < 3 ? move++ : (move = 2);
    ycounter = 2;
    backgroundObject.position.x += 3;
  } else if (keys.d.pressed && lastKey === "d") {
    move < 3 ? move++ : (move = 2);
    ycounter = 3;
    backgroundObject.position.x -= 3;
  }
  mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  backgroundObject.draw();
  boundriesObjects.forEach((boundry) => boundry.draw());
  mainCanvasContext.drawImage(
    playerImg,
    move * 48,
    ycounter * 48,
    playerImg.width / 4,
    playerImg.height / 4,
    mainCanvas.width / 2 - playerImg.width / 4,
    mainCanvas.height / 2 - playerImg.height / 4,
    playerImg.width,
    playerImg.height
  );
}
animate();
lastKey = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      // move < 3 ? move++ : (move = 2);
      // console.log(move);
      // //mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      // //mainCanvasContext.drawImage(mapImg, -900, -600);
      // mainCanvasContext.drawImage(
      //   playerImg,
      //   move * 48,
      //   0,
      //   playerImg.width / 4,
      //   playerImg.height / 4,
      //   mainCanvas.width / 2 - playerImg.width / 8,
      //   mainCanvas.height / 2 - playerImg.height / 8,
      //   playerImg.width,
      //   playerImg.height
      // );
      // backgroundObject.position.y -= 6;
      lastKey = "s";
      keys.s.pressed = true;
      break;
    case "w":
      //move < 3 ? move++ : (move = 2);
      //console.log(move);
      //mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      //mainCanvasContext.drawImage(mapImg, -900, -600);
      // mainCanvasContext.drawImage(
      //   playerImg,
      //   move * 48,
      //   48,
      //   playerImg.width / 4,
      //   playerImg.height / 4,
      //   mainCanvas.width / 2 - playerImg.width / 8,
      //   mainCanvas.height / 2 - playerImg.height / 8,
      //   playerImg.width,
      //   playerImg.height
      // );
      // backgroundObject.position.y += 6;
      lastKey = "w";
      keys.w.pressed = true;
      break;
    case "a":
      // move < 3 ? move++ : (move = 2);
      // console.log(move);
      // //mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      // //mainCanvasContext.drawImage(mapImg, -900, -600);
      // mainCanvasContext.drawImage(
      //   playerImg,
      //   move * 48,
      //   2 * 48,
      //   playerImg.width / 4,
      //   playerImg.height / 4,
      //   mainCanvas.width / 2 - playerImg.width / 8,
      //   mainCanvas.height / 2 - playerImg.height / 8,
      //   playerImg.width,
      //   playerImg.height
      // );
      // backgroundObject.position.x += 6;
      lastKey = "a";
      keys.a.pressed = true;
      break;
    case "d":
      // move < 3 ? move++ : (move = 2);
      // console.log(move);
      // //mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      // mainCanvasContext.drawImage(mapImg, -900, -600);
      // mainCanvasContext.drawImage(
      //   playerImg,
      //   move * 48,
      //   3 * 48,
      //   playerImg.width / 4,
      //   playerImg.height / 4,
      //   mainCanvas.width / 2 - playerImg.width / 8,
      //   mainCanvas.height / 2 - playerImg.height / 8,
      //   playerImg.width,
      //   playerImg.height
      // );
      // backgroundObject.position.x -= 6;
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
