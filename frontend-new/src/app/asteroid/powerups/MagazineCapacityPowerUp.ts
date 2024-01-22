import {BasePowerUp} from "./BasePowerUp";
import {ISpaceship} from "../spaceships/ISpaceship";

export class MagazineCapacityPowerUp extends BasePowerUp {
  constructor(x: number, y: number) {
    super(x, y);
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  apply(spaceship: ISpaceship) {
    spaceship.setMagazineCapacity();
  }
}
