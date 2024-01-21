export interface IAsteroid {
  getX: number;
  getY: number;
  getSpeed: number;
  getAngle: number;
  getRotation: number;

  getHitbox(): Path2D;

  collidesWith(otherObject: {
    getHitbox(): Path2D,
    getX: number,
    getY: number
  }, context: CanvasRenderingContext2D): boolean;

  updateAsteroids(width: number, height: number): void;

  drawAsteroid(context: CanvasRenderingContext2D): void;
}
