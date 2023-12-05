import {Bullet} from "./Bullet";

export class Spaceship{
  private x: number;
  private y: number;
  private speed: number;
  private readonly angle: number;
  private rotation: number;
  private moving: boolean;
  private bullets: Bullet[] = [];

  constructor(x: number, y: number, speed: number, angle:number, rotation:number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.rotation = rotation;
    this.moving = false;
  }


  updateSpaceship(pressedKeys: Set<string>, width: number, height: number) {
    this.rotate(pressedKeys);
    this.move(pressedKeys, width, height);
  }

  drawSpaceship(context: CanvasRenderingContext2D) {
    // Save the current transformation state
    context.save();

    //translate to the center of the spaceship
    context.translate(this.x, this.y);

    //apply the rotation
    context.rotate(this.rotation);



    //draw the spaceship
    context.beginPath();


    context.moveTo(-15, -37.5);
    context.lineTo(0, 0);
    context.lineTo(15, -37.5);
    context.moveTo(-11, -27.5);
    context.lineTo(11, -27.5);
    context.lineWidth = 2;
    context.strokeStyle = '#666666';
    context.stroke();

    context.restore();
  }

  drawThrust(context: CanvasRenderingContext2D) {
    if(!this.moving) return;
    context.save();

    context.translate(this.x, this.y);

    context.rotate(this.rotation);
    context.beginPath();
    context.moveTo(0, -27.5);
    context.bezierCurveTo(-5, -27.5, 0, -57.5, 5, -27.5);
    context.fillStyle = '#FF0000';
    context.fill();

    context.restore();
  }



  private move(pressedKeys: Set<string>, width: number, height: number) {
    const directionX = -Math.sin(this.rotation);
    const directionY = Math.cos(this.rotation);



    let movementX = this.speed * directionX;
    let movementY = this.speed * directionY;

    if (pressedKeys.has('ArrowUp')) {
      this.moving = true;
      if(this.speed < 7)
        this.speed += 0.5;
    }
    if (pressedKeys.has('ArrowDown')) {
      if(this.speed > 0)
        this.speed -= 0.1;
    }

    if( this.x > width) {
      this.x = 0;
    }
    if( this.x < 0) {
      this.x = width;
    }
    if( this.y > height) {
      this.y = 0;
    }
    if( this.y < 0) {
      this.y = height;
    }


    if( this.x >= 0 && this.x <= width ) {
      this.x += movementX;
    }

    if( this.y  >= 0 && this.y  <= height ) {
      this.y += movementY;
    }



    if(this.speed > 0) {
      this.speed -= 0.1;
    }
    else {
      this.speed = 0;
    }
  }

  rotate(pressedKeys: Set<string>){
    const rotationIncrement = 0.05;

    if (pressedKeys.has('ArrowLeft')) {
      this.rotation -= rotationIncrement;
    }

    if (pressedKeys.has('ArrowRight')) {
      this.rotation += rotationIncrement;
    }
  }

  shoot() {
    console.log(this.bullets.length);
    const speed = 5; // Adjust the bullet speed as needed
    const angle = this.rotation; // Use the spaceship's current rotation angle

    const bullet = new Bullet(this.x, this.y, speed, angle);
    this.bullets.push(bullet);
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


}
