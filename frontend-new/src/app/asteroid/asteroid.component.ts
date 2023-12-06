import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Asteroid} from "./Asteroid";
import {Spaceship} from "./Spaceship";

@Component({
  selector: 'app-asteroid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asteroid.component.html',
  styleUrl: './asteroid.component.css'
})

export class AsteroidComponent implements OnInit{
  private readonly spaceShip:Spaceship;

  private context:CanvasRenderingContext2D;

  private pressedKeys = new Set<string>();

  private asteroids: Asteroid[] = [];

  private gameRunning = false;

  private isShot:boolean = false;

  private isHit: boolean = false;

  private score = 0;



  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.context = {} as CanvasRenderingContext2D;
    this.spaceShip = new Spaceship(750, 300, 0, 0, 0);
  }

  ngOnInit() {
    const canvas =  this.el.nativeElement.querySelector('#gameCanvas');
    this.context = canvas.getContext('2d');
    this.initCanvas(canvas);
    this.renderer.listen('window', 'keydown', (event) => this.handleKeyDown(event));

    this.createAsteroid();
    const keydownListener = () => {
      this.gameRunning = true;
      this.gameLoop();
      // Remove the keydown listener after it's been triggered once
      window.removeEventListener('keydown', keydownListener);
    };
    window.addEventListener('keydown', keydownListener);
  }


  private initCanvas(canvas: HTMLCanvasElement) {
    const resizeCanvas = () => {
      if(this.gameRunning) return;
      canvas.width = window.innerWidth * 0.99;
      canvas.height = window.innerHeight * 0.90;
      this.drawBackground();
      this.context.fillStyle = '#666666';
      this.context.font = '30px Arial';
      this.context.fillText('Press any key to start', this.context.canvas.width / 4, this.context.canvas.height / 2);
      this.spaceShip.resetSpaceship(this.context.canvas.width, this.context.canvas.height);
    };

    // Initial canvas setup
    resizeCanvas();

    // Redraw canvas on resize
    window.addEventListener('resize', resizeCanvas);
  }

  private drawBackground() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }


  private gameLoop() {
    if(!this.gameRunning || this.spaceShip.getLives <= 0) {
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


    this.spaceShip.draw(this.context);


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
    for(const asteroid of this.asteroids){
      asteroid.updateAsteroids(this.context.canvas.width, this.context.canvas.height);


      if(!this.isHit){
        if(asteroid.collidesWith(this.spaceShip, this.context)){
          this.spaceShip.setLives = this.spaceShip.getLives - 1;
          this.isHit = true;
          setTimeout(() => this.isHit = false, 2000);
          this.spaceShip.resetSpaceship(this.context.canvas.width, this.context.canvas.height);
        }
      }

      for(const bullet of this.spaceShip.getBullets) {
        if(asteroid.collidesWith(bullet, this.context)) {

          this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
          this.score += 1;
          this.spaceShip.getBullets.splice(this.spaceShip.getBullets.indexOf(bullet), 1);
          break;
        }
      }
    }
  }




  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.pressedKeys.add(event.key);
    if(event.key === ' ' &&  !this.isShot) {
      this.isShot = true;
      this.spaceShip.shoot();
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    this.pressedKeys.delete(event.key);
    if(event.key === 'ArrowUp') {
      this.spaceShip.setMoving(false);
    }

    if(event.key === ' ' &&  this.isShot) {
      this.isShot = false;
    }
  }

  private createAsteroid() {
    for(let i = 0; i < 10; i++){
      const asteroid = new Asteroid(Math.pow(5,i), i, 1.5, -0.1*i, 0.1, 0);
      this.asteroids.push(asteroid);
    }
  }

  private drawScore() {
    this.context.fillStyle = '#FFFFFF';
    this.context.font = '30px Arial';
    this.context.textAlign = 'center';
    this.context.fillText('Score: ' + this.score, this.context.canvas.width/2, 50);
  }
  private gameOverScreen() {
    this.drawBackground()
    this.context.fillStyle = '#FFFFFF';
    this.context.font = '30px Arial';
    this.context.textAlign = 'center';
    this.context.fillText('Game Over', this.context.canvas.width/2, this.context.canvas.height/2);
    this.context.fillText('Score: ' + this.score, this.context.canvas.width/2, this.context.canvas.height/2 + 50)
  }
}









//Asteroid(id, x-coordinate, y-coordinate, speed, angle, rotation, size) for DB
