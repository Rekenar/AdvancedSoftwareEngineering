import {BaseHitbox} from "./BaseHitbox";
import {IHitbox} from "./IHitbox";
import {RectangleHitbox} from "./RectangleHitbox";


export class CircleHitbox extends BaseHitbox {

  private radius: number;

  constructor(x: number, y: number, radius: number) {
    super(x, y);
    this.radius = radius;
  }

  get getRadius(): number {
    return this.radius;
  }

  intersects(otherHitbox: IHitbox): boolean {
    if (otherHitbox instanceof CircleHitbox) {
      const dx = this.x - otherHitbox.x;
      const dy = this.y - otherHitbox.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < this.radius + otherHitbox.radius;
    } else if (otherHitbox instanceof RectangleHitbox) {
      let deltaX = this.x - Math.max(otherHitbox.getX, Math.min(this.x, otherHitbox.getX + otherHitbox.getWidth));
      let deltaY = this.y - Math.max(otherHitbox.getY, Math.min(this.y, otherHitbox.getY + otherHitbox.getHeight));
      return (deltaX * deltaX + deltaY * deltaY) < (this.radius * this.radius);
    }

    return false;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.strokeStyle = 'blue';
    context.stroke();
  }


}
