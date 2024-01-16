import {Bullet} from "./Bullet";

export class Spaceship{
  private x: number;
  private y: number;
  private speed: number;
  private readonly angle: number;
  private rotation: number;
  private moving: boolean;
  private bullets: Bullet[] = [];
  private pieces: any[] = [];
  private shots:number;
  private isReloading: Boolean;
  private lives: number;
  private isDestroyed: boolean;

  constructor(x: number, y: number, speed: number, angle:number, rotation:number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.rotation = rotation;
    this.moving = false;
    this.shots = 10;
    this.isReloading = false;
    this.lives = 3;
    this.isDestroyed = false;
  }

  getHitbox(): Path2D {
    const path = new Path2D();
    path.arc(this.x, this.y, 19, 0, 2 * Math.PI);
    return path;
  }


  updateSpaceship(pressedKeys: Set<string>, width: number, height: number) {
    if(this.isDestroyed) return;
    this.rotate(pressedKeys);
    this.move(pressedKeys, width, height);
    this.bullets.forEach(bullet => {
      if(bullet.updateBullet(width, height))
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
    });
  }



  draw(context: CanvasRenderingContext2D) {

    if(this.isDestroyed) {
      setTimeout(() => this.isDestroyed = false, 2000);
    }else{
      this.drawSpaceship(context);
      this.drawThrust(context);
    }

    this.drawAmmunition(context);
    this.drawLives(context);
    this.bullets.forEach(bullet => bullet.drawBullet(context));
  }

  private drawSpaceship(context: CanvasRenderingContext2D) {
    let pathSideRight = new Path2D();
    let pathSideLeft = new Path2D();
    let pathSideMiddle = new Path2D();
    // Save the current transformation state
    context.save();

    //translate to the center of the spaceship
    context.translate(this.x, this.y);

    //apply the rotation
    context.rotate(this.rotation);

    //draw the spaceship
    context.beginPath();

    pathSideRight.moveTo(-15, -37.5);
    pathSideRight.lineTo(0, 0);

    pathSideLeft.moveTo(15, -37.5);
    pathSideLeft.lineTo(0, 0);

    pathSideMiddle.moveTo(-11, -27.5);
    pathSideMiddle.lineTo(11, -27.5);


    context.lineWidth = 2;
    context.strokeStyle = '#666666';
    context.stroke(pathSideRight);
    context.stroke(pathSideLeft);
    context.stroke(pathSideMiddle);
    context.restore();
  }


  private drawThrust(context: CanvasRenderingContext2D) {
    if(!this.moving) return;
    let path = new Path2D();
    context.save();

    context.translate(this.x, this.y);

    context.rotate(this.rotation);

    path.moveTo(0, -27.5);
    path.bezierCurveTo(-5, -27.5, 0, -57.5, 5, -27.5);
    path.closePath();
    context.fillStyle = '#FF0000';
    context.fill(path);

    context.restore();
  }

  private drawAmmunition(context: CanvasRenderingContext2D ) {
    for(let i = 0; i < this.getShots; i++) {
      context.fillStyle = '#FFFFFF';
      let path = new Path2D();
      path.moveTo(15 + i * 10, 30)
      path.arc(15 + i * 15, 30, 5, 0, 2 * Math.PI);
      context.fill(path);
    }
  }



  private drawLives(context:CanvasRenderingContext2D) {
    let c1DX = 15  * 0.968;  // delta X of control point 1
    let c1DY = 15 * 0.672;  // delta Y of control point 1

    let c2DX = 15  * 0.281;  // delta X of control point 2
    let c2DY = 15 * 1.295;  // delta Y of control point 2

    let teDY = 15 * 0.850;  // delta Y of top endpoint

    for(let i = 0; i < this.getLives; i++) {
      context.fillStyle = '#ff0000';
      let beX = 15+i*20;  // bottom endpoint X
      let beY = 20;     // bottom endpoint Y
      let path = new Path2D();
      path.moveTo(beX, beY);
      path.bezierCurveTo(beX - c1DX, beY - c1DY, beX - c2DX, beY - c2DY, beX, beY-teDY);
      path.bezierCurveTo(beX + c2DX, beY - c2DY, beX + c1DX, beY - c1DY, beX, beY);
      context.fill(path);
    }
  }





  private move(pressedKeys: Set<string>, width: number, height: number) {
    const directionX = -Math.sin(this.rotation);
    const directionY = Math.cos(this.rotation);


    let movementX = this.speed * directionX;
    let movementY = this.speed * directionY;

    if (pressedKeys.has('ArrowUp')) {
      this.moving = true;
      if (this.speed < 7) this.speed += 0.5;
    }
    if (pressedKeys.has('ArrowDown') && this.speed > 0) {
      this.speed -= 0.1;
    }

    this.x = (this.x + movementX + width) % width;
    this.y = (this.y + movementY + height) % height;


    if (this.speed > 0) {
      this.speed -= 0.1;
    } else {
      this.speed = 0;
    }
  }

  rotate(pressedKeys: Set<string>){
    const rotationIncrement = 0.07;

    if (pressedKeys.has('ArrowLeft')) {
      this.rotation -= rotationIncrement;
    }

    if (pressedKeys.has('ArrowRight')) {
      this.rotation += rotationIncrement;
    }
  }

  shoot() {
    if(!this.isReloading){
      const speed = 10; // Adjust the bullet speed as needed
      const angle = this.rotation; // Use the spaceship's current rotation angle

      const bullet = new Bullet(this.x, this.y, speed, angle);
      this.bullets.push(bullet);
      this.shots--;
      if(this.shots <= 0 ){
        this.isReloading = true;
        setTimeout(() => {
          this.shots = 10;
          this.isReloading = false;
        }, 1000);
      }
    }
  }

  loseLife() {
    if (this.lives > 0) {
      this.isDestroyed = true;
      let path = new Path2D();

      path.moveTo(0, -27.5);
      path.lineTo(10, -27.5);





      this.lives--;

    }
  }






  get getX(): number {
    return this.x;
  }

  get getY(): number {
    return this.y;
  }

  get getRotation(): number {
    return this.rotation;
  }

  get getSpeed(): number {
    return this.speed;
  }

  get getAngle(): number {
    return this.angle;
  }

  get getBullets(): Bullet[] {
    return this.bullets;
  }

  setMoving(value: boolean):void {
    this.moving = value;
  }

  get getShots(): number {
    return this.shots;
  }


  resetSpaceship(width: number, height: number) {
    this.x = width / 2;
    this.y = height / 2;
  }

  get getLives(): number {
    return this.lives;
  }

  set setLives(value: number) {
    this.lives = value;
  }
}
