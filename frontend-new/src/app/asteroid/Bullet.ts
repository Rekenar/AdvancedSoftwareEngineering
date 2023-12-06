export class Bullet {
  private x: number;
  private y: number;
  private readonly speed: number;
  private readonly angle: number;

  constructor(x: number, y: number, speed: number,angle:number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
  }

  getHitbox(): Path2D {
    const path = new Path2D();
    path.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    return path;
  }

  drawBullet(context: CanvasRenderingContext2D) {
    let path = new Path2D()
    path.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    context.fillStyle = '#FFFFFF';
    context.fill(path);
  }


  updateBullet(width: number, height: number) {
    this.x -= Math.sin(this.angle) * this.speed;
    this.y += Math.cos(this.angle) * this.speed;
    return (this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }


  get getX(): number {
    return this.x;
  }

  get getY(): number {
    return this.y;
  }

}
