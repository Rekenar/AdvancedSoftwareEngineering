import {BasePowerUp} from "./BasePowerUp";
import {TripleMagazine} from "../magazine/TripleMagazine";
import {ISpaceship} from "../spaceships/ISpaceship";

export class TripleMagazinePowerUp extends BasePowerUp {
  constructor(x: number, y: number) {
    super(x, y);
  }

  override draw(context: CanvasRenderingContext2D): void {
    super.draw(context)
    context.lineWidth = 2;
    context.strokeStyle = '#666666';
    context.stroke(this.createIcon(15));
  }

  createIcon(size: number) {
    const icon = new Path2D();

    // Parameters for the arrow design
    const arrowLength = size / 2;
    const arrowWidth = size / 4;

    // Draw left arrow
    icon.moveTo(this.getX - arrowLength, this.getY);
    icon.lineTo(this.getX - size, this.getY);
    icon.lineTo(this.getX - size + arrowWidth, this.getY - arrowWidth);
    icon.moveTo(this.getX - size, this.getY);
    icon.lineTo(this.getX - size + arrowWidth, this.getY + arrowWidth);

    // Draw upward arrow
    icon.moveTo(this.getX, this.getY - arrowLength);
    icon.lineTo(this.getX, this.getY - size);
    icon.lineTo(this.getX - arrowWidth, this.getY - size + arrowWidth);
    icon.moveTo(this.getX, this.getY - size);
    icon.lineTo(this.getX + arrowWidth, this.getY - size + arrowWidth);

    // Draw right arrow
    icon.moveTo(this.getX + arrowLength, this.getY);
    icon.lineTo(this.getX + size, this.getY);
    icon.lineTo(this.getX + size - arrowWidth, this.getY - arrowWidth);
    icon.moveTo(this.getX + size, this.getY);
    icon.lineTo(this.getX + size - arrowWidth, this.getY + arrowWidth);

    return icon;
  }


  override apply(spaceship: ISpaceship) {
    spaceship.setMagazine(new TripleMagazine(spaceship.getContext));
  }
}
