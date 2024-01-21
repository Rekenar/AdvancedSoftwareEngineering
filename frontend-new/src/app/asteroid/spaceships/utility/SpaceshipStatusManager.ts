export class SpaceshipStatusManager {
  private lives: number;
  private shots: number;
  private killed: boolean;
  private isReloading: boolean;
  private destroyed: boolean;
  private isMoving: boolean;

  constructor() {
    this.lives = 3;
    this.shots = 10;
    this.killed = false;
    this.isReloading = false;
  }

  loseLife(): void {
    this.lives--;
    if (this.lives <= 0) {
      this.destroyed = true;
    }
    this.killed = true;
  }

  reload(): void {
    this.isReloading = true;
    setTimeout(() => {
      this.isReloading = false
      this.shots = 10;
    }, 2000);
  }

  shoot(): void {
    this.shots--;
  }

  getLives(): number {
    return this.lives;
  }

  getReloading(): boolean {
    return this.isReloading;
  }

  getKilled(): boolean {
    return this.killed;
  }

  getIsDestroyed(): boolean {
    return this.destroyed;
  }

  getMoving(): boolean {
    return this.isMoving;
  }

  getShots(): number {
    return this.shots;
  }

  setMoving(moving: boolean): void {
    this.isMoving = moving;
  }

  setReloading(reloading: boolean): void {
    this.isReloading = reloading;
  }

  setKilled(killed: boolean): void {
    this.killed = killed;
  }

  setDestroyed(destroyed: boolean): void {
    this.destroyed = destroyed;
  }

  setLives(lives: number): void {
    this.lives = lives;
  }

  resetStatus(): void {
    this.killed = false;
    this.isMoving = false;
  }
}
