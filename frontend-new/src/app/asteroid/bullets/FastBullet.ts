import {BaseBullet} from "./BaseBullet";

export class FastBullet extends BaseBullet {
  constructor(x: number, y: number, angle: number) {
    super(x, y, 10, angle);
  }

}
