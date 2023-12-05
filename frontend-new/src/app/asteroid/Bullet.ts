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

  drawBullet(context: CanvasRenderingContext2D) {
      context.fillStyle = '#FFFFFF';
      context.beginPath();
      context.arc(this.x, this.y, 3, 0, 2 * Math.PI);
      context.fill();
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
