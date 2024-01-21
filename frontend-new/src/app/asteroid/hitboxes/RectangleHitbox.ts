import {IHitbox} from "./IHitbox";
import {CircleHitbox} from "./CircleHitbox";
import {BaseHitbox} from "./BaseHitbox";

export class RectangleHitbox extends BaseHitbox {
  private width: number;
  private height: number;

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y);
    this.width = width;
    this.height = height;
  }

  get getWidth(): number {
    return this.width;
  }

  get getHeight(): number {
    return this.height;
  }

  intersects(otherHitbox: IHitbox): boolean {
    if (otherHitbox instanceof RectangleHitbox) {
      return !(otherHitbox.x > this.x + this.width ||
        otherHitbox.x + otherHitbox.width < this.x ||
        otherHitbox.y > this.y + this.height ||
        otherHitbox.y + otherHitbox.height < this.y);
    }
    if (otherHitbox instanceof CircleHitbox) {
      let deltaX = otherHitbox.getX - Math.max(this.x, Math.min(otherHitbox.getX, this.x + this.width));
      let deltaY = otherHitbox.getY - Math.max(this.y, Math.min(otherHitbox.getY, this.y + this.height));
      return (deltaX * deltaX + deltaY * deltaY) < (otherHitbox.getRadius * otherHitbox.getRadius);
    }

    return false;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = 'red';
    context.strokeRect(this.x, this.y, this.width, this.height);
  }
}
