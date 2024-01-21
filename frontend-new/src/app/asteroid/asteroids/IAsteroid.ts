import {IHitbox} from "../hitboxes/IHitbox";

export interface IAsteroid {
  getX: number;
  getY: number;
  getSpeed: number;
  getAngle: number;
  getRotation: number;

  getHitbox(): IHitbox;


  updateAsteroids(width: number, height: number): void;

  drawAsteroid(context: CanvasRenderingContext2D): void;
}
