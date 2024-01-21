import {IBullet} from "../bullets/IBullet";
import {IMagazine} from "./IMagazine";
import {NormalBullet} from "../bullets/NormalBullet";

export abstract class BaseMagazine implements IMagazine {
  context: CanvasRenderingContext2D;
  bullets: IBullet[];

  protected constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.bullets = [];
  }

  get getBullets(): IBullet[] {
    return this.bullets;
  }

  shoot(x: number, y: number, angle: number): void {
    const speed = 10; // Adjust the bullet speed as needed
    const bullet = new NormalBullet(x, y, speed, angle);
    this.bullets.push(bullet);
  }

  drawBullets() {
    this.bullets.forEach(bullet => {
      bullet.drawBullet(this.context);
    });
  }

  updateBullets() {
    this.bullets.forEach(bullet => {
      if (bullet.updateBullet(this.context.canvas.width, this.context.canvas.height)) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
      }
    });
  }

}
