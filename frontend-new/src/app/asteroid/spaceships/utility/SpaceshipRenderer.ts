export class SpaceshipRenderer {
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  draw(killed: boolean, x: number, y: number, rotation: number, moving: boolean, lives: number, shots: number) {
    if (!killed) {
      this.drawSpaceship(x, y, rotation);
      this.drawThrust(x, y, rotation, moving);
    }

    this.drawAmmunition(shots);
    this.drawLives(lives);
  }

  private drawSpaceship(x: number, y: number, rotation: number) {
    let pathSideRight = new Path2D();
    let pathSideLeft = new Path2D();
    let pathSideMiddle = new Path2D();
    // Save the current transformation state
    this.context.save();

    //translate to the center of the spaceship
    this.context.translate(x, y);
    //apply the rotation
    this.context.rotate(rotation);

    //draw the spaceship
    this.context.beginPath();

    pathSideRight.moveTo(-15, -47.5);
    pathSideRight.lineTo(0, -15);

    pathSideLeft.moveTo(15, -47.5);
    pathSideLeft.lineTo(0, -15);

    pathSideMiddle.moveTo(-10, -37.5);
    pathSideMiddle.lineTo(10, -37.5);


    this.context.lineWidth = 2;
    this.context.strokeStyle = '#666666';
    this.context.stroke(pathSideRight);
    this.context.stroke(pathSideLeft);
    this.context.stroke(pathSideMiddle);
    this.context.restore();
  }


  private drawThrust(x: number, y: number, rotation: number, moving: boolean) {
    if (!moving) return;
    let path = new Path2D();
    this.context.save();

    this.context.translate(x, y);

    this.context.rotate(rotation);

    path.moveTo(0, -37.5);
    path.bezierCurveTo(-7.5, -37.5, 5, -67.5, 7.5, -37.5);
    path.closePath();
    this.context.fillStyle = '#FF0000';
    this.context.fill(path);

    this.context.restore();
  }

  private drawAmmunition(shots: number) {
    for (let i = 0; i < shots; i++) {
      this.context.fillStyle = '#FFFFFF';
      let path = new Path2D();
      path.moveTo(15 + i * 10, 30)
      path.arc(15 + i * 15, 30, 5, 0, 2 * Math.PI);
      this.context.fill(path);
    }
  }

  private drawLives(lives: number) {
    let c1DX = 15 * 0.968;  // delta X of control point 1
    let c1DY = 15 * 0.672;  // delta Y of control point 1

    let c2DX = 15 * 0.281;  // delta X of control point 2
    let c2DY = 15 * 1.295;  // delta Y of control point 2

    let teDY = 15 * 0.850;  // delta Y of top endpoint

    for (let i = 0; i < lives; i++) {
      this.context.fillStyle = '#ff0000';
      let beX = 15 + i * 20;  // bottom endpoint X
      let beY = 20;     // bottom endpoint Y
      let path = new Path2D();
      path.moveTo(beX, beY);
      path.bezierCurveTo(beX - c1DX, beY - c1DY, beX - c2DX, beY - c2DY, beX, beY - teDY);
      path.bezierCurveTo(beX + c2DX, beY - c2DY, beX + c1DX, beY - c1DY, beX, beY);
      this.context.fill(path);
    }
  }
}
