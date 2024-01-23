import {BasePowerUp} from "./BasePowerUp";
import {TripleMagazine} from "../magazine/TripleMagazine";
import {ISpaceship} from "../spaceships/ISpaceship";

export class TripleMagazinePowerUp extends BasePowerUp {
  constructor(x: number, y: number) {
    super(x, y);
  }
  

  override apply(spaceship: ISpaceship) {
    spaceship.setMagazine(new TripleMagazine(spaceship.getContext));
  }
}
