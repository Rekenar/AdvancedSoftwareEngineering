import {IMagazine} from "../magazine/IMagazine";

export interface ISpaceship {
  getX: number;

  getY: number;

  getRotation: number;

  getSpeed: number;

  getBullets: IMagazine;

  getLives: number;

  getIsDestroyed: boolean;

  getMoving: boolean;

  getReloading: boolean;

  getMagazine: IMagazine;

  getKilled: boolean;

  setMoving: boolean;

  getHitbox(): Path2D;

  draw(): void;

  updateSpaceship(pressedKeys: Set<string>, width: number, height: number): void;

  shoot(): void;

  loseLife(width: number, height: number): void;

  resetSpaceship(width: number, height: number): void;
}
