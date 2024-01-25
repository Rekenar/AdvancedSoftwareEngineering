import {BaseAsteroid} from "./BaseAsteroid";

export class SmallAsteroid extends BaseAsteroid {
  constructor(x: number, y: number, angle: number, rotation: number) {
    super(x, y, 3, angle, rotation, 2);
  }


}
