import {IBullet} from "./IBullet";

export abstract class BaseBullet implements IBullet {
  protected x: number;
  protected y: number;
  protected readonly speed: number;
  protected readonly angle: number;

  protected constructor(x: number, y: number, speed: number, angle: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
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
  }

  getHitbox(): Path2D {
    const path = new Path2D();
    path.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    return path;
  }

  updateBullet(width: number, height: number) {
    this.x -= Math.sin(this.angle) * this.speed;
    this.y += Math.cos(this.angle) * this.speed;
    return (this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }


}
