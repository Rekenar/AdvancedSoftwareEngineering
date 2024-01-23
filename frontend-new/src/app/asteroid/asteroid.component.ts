import {Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncomingAsteroidDTO} from "./asteroids/IncomingAsteroidDTO";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IAsteroid} from "./asteroids/IAsteroid";
import {SmallAsteroid} from './asteroids/SmallAsteroid';
import {MediumAsteroid} from "./asteroids/MediumAsteroid";
import {BigAsteroid} from './asteroids/BigAsteroid';
import {ISpaceship} from "./spaceships/ISpaceship";
import {NormalSpaceship} from "./spaceships/NormalSpaceship";
import {interval, Subscription} from "rxjs";
import {IPowerUp} from "./powerups/IPowerUp";
import {SpeedPowerUp} from "./powerups/SpeedPowerUp";
import {TripleMagazinePowerUp} from "./powerups/TripleMagazinePowerUp";
import {IncomingPowerUpDTO} from "./powerups/PowerUpDTO";
import {MagazineCapacityPowerUp} from "./powerups/MagazineCapacityPowerUp";

@Component({
  selector: 'app-asteroid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asteroid.component.html',
  styleUrl: './asteroid.component.css'
})

export class AsteroidComponent implements OnInit, OnDestroy {
  private spaceShip: ISpaceship;

  private asteroids: IAsteroid[] = [];

  private powerUps: IPowerUp[] = [];

  private context: CanvasRenderingContext2D;

  private pressedKeys = new Set<string>();

  private gameRunning = false;

  private isShot: boolean = false;

  private asteroidSubscription: Subscription;

  private asteroidInterval = 15000;

  private powerUpInterval = 5000;

  private powerUpSubscription: Subscription;

  private score = 0;


  constructor(private el: ElementRef, private renderer: Renderer2, private http: HttpClient) {
    this.context = {} as CanvasRenderingContext2D;
  }


