import {IMagazine} from "../magazine/IMagazine";
import {IHitbox} from "../hitboxes/IHitbox";

export interface ISpaceship {
  getX: number;

  getY: number;

  getRotation: number;

  getSpeed: number;

  getMaxSpeed: number;

  getBullets: IMagazine;

  getLives: number;

  getIsDestroyed: boolean;

  getMoving: boolean;

  getReloading: boolean;

  getMagazine: IMagazine;

  getKilled: boolean;

  setMoving: boolean;

  getContext: CanvasRenderingContext2D;

  setSpeed(speed: number): void;

  setMaxSpeed(maxSpeed: number): void;

  setMagazineCapacity(): void;

  getMagazineCapacity(): number;

  setMagazine(magazine: IMagazine): void;

  getHitbox(): IHitbox;

  draw(): void;

  updateSpaceship(pressedKeys: Set<string>, width: number, height: number): void;

  shoot(): void;

  loseLife(width: number, height: number): void;

  resetSpaceship(width: number, height: number): void;
}
