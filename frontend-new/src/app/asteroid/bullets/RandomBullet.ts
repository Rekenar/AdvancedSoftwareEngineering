import {BaseBullet} from "./BaseBullet";

export class RandomBullet extends BaseBullet {

  constructor(x: number, y: number, angle: number) {
    super(x, y, 1, angle);
  }

  override updateBullet(width: number, height: number) {
    // Update position based on current angle
    this.x = Math.random() * width;
    this.y = Math.random() * height;

    return (this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }

}
