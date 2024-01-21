import {IAsteroid} from "./IAsteroid";
import {IHitbox} from "../hitboxes/IHitbox";
import {CircleHitbox} from "../hitboxes/CircleHitbox";

export abstract class BaseAsteroid implements IAsteroid {
  protected x: number;
  protected y: number;
  protected readonly speed: number;
  protected readonly angle: number;
  protected rotation: number;
  protected readonly sizeFactor: number;


  protected constructor(x: number, y: number, speed: number, angle: number, rotation: number, sizeFactor: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.rotation = rotation;
    this.sizeFactor = sizeFactor;
  }

  get getX(): number {
    return this.x;
  }

  get getY(): number {
    return this.y;
  }

  get getSpeed(): number {
    return this.speed;
  }

  get getAngle(): number {
    return this.angle;
  }

  get getRotation(): number {
    return this.rotation;
  }

  get getSizeFactor(): number {
    return this.sizeFactor;
  }

  getHitbox(): IHitbox {
    return new CircleHitbox(this.x, this.y, 40 * this.sizeFactor)
  }


  updateAsteroids(width: number, height: number) {
    let movementX = Math.sin(this.angle) * this.speed;
    let movementY = Math.cos(this.angle) * this.speed;


    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }


    if (this.x >= 0 && this.x <= width) {
      this.x += movementX;
    }

    if (this.y >= 0 && this.y <= height) {
      this.y += movementY;
    }


    this.rotation += 0.02;
  }


  drawAsteroid(context: CanvasRenderingContext2D) {
    let path = new Path2D();


    path = this.drawAsteroidPath(this.sizeFactor);


    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.strokeStyle = '#666666';
    context.lineWidth = 4;
    context.stroke(path);
    context.restore();

  }


  private drawAsteroidPath(scalingFactor: number): Path2D {

    const path = new Path2D();

    //Top Line
    path.moveTo(-10 * scalingFactor, -40 * scalingFactor);
    path.lineTo(10 * scalingFactor, -40 * scalingFactor);

    //Top to right
    path.lineTo(17 * scalingFactor, -38 * scalingFactor);
    path.lineTo(23 * scalingFactor, -37 * scalingFactor);
    path.lineTo(30 * scalingFactor, -30 * scalingFactor);
    path.lineTo(33 * scalingFactor, -23 * scalingFactor);
    path.lineTo(37 * scalingFactor, -17 * scalingFactor);

    //Right
    path.lineTo(40 * scalingFactor, -10 * scalingFactor);
    path.lineTo(40 * scalingFactor, 10 * scalingFactor);

    //Right to bottom
    path.lineTo(37 * scalingFactor, 17 * scalingFactor);
    path.lineTo(33 * scalingFactor, 23 * scalingFactor);
    path.lineTo(30 * scalingFactor, 30 * scalingFactor);
    path.lineTo(23 * scalingFactor, 33 * scalingFactor);
    path.lineTo(17 * scalingFactor, 37 * scalingFactor);

    //Bottom
    path.lineTo(10 * scalingFactor, 40 * scalingFactor);
    path.lineTo(-10 * scalingFactor, 40 * scalingFactor);

    //Bottom to left
    path.lineTo(-17 * scalingFactor, 38 * scalingFactor);
    path.lineTo(-23 * scalingFactor, 37 * scalingFactor);
    path.lineTo(-30 * scalingFactor, 30 * scalingFactor);
    path.lineTo(-33 * scalingFactor, 23 * scalingFactor);
    path.lineTo(-37 * scalingFactor, 17 * scalingFactor);

    //Left
    path.lineTo(-40 * scalingFactor, 10 * scalingFactor);
    path.lineTo(-40 * scalingFactor, -10 * scalingFactor);

    //Left to top
    path.lineTo(-37 * scalingFactor, -17 * scalingFactor);
    path.lineTo(-33 * scalingFactor, -23 * scalingFactor);
    path.lineTo(-30 * scalingFactor, -30 * scalingFactor);
    path.lineTo(-23 * scalingFactor, -33 * scalingFactor);
    path.lineTo(-17 * scalingFactor, -37 * scalingFactor);


    path.closePath();

    return path;
  }
}
