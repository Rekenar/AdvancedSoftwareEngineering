import {BaseSpaceship} from "./BaseSpaceship";
import {CircleHitbox} from "../hitboxes/CircleHitbox";
import {NormalMagazine} from "../magazine/NormalMagazine";

export class NormalSpaceship extends BaseSpaceship {

  private hitbox: CircleHitbox;

  constructor(context: CanvasRenderingContext2D, x: number, y: number, speed: number, rotation: number) {
    super(context, x, y, speed, rotation, new NormalMagazine(context));
    this.hitbox = new CircleHitbox(x, y, 20);
  }

  override draw() {
    super.draw();
  }

  override updateSpaceship(pressedKeys: Set<string>, width: number, height: number) {
    this.hitbox.setX = this.getX;
    this.hitbox.setY = this.getY;
    super.updateSpaceship(pressedKeys, width, height);
  }

  override getHitbox() {
    return this.hitbox;
  }


}
