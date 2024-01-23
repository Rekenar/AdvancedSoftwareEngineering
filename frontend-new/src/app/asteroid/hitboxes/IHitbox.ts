export interface IHitbox {
  getX: number;
  getY: number;
  setX: number;
  setY: number;

  intersects(otherHitbox: IHitbox): boolean;

  draw(context: CanvasRenderingContext2D): void;
}
