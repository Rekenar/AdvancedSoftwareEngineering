interface AsteroidDTO {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
}

export class IncomingAsteroidDTO {
  error: string;
  asteroids: AsteroidDTO[];

  constructor(error: string, asteroids: AsteroidDTO[]) {
    this.error = error;
    this.asteroids = asteroids;
  }

  get getError(): string {
    return this.error;
  }

  get getAsteroids(): AsteroidDTO[] {
    return this.asteroids;
  }

  set setAsteroids(value: AsteroidDTO[]) {
    this.asteroids = value;
  }

  set setError(value: string) {
    this.error = value;
  }
}
