import {ISpaceship} from "./ISpaceship";
import {SpaceshipRenderer} from "./utility/SpaceshipRenderer";
import {IMagazine} from "../magazine/IMagazine";
import {SpaceshipMovementController} from "./utility/SpaceshipMovementController";
import {SpaceshipStatusManager} from "./utility/SpaceshipStatusManager";
import {NormalMagazine} from "../magazine/NormalMagazine";

export abstract class BaseSpaceship implements ISpaceship {
  protected spaceshipRenderer: SpaceshipRenderer;
  protected spaceshipMovementController: SpaceshipMovementController;
  protected magazine: IMagazine;
  private statusManager: SpaceshipStatusManager;

  protected constructor(context: CanvasRenderingContext2D, x: number, y: number, speed: number, rotation: number) {
    this.spaceshipMovementController = new SpaceshipMovementController(x, y, speed, rotation);
    this.spaceshipRenderer = new SpaceshipRenderer(context);
    this.statusManager = new SpaceshipStatusManager();
    this.magazine = new NormalMagazine(context);
  }


  get getX(): number {
    return this.spaceshipMovementController.getX();
  }

  get getY(): number {
    return this.spaceshipMovementController.getY();
  }

  get getRotation(): number {
    return this.spaceshipMovementController.getRotation();
  }

  get getSpeed(): number {
    return this.spaceshipMovementController.getSpeed();
  }

  get getBullets(): IMagazine {
    return this.magazine;
  }

  get getLives(): number {
    return this.statusManager.getLives();
  }

  get getIsDestroyed(): boolean {
    return this.statusManager.getIsDestroyed();
  }

  get getReloading(): boolean {
    return this.statusManager.getReloading();
  }

  get getShots(): number {
    return this.statusManager.getShots();
  }

  get getMoving(): boolean {
    return this.statusManager.getMoving();
  }

  get getMagazine(): IMagazine {
    return this.magazine;
  }

  get getKilled(): boolean {
    return this.statusManager.getKilled();
  }

  set setMoving(moving: boolean) {
    this.statusManager.setMoving(moving);
  }


  getHitbox(): Path2D {
    const path = new Path2D();
    path.arc(this.getX, this.getY, 19, 0, 2 * Math.PI);
    return path;
  }


  updateSpaceship(pressedKeys: Set<string>, width: number, height: number): void {
    this.magazine.updateBullets();
    if (this.statusManager.getKilled()) return;

    this.spaceshipMovementController.move(pressedKeys, width, height);
    this.spaceshipMovementController.rotate(pressedKeys);


    if (this.getShots <= 0 && !this.statusManager.getReloading()) {
      this.statusManager.reload();
    }
  }


  shoot(): void {
    if (this.statusManager.getKilled()) return;
    if (!this.statusManager.getReloading() && this.getShots > 0) {
      this.magazine.shoot(this.getX, this.getY, this.getRotation);
      this.statusManager.shoot();
    }
  }

  draw(): void {
    this.spaceshipRenderer.draw(this.getKilled, this.getX, this.getY, this.getRotation, this.getMoving, this.getLives, this.getShots);
    this.magazine.drawBullets();
  }

  loseLife(width: number, height: number): void {
    if (this.statusManager.getKilled()) return;
    this.statusManager.loseLife();
    setTimeout(() => {
      this.resetSpaceship(width, height);
    }, 2000);

  }

  resetSpaceship(width: number, height: number): void {
    this.statusManager.resetStatus();
    this.spaceshipMovementController.resetPosition(width, height);
  }

}
