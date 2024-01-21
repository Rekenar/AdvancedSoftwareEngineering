import {IHitbox} from "./IHitbox";

export abstract class BaseHitbox implements IHitbox {
  protected x: number;
  protected y: number;

  protected constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get getX(): number {
    return this.x;
  }

  get getY(): number {
    return this.y;
  }

  set setX(x: number) {
    this.x = x;
  }

  set setY(y: number) {
    this.y = y;
  }

  abstract intersects(otherHitbox: IHitbox): boolean

  abstract draw(context: CanvasRenderingContext2D): void;
}
