import {BasePowerUp} from "./BasePowerUp";
import {ISpaceship} from "../spaceships/ISpaceship";

export class MagazineCapacityPowerUp extends BasePowerUp {
  constructor(x: number, y: number) {
    super(x, y);
  }

  override draw(context: CanvasRenderingContext2D): void {
    super.draw(context);
    // Draw +1 Text
    context.font = '20px Arial';
    context.fillStyle = 'white';
    context.fillText('+1', this.x + 20, this.y + 25);
  }

  apply(spaceship: ISpaceship) {
    spaceship.setMagazineCapacity();
  }
}
