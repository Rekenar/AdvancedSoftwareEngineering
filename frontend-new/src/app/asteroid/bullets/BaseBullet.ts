import {IBullet} from "./IBullet";
import {IHitbox} from "../hitboxes/IHitbox";
import {CircleHitbox} from "../hitboxes/CircleHitbox";

export abstract class BaseBullet implements IBullet {
  protected x: number;
  protected y: number;
  protected readonly speed: number;
  protected angle: number;
  protected debug: boolean = false;
  private hitbox: IHitbox;

  protected constructor(x: number, y: number, speed: number, angle: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.hitbox = new CircleHitbox(this.x, this.y, 3);
    this.debug = true;
  }

  get getX(): number {
    return this.x;
  }

  get getY(): number {
    return this.y;
  }

  drawBullet(context: CanvasRenderingContext2D) {
    let path = new Path2D()
    path.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    context.fillStyle = '#FFFFFF';
    context.fill(path);
    if (this.debug)
      this.hitbox.draw(context);
  }

  getHitbox(): IHitbox {
    return this.hitbox;
  }

  updateBullet(width: number, height: number) {
    this.x -= Math.sin(this.angle) * this.speed;
    this.y += Math.cos(this.angle) * this.speed;
    this.hitbox.setX = this.x;
    this.hitbox.setY = this.y;
    return (this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }


}
