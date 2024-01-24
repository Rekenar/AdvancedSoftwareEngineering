import {BasePowerUp} from "./BasePowerUp";
import {TripleMagazine} from "../magazine/TripleMagazine";
import {ISpaceship} from "../spaceships/ISpaceship";

export class TripleMagazinePowerUp extends BasePowerUp {
  constructor(x: number, y: number) {
    super(x, y);
  }


  override apply(spaceship: ISpaceship) {
    spaceship.setMagazine(new TripleMagazine(spaceship.getContext));
  }

  override draw(context: CanvasRenderingContext2D): void {
    super.draw(context);
    this.drawBullet(context, this.x + 20, this.y + 15); // Top bullet
    this.drawBullet(context, this.x + 10, this.y + 25); // Bottom left bullet
    this.drawBullet(context, this.x + 30, this.y + 25);  // Bottom right bullet
  }

  drawBullet(context: CanvasRenderingContext2D, x: number, y: number) {
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI, false); // Draw a circle for the bullet
    context.fillStyle = 'white';
    context.fill();
  }

  // Draw three bullets in a triangular formation

}
