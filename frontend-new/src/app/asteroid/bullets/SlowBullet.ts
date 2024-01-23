import {BaseBullet} from "./BaseBullet";

export class SlowBullet extends BaseBullet {
  constructor(x: number, y: number, angle: number) {
    super(x, y, 1, angle);
  }

}
