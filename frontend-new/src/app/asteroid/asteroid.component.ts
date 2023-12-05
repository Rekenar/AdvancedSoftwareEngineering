import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {CommonModule, Time} from '@angular/common';
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
  private spaceShip:Spaceship;

  private context:CanvasRenderingContext2D;

  private pressedKeys = new Set<string>();

  private asteroids: Asteroid[] = [];

  private gameRunning = false;

  private counter = 0;

  private possibleShots = 0;

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
      this.draw();
      this.spaceShip = new Spaceship(canvas.width / 2, canvas.height / 2, 0, 0, 0);
      this.spaceShip.drawSpaceship(this.context);
      this.context.fillStyle = '#666666';
      this.context.font = '30px Arial';
      this.context.fillText('Press any key to start', this.context.canvas.width / 4, this.context.canvas.height / 2);
    };

    // Initial canvas setup
    resizeCanvas();

    // Redraw canvas on resize
    window.addEventListener('resize', resizeCanvas);
  }


  private gameLoop() {
    if(!this.gameRunning) {
      return;
    }

    this.draw();

    this.updateSpaceship();
    this.updateBullets();
    this.updateAsteroids();



    this.bulletShootTimer();


    setTimeout(() => this.gameLoop(), 1000 / 60); // 60 frames per second
  }



  private bulletShootTimer(){

    if( this.possibleShots == 0 ){
      this.possibleShots = 20;
    }

    this.counter++;
  }


  private draw() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }



  private updateSpaceship() {
    this.spaceShip.updateSpaceship(this.pressedKeys, this.context.canvas.width, this.context.canvas.height);
    this.spaceShip.drawSpaceship(this.context);
    this.spaceShip.drawThrust(this.context);
  }

  private updateBullets() {
    for (const bullet of this.spaceShip.getBullets) {
      if(bullet.updateBullet(this.context.canvas.width, this.context.canvas.height)) this.spaceShip.getBullets.splice(this.spaceShip.getBullets.indexOf(bullet), 1);
      bullet.drawBullet(this.context);
    }
  }


  private updateAsteroids() {
    let count = 0;
    for(const asteroid of this.asteroids){
      asteroid.updateAsteroids(this.context.canvas.width, this.context.canvas.height);
      asteroid.drawAsteroid(this.context);
    }
  }




  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.pressedKeys.add(event.key);
    if(event.key === ' ') {
      if(this.possibleShots > 0){
        this.spaceShip.shoot();
        this.possibleShots--;
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    this.pressedKeys.delete(event.key);
    if(event.key === 'ArrowUp') {
      this.spaceShip.setMoving(false);
    }
  }

  private createAsteroid() {
    for(let i = 0; i < 10; i++){
      const asteroid = new Asteroid(Math.pow(5,i), i, 1.5, -0.1*i, 0.1, 0);
      this.asteroids.push(asteroid);
    }
  }

}









//Asteroid(id, x-coordinate, y-coordinate, speed, angle, rotation, size) for DB
