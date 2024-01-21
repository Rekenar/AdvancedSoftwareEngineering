import {BaseSpaceship} from "./BaseSpaceship";

export class NormalSpaceship extends BaseSpaceship {
  constructor(context: CanvasRenderingContext2D, x: number, y: number, speed: number, rotation: number) {
    super(context, x, y, speed, rotation);
  }
}
