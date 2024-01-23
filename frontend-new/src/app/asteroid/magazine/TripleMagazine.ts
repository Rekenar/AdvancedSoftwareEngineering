import {BaseMagazine} from "./BaseMagazine";
import {SlowBullet} from "../bullets/SlowBullet";
import {NormalBullet} from "../bullets/NormalBullet";
import {FastBullet} from "../bullets/FastBullet";
import {IBullet} from "../bullets/IBullet";
import {RandomBullet} from "../bullets/RandomBullet";

export class TripleMagazine extends BaseMagazine {
  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }


  override shoot(x: number, y: number, angle: number): void {
    let bullet1: IBullet;
    let bullet2: IBullet;
    let bullet3: IBullet;
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        bullet1 = new SlowBullet(x, y, angle);
        bullet2 = new SlowBullet(x, y, angle + Math.PI / 6);
        bullet3 = new SlowBullet(x, y, angle - Math.PI / 6);
        break;
      case 1:
        bullet1 = new NormalBullet(x, y, angle);
        bullet2 = new NormalBullet(x, y, angle + Math.PI / 6);
        bullet3 = new NormalBullet(x, y, angle - Math.PI / 6);
        break;
      case 2:
        bullet1 = new FastBullet(x, y, angle);
        bullet2 = new FastBullet(x, y, angle + Math.PI / 6);
        bullet3 = new FastBullet(x, y, angle - Math.PI / 6);
        break;
      default:
        bullet1 = new RandomBullet(x, y, angle);
        bullet2 = new RandomBullet(x, y, angle + Math.PI / 6);
        bullet3 = new RandomBullet(x, y, angle - Math.PI / 6);
        break;
    }
    this.bullets.push(bullet1);
    this.bullets.push(bullet2);
    this.bullets.push(bullet3);
  }
}
