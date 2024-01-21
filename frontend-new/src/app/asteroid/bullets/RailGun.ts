import {BaseBullet} from "./BaseBullet";

export class RailGun extends BaseBullet {
  constructor(x: number, y: number, angle: number,) {
    super(x, y, 10, angle);
  }

  override drawBullet(context: CanvasRenderingContext2D) {
    let path = new Path2D();
    path.moveTo(this.x, this.y);
    path.lineTo(this.x - Math.sin(this.angle) * 500, this.y + Math.cos(this.angle) * 500);
    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 3;
    context.stroke(path);
    //super.drawBullet(context);
  }

  
}
