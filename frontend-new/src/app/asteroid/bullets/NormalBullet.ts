import {BaseBullet} from "./BaseBullet";

export class NormalBullet extends BaseBullet {
  constructor(x: number, y: number, speed: number, angle: number) {
    super(x, y, speed, angle);
  }

}
