import {IBullet} from "../bullets/IBullet";

export interface IMagazine {
  context: CanvasRenderingContext2D;

  getBullets: IBullet[];


  shoot(x: number, y: number, angle: number): void;

  drawBullets(): void;

  updateBullets(): void;


}
