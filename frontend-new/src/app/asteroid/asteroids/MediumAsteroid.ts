import {BaseAsteroid} from "./BaseAsteroid";

export class MediumAsteroid extends BaseAsteroid {
  constructor(x: number, y: number, angle: number, rotation: number) {
    super(x, y, 2, angle, rotation, 3);
  }


}
