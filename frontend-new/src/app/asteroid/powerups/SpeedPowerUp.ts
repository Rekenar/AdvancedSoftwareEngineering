import {BasePowerUp} from "./BasePowerUp";
import {ISpaceship} from "../spaceships/ISpaceship";

export class SpeedPowerUp extends BasePowerUp {
  constructor(x: number, y: number) {
    super(x, y);
  }

  override draw(context: CanvasRenderingContext2D): void {
    super.draw(context);

    context.beginPath();
    context.moveTo(this.x + 15, this.y + 10);
    context.lineTo(this.x + 15, this.y + 30);
    context.lineTo(this.x + 30, this.y + 20);
    context.closePath()

    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.stroke();

  }


  override apply(spaceship: ISpaceship) {
    spaceship.setMaxSpeed(spaceship.getMaxSpeed + 1);
  }

}
