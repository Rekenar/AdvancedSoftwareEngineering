import {RailGunMagazine} from "../magazine/RailGunMagazine";
import {BasePowerUp} from "./BasePowerUp";
import {ISpaceship} from "../spaceships/ISpaceship";

export class RailGunPowerUp extends BasePowerUp {
  constructor(x: number, y: number) {
    super(x, y);
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  apply(spaceship: ISpaceship) {
    spaceship.setMagazine(new RailGunMagazine(spaceship.getContext));
  }
}
