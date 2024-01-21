import {IHitbox} from "../hitboxes/IHitbox";

export interface IBullet {
  getX: number;
  getY: number;

  getHitbox(): IHitbox;

  drawBullet(context: CanvasRenderingContext2D): void;

  updateBullet(width: number, height: number): boolean;
}
