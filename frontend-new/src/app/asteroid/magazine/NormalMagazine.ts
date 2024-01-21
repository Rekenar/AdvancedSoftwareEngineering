import {BaseMagazine} from "./BaseMagazine";
import {SlowBullet} from "../bullets/SlowBullet";
import {NormalBullet} from "../bullets/NormalBullet";
import {FastBullet} from "../bullets/FastBullet";
import {IBullet} from "../bullets/IBullet";

export class NormalMagazine extends BaseMagazine {
  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }


  override shoot(x: number, y: number, angle: number): void {
    let bullet: IBullet;
    let num = Math.floor(Math.random() * 3);
    switch (num) {
      case 0:
        bullet = new SlowBullet(x, y, angle);
        break;
      case 1:
        bullet = new NormalBullet(x, y, angle);
        break;
      case 2:
        bullet = new FastBullet(x, y, angle);
        break;
      default:
        bullet = new NormalBullet(x, y, angle);
        break;
    }
    this.bullets.push(bullet);
  }
}
