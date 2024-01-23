import {IHitbox} from "../hitboxes/IHitbox";
import {ISpaceship} from "../spaceships/ISpaceship";

export interface IPowerUp {


  draw(context: CanvasRenderingContext2D): void

  apply(spaceship: ISpaceship): void;

  getHitbox(): IHitbox;

  createIcon(size: number): Path2D;
}
