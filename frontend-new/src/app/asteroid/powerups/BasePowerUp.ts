import {IPowerUp} from "./IPowerUp";
import {IHitbox} from "../hitboxes/IHitbox";
import {RectangleHitbox} from "../hitboxes/RectangleHitbox";
import {ISpaceship} from "../spaceships/ISpaceship";

export abstract class BasePowerUp implements IPowerUp {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected hitbox: IHitbox;

  protected constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.hitbox = new RectangleHitbox(x, y, this.width, this.height);
  }

  get getX(): number {
    return this.x;
  }

  get getY(): number {
    return this.y;
  }


  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fill();
  }

  abstract apply(spaceship: ISpaceship): void;

  getHitbox(): IHitbox {
    return this.hitbox;
  }

}
