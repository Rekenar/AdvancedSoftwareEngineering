export interface IBullet {
  getX: number;
  getY: number;

  getHitbox(): Path2D;

  drawBullet(context: CanvasRenderingContext2D): void;

  updateBullet(width: number, height: number): boolean;
}
