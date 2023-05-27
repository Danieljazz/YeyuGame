class World {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.width = 1024;
    this.height = 576;
    this.mapImg = new Image();
    this.mapImg.src = "./newAssets/mapZoomed.png";
    const offset = { x: -860, y: -600 };
    this.background = new Sprite({
      context: this.context,
      position: { x: offset.x, y: offset.y },
      image: this.mapImg,
    });
    {
      this.mapImg.onload = () => {
        this.background.draw();
      };
    }
  }
  init() {}
}
