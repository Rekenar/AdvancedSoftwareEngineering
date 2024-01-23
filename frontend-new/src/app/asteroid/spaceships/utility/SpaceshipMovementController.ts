export class SpaceshipMovementController {
  private rotation: number;
  private speed: number;
  private x: number;
  private y: number;
  private maxSpeed: number;

  constructor(x: number, y: number, speed: number, rotation: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.rotation = rotation;
    this.maxSpeed = 4;
  }

  rotate(pressedKeys: Set<string>) {
    const rotationIncrement = 0.07;

    if (pressedKeys.has('ArrowLeft')) {
      this.rotation -= rotationIncrement;
    }

    if (pressedKeys.has('ArrowRight')) {
      this.rotation += rotationIncrement;
    }
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getRotation(): number {
    return this.rotation;
  }

  getSpeed(): number {
    return this.speed;
  }

  getMaxSpeed(): number {
    return this.maxSpeed;
  }

  setRotation(rotation: number): void {
    this.rotation = rotation;
  }

  setSpeed(speed: number): void {
    this.speed = speed;
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  setMaxSpeed(maxSpeed: number): void {
    this.maxSpeed = maxSpeed;
  }

  setCoordinates(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  resetPosition(width: number, height: number) {
    this.x = width / 2;
    this.y = height / 2;
    this.speed = 0;
    this.rotation = 0;
  }

  move(pressedKeys: Set<string>, width: number, height: number) {
    const directionX = -Math.sin(this.rotation);
    const directionY = Math.cos(this.rotation);


    let movementX = this.speed * directionX;
    let movementY = this.speed * directionY;

    if (pressedKeys.has('ArrowUp')) {
      if (this.speed < this.maxSpeed) this.speed += 0.5;
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
}
