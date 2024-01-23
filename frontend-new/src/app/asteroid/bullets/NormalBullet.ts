import {BaseBullet} from "./BaseBullet";

export class NormalBullet extends BaseBullet {
  constructor(x: number, y: number, angle: number) {
    super(x, y, 5, angle);
  }

}
