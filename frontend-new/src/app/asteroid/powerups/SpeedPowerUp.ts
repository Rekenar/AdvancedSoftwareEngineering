import {BasePowerUp} from "./BasePowerUp";
import {ISpaceship} from "../spaceships/ISpaceship";

export class SpeedPowerUp extends BasePowerUp {
  constructor(x: number, y: number) {
    super(x, y);
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, this.width, this.height);
  }


  override apply(spaceship: ISpaceship) {
    spaceship.setSpeed(spaceship.getSpeed + 1);
  }

  override createIcon(size: number) {
    const icon = new Path2D();

    // Parameters for the arrow design
    const arrowLength = size / 2;
    const arrowWidth = size / 4;

    // Draw left arrow
    icon.moveTo(this.x - arrowLength, this.y);
    icon.lineTo(this.x - size, this.y);
    icon.lineTo(this.x - size + arrowWidth, this.y - arrowWidth);
    icon.moveTo(this.x - size, this.y);
    icon.lineTo(this.x - size + arrowWidth, this.y + arrowWidth);

    // Draw upward arrow
    icon.moveTo(this.x, this.y - arrowLength);
    icon.lineTo(this.x, this.y - size);
    icon.lineTo(this.x - arrowWidth, this.y - size + arrowWidth);
    icon.moveTo(this.x, this.y - size);
    icon.lineTo(this.x + arrowWidth, this.y - size + arrowWidth);

    // Draw right arrow
    icon.moveTo(this.x + arrowLength, this.y);
    icon.lineTo(this.x + size, this.y);
    icon.lineTo(this.x + size - arrowWidth, this.y - arrowWidth);
    icon.moveTo(this.x + size, this.y);
    icon.lineTo(this.x + size - arrowWidth, this.y + arrowWidth);

    return icon;
  }
}
