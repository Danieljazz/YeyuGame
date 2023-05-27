class Sprite {
  constructor({ context, position, velocity, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.velocity = velocity;
    this.frames = { ...frames, count: 0, animationFrame: 0, direction: 0 };
    this.move = false;
    this.context = context;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height / this.frames.max;
      console.log(this.width);
    };
  }

  draw() {
    this.context.drawImage(
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