  ngOnInit(): void {
    this.initializeCanvas();
    this.setupEventListeners();
    this.fetchAsteroids();
    this.fetchPowerUps();
    this.spaceShip = new NormalSpaceship(this.context, innerWidth / 2, innerHeight / 2, 0, 0);

  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leak
    if (this.asteroidSubscription) {
      this.asteroidSubscription.unsubscribe();
    }
    if (this.powerUpSubscription) {
      this.powerUpSubscription.unsubscribe();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.pressedKeys.add(event.key);
    if (event.key === 'ArrowUp') {
      this.spaceShip.setMoving = true;
    }
    if (event.key === ' ' && !this.isShot) {
      this.isShot = true;
      this.spaceShip.shoot();
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    this.pressedKeys.delete(event.key);
    if (event.key === 'ArrowUp') {
      this.spaceShip.setMoving = false;
    }
    if (event.key === ' ' && this.isShot) {
      this.isShot = false;
    }
  }

  private initializeCanvas(): void {
    const canvas = this.el.nativeElement.querySelector('#gameCanvas');
    this.context = canvas.getContext('2d');
    this.resizeCanvas(canvas);
    window.addEventListener('resize', () => this.resizeCanvas(canvas));
  }

  private setupEventListeners(): void {
    this.renderer.listen('window', 'keydown', (event) => this.handleKeyDown(event));
    this.renderer.listen('window', 'keyup', (event) => this.handleKeyUp(event));
    this.renderer.listen('window', 'click', (event) => this.handleClickEvent(event));
    const keydownListener = () => {
      this.gameRunning = true;
      this.asteroidSubscription = interval(this.asteroidInterval).subscribe(() => this.fetchAsteroids());
      this.powerUpSubscription = interval(this.powerUpInterval).subscribe(() => this.fetchPowerUps());
      this.gameLoop();
      // Remove the keydown listener after it's been triggered once
      window.removeEventListener('keydown', keydownListener);
    };
    window.addEventListener('keydown', keydownListener);
  }

  private fetchAsteroids(): void {
    this.createAsteroid().subscribe(data => {
      this.processAsteroidData(data);
    });
  }

  private fetchPowerUps(): void {
    this.createPowerUps().subscribe(data => {
      this.processPowerUpData(data);
    });
  }

  private resizeCanvas(canvas: HTMLCanvasElement): void {
    if (this.gameRunning) return;
    canvas.width = window.innerWidth * 0.99;
    canvas.height = window.innerHeight * 0.90;
    this.drawStartScreen();
  }

  private drawStartScreen(): void {
    this.drawBackground();
    this.context.fillStyle = '#666666';
    this.context.font = '30px Arial';
    this.context.textAlign = 'center';
    this.context.fillText('Press any key to start', this.context.canvas.width / 2, this.context.canvas.height / 2);
  }


  private createStartScreen() {
    //Create Start Screen with buttons for start and settings


  }

  private handleClickEvent(event: MouseEvent) {
    //Check if mouse is over start button or settings button
    //If mouse is over start button, start game
    //If mouse is over settings button, open settings

  }

  private drawBackground() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }


  private gameLoop() {
    if (!this.gameRunning || this.spaceShip.getLives <= 0) {
      this.sendScore().subscribe();
      this.gameOverScreen();
      return;
    }

    this.update();

    this.draw();


    setTimeout(() => this.gameLoop(), 1000 / 60); // 60 frames per second
  }

  private draw() {
    this.drawBackground();

    this.asteroids.forEach(asteroid => asteroid.drawAsteroid(this.context));


    this.powerUps.forEach(powerUp => powerUp.draw(this.context));

    this.spaceShip.draw();

    this.drawScore();
  }


  private update() {
    this.updateSpaceship();
    this.updateAsteroids();
  }

  private updateSpaceship() {
    this.spaceShip.updateSpaceship(this.pressedKeys, this.context.canvas.width, this.context.canvas.height);
  }

  private updateAsteroids() {
    for (const powerUp of this.powerUps) {
      if (powerUp.getHitbox().intersects(this.spaceShip.getHitbox())) {
        powerUp.apply(this.spaceShip);
        this.powerUps.splice(this.powerUps.indexOf(powerUp), 1);
      }
    }
    for (const asteroid of this.asteroids) {
      asteroid.updateAsteroids(this.context.canvas.width, this.context.canvas.height);


      if (this.spaceShip.getHitbox().intersects(asteroid.getHitbox())) {
        this.spaceShip.loseLife(this.context.canvas.width, this.context.canvas.height);
        this.powerUps = [];
        this.asteroids = [];
        setTimeout(() => {
          this.fetchAsteroids();
          this.fetchPowerUps();
        }, 2000);
      }


      for (const bullet of this.spaceShip.getMagazine.getBullets) {
        if (bullet.getHitbox().intersects(asteroid.getHitbox())) {
          if (asteroid instanceof SmallAsteroid) {
            this.score += 10;
          } else if (asteroid instanceof MediumAsteroid) {
            this.score += 5;
            this.asteroids.push(new SmallAsteroid(asteroid.getX + 50, asteroid.getY, asteroid.getAngle * -Math.PI / 2, asteroid.getRotation));
            this.asteroids.push(new SmallAsteroid(asteroid.getX - 50, asteroid.getY, asteroid.getAngle * Math.PI / 2, asteroid.getRotation));
          } else if (asteroid instanceof BigAsteroid) {
            this.score += 2;
            this.asteroids.push(new MediumAsteroid(asteroid.getX + 50, asteroid.getY, asteroid.getAngle * -Math.PI / 2, asteroid.getRotation));
            this.asteroids.push(new MediumAsteroid(asteroid.getX - 50, asteroid.getY, asteroid.getAngle * Math.PI / 2, asteroid.getRotation));
          }

          this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
          this.spaceShip.getMagazine.getBullets.splice(this.spaceShip.getMagazine.getBullets.indexOf(bullet), 1);
          break;
        }
      }

    }
  }


  private drawScore() {
    this.context.fillStyle = '#FFFFFF';
    this.context.font = '30px Arial';
    this.context.textAlign = 'center';
    this.context.fillText('Score: ' + this.score, this.context.canvas.width / 2, 50);
  }

  private gameOverScreen() {
    this.drawBackground()
    this.context.fillStyle = '#FFFFFF';
    this.context.font = '30px Arial';
    this.context.textAlign = 'center';
    this.context.fillText('Game Over', this.context.canvas.width / 2, this.context.canvas.height / 2);
    this.context.fillText('Score: ' + this.score, this.context.canvas.width / 2, this.context.canvas.height / 2 + 50)
  }

  private createPowerUps() {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token"));

    return this.http.get<IncomingPowerUpDTO>('http://localhost:8080/api/power-up/' + window.innerWidth + '/' + window.innerHeight, {headers});
  }

  private createAsteroid() {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token"));

    return this.http.get<IncomingAsteroidDTO>('http://localhost:8080/api/asteroid/' + window.innerWidth + '/' + window.innerHeight, {headers});
  }

  private sendScore() {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token"));


    return this.http.post(`http://localhost:8080/scores/add/5/${this.score}`, null, {headers});
  }

  private processPowerUpData(data: IncomingPowerUpDTO): void {
    if (data.error === null) {
      this.createPowerUpsFromDTO(data);
    }

  }

  private processAsteroidData(data: IncomingAsteroidDTO): void {
    if (data.error === null) {
      this.createAsteroidsFromDTO(data);
    }
  }

  private createAsteroidsFromDTO(data: IncomingAsteroidDTO): void {
    data.asteroids.forEach(asteroid => {
      switch (asteroid.size) {
        case 1:
          this.asteroids.push(new SmallAsteroid(asteroid.x, asteroid.y, asteroid.angle, 0));
          break;
        case 2:
          this.asteroids.push(new MediumAsteroid(asteroid.x, asteroid.y, asteroid.angle, 0));
          break;
        case 3:
          this.asteroids.push(new BigAsteroid(asteroid.x, asteroid.y, asteroid.angle, 0));
          break;
      }
    });
  }


  private createPowerUpsFromDTO(data: IncomingPowerUpDTO) {
    console.log(data);
    data.powerUp.forEach(powerUp => {
      switch (powerUp.type) {
        case 1:
          this.powerUps.push(new SpeedPowerUp(powerUp.x, powerUp.y));
          break;
        case 2:
          this.powerUps.push(new TripleMagazinePowerUp(powerUp.x, powerUp.y));
          break;
        case 3:
          this.powerUps.push(new MagazineCapacityPowerUp(powerUp.x, powerUp.y));
          break;
        case 4:
          this.powerUps.push(new SpeedPowerUp(powerUp.x, powerUp.y));
          break;
        case 5:
          this.powerUps.push(new MagazineCapacityPowerUp(powerUp.x, powerUp.y));
          break;
      }
    });

  }
}
