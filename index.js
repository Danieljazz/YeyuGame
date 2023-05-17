const mainCanvas = document.querySelector("canvas");
mainCanvasContext = mainCanvas.getContext("2d");
mainCanvas.width = 1024;
mainCanvas.height = 576;

const mapImg = new Image();
mapImg.src = "./newAssets/mapZoomed.png";
mainCanvasContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
let move = 0;
const playerImg = new Image();
playerImg.src = "./newAssets/Basic Charakter Spritesheet.png";

mapImg.onload = () => {
  mainCanvasContext.drawImage(mapImg, -900, -600);
  //playerImg.width = 100 * 4;
  //playerImg.height = 100 * 4;
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
};
window.addEventListener("keydown", (e) => {
  console.log(e.key);
  switch (e.key) {
    case "s":
      move < 3 ? move++ : (move = 2);
      myTimeout = setTimeout(() => {}, 5000);
      clearTimeout(myTimeout);
      console.log(move);
      mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      mainCanvasContext.drawImage(mapImg, -900, -600);
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
      break;
    case "w":
      move < 3 ? move++ : (move = 2);
      console.log(move);
      mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      mainCanvasContext.drawImage(mapImg, -900, -600);
      mainCanvasContext.drawImage(
        playerImg,
        move * 48,
        48,
        playerImg.width / 4,
        playerImg.height / 4,
        mainCanvas.width / 2 - playerImg.width / 8,
        mainCanvas.height / 2 - playerImg.height / 8,
        playerImg.width,
        playerImg.height
      );
      break;
    case "a":
      move < 3 ? move++ : (move = 2);
      console.log(move);
      mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      mainCanvasContext.drawImage(mapImg, -900, -600);
      mainCanvasContext.drawImage(
        playerImg,
        move * 48,
        2 * 48,
        playerImg.width / 4,
        playerImg.height / 4,
        mainCanvas.width / 2 - playerImg.width / 8,
        mainCanvas.height / 2 - playerImg.height / 8,
        playerImg.width,
        playerImg.height
      );
      break;
    case "d":
      move < 3 ? move++ : (move = 2);
      console.log(move);
      mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      mainCanvasContext.drawImage(mapImg, -900, -600);
      mainCanvasContext.drawImage(
        playerImg,
        move * 48,
        3 * 48,
        playerImg.width / 4,
        playerImg.height / 4,
        mainCanvas.width / 2 - playerImg.width / 8,
        mainCanvas.height / 2 - playerImg.height / 8,
        playerImg.width,
        playerImg.height
      );
      break;
    default:
      break;
  }
});
