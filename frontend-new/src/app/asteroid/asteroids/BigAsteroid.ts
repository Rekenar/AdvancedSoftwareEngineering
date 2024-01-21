import {BaseAsteroid} from "./BaseAsteroid";

export class BigAsteroid extends BaseAsteroid {
  constructor(x: number, y: number, speed: number, angle: number, rotation: number) {
    super(x, y, speed, angle, rotation, 3);
  }


}
