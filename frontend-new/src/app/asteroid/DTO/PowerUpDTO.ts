interface PowerUpDTO {
  x: number;
  y: number;
  type: number;
}

export class IncomingPowerUpDTO {
  error: string;
  powerUp: PowerUpDTO[];

  constructor(error: string, asteroids: PowerUpDTO[]) {
    this.error = error;
    this.powerUp = asteroids;
  }

  get getError(): string {
    return this.error;
  }

  set setError(value: string) {
    this.error = value;
  }

  get getPowerUps(): PowerUpDTO[] {
    return this.powerUp;
  }

  set setPowerUps(value: PowerUpDTO[]) {
    this.powerUp = value;
  }


}
