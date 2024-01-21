import {BaseAsteroid} from "./BaseAsteroid";

export class BigAsteroid extends BaseAsteroid {
  constructor(x: number, y: number, angle: number, rotation: number) {
    super(x, y, 1, angle, rotation, 4);
  }
}
