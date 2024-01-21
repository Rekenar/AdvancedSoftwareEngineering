import {BaseMagazine} from "./BaseMagazine";
import {RailGun} from "../bullets/RailGun";

export class RailGunMagazine extends BaseMagazine {
  constructor(context: CanvasRenderingContext2D) {
    super(context)
  }

  override shoot(x: number, y: number, angle: number): void {
    let bullet = new RailGun(x, y, angle);
    this.bullets.push(bullet);
  }

}
