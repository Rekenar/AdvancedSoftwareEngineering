import { Component, OnInit , OnDestroy, Optional, SkipSelf, NgModule, ChangeDetectorRef ,Renderer2, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypingService } from 'src/app/services/typing.service';
import { CommunicationService } from 'src/app/services/typing.service';
import { ResultComponent } from 'src/app/typing-game/result/result.component';
import { NgZone } from '@angular/core';


type AudioFile = string;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})


export class GameComponent implements OnInit, OnDestroy  {
  resultVisible: boolean = true;
  constructor(private renderer: Renderer2, private el: ElementRef, private zone: NgZone, private cd: ChangeDetectorRef, @Optional() @SkipSelf() private typingService: TypingService) {

    if (!this.typingService) {
  
    }
  }


  audioFiles: AudioFile[] =  ['../../../assets/typing-game/Sounds/2.mp3', '../../../assets/typing-game/Sounds/3.mp3', '../../../assets/typing-game/Sounds/4.mp3', '../../../assets/typing-game/Sounds/6.mp3', '../../../assets/typing-game/Sounds/8.mp3', '../../../assets/typing-game/Sounds/9.mp3', '../../../assets/typing-game/Sounds/10.mp3'];

  words: string[] = [];
  showResult: boolean = false;
  showStart:boolean = true;
  showGame: boolean = true;
  yourGameData: any[] = [];

  time = 60;
  inputText:string = '';
  score = 0;
  mistakes = 0;
  wordPerMinute = 0;
  accuracy = 100;
  totalTyped = 0;
  totalScore = 0;
  multiplier = 1;
  index:number = 0;
  timerInterval: any;
  setTimeoutSeconds = 5000;
  intervalForAnimation: any;
  pause = false;
  something:any;
  wordContainer:any;
  
  ngOnInit() {
  this.wordContainer = document.getElementById('word-container');
  }

  async getData(): Promise<void> {
    try {
      const response = await this.typingService.getAllWords().toPromise();
      this.something = response;   
      this.words = this.something.map((item: { word: any }) => item.word);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async startGame() {
    try {
      await this.getData();
      this.showStart=false;
      this.newGame();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  ngOnDestroy(): void {

  }

  newGame(): void {
    if (this.pause) {
      return;
    }
      this.keepInputFocused();
      clearInterval(this.timerInterval);
      
      this.timerInterval = setInterval(() => this.updateTimer(), 1000);
      this.time = 60;
      this.index = 0;
      this.score = 0;
      this.mistakes = 0;
      this.wordPerMinute = 0;
      this.totalTyped = 0;
      this.totalScore = 0;
      this.multiplier = 1;
      this.accuracy = 100;
      this.setTimeoutSeconds = 5000;
      this.inputText ='';
      this.createFallingWord(); 
    
  }

  createFallingWord() {
    this.resetAnimation(this.setTimeoutSeconds/1000);

    const word = document.createElement('div');
    word.className = 'falling-word';
    const randomWord = Math.floor(Math.random() * this.words.length);

    word.textContent = this.words[randomWord];

    while (this.wordContainer.firstChild) {
    this.wordContainer.removeChild(this.wordContainer.firstChild);
    this.resetAnimation(this.setTimeoutSeconds/1000);
    }
    this.wordContainer.appendChild(word);

  }

  resetAnimation(duration:number): void  {

    this.wordContainer.style.animation = 'none';
    void this.wordContainer.offsetWidth;
    this.wordContainer.style.animation = '';
    this.wordContainer.style.animationDuration = `${duration}s`;
    clearInterval(this.intervalForAnimation);
    this.intervalForAnimation = setInterval(() => this.createFallingWord(),this.setTimeoutSeconds);
  }

  keepInputFocused() {
    const inputElement = document.getElementById('input') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
      inputElement.addEventListener('blur', function () {
        inputElement.focus();
      });
    }
  }

  typeSound(){
    const randomIndex = Math.floor(Math.random() * this.audioFiles.length);
    const audio = new Audio(this.audioFiles[randomIndex]);
    audio.play();
  }

  isAlphabetic(input: string): boolean {
    const alphabetRegex = /^[a-zA-Z]*$/;
    return alphabetRegex.test(input);
  }

  checkInput(event: Event): void {
    if (this.pause) {
      return;
    }
  
    const typedText: string = this.inputText.trim().toLowerCase();
    const charTyped: string = typedText.charAt(this.index);
  
    if (this.isAlphabetic(this.inputText)) {
      this.totalTyped++;
      const wordElements: Element[] = Array.from(this.wordContainer.getElementsByClassName('falling-word'));
  
      for (const wordElement of wordElements) {
        const wordText: string = (wordElement.textContent ?? '').toLowerCase();
  
        if (charTyped === wordText.charAt(this.index)) {
          this.typeSound();
  
          if (typedText === wordText) {
            this.handleCorrectInput(wordElement);
          } else {
            this.index++;
          }
        } else {
          this.handleIncorrectInput();
        }
      }
    } else {
      this.clearInput();
    }
  }
  
   handleCorrectInput(wordElement: Element): void {
    this.score += 10 * this.multiplier;
    this.index = 0;
    this.multiplier += 0.2 * (wordElement.textContent?.length ?? 0);
    this.multiplier = Number(this.multiplier.toFixed(2));
    wordElement.remove();
    this.inputText = '';
    this.createFallingWord();
    this.setTimeoutSeconds = this.setTimeoutSeconds > 1000 ? this.setTimeoutSeconds - 500 : this.setTimeoutSeconds;
  }
  
   handleIncorrectInput(): void {
    this.clearInput();
    this.index = 0; 
    this.mistakes++;
    this.multiplier = 1;
    this.setTimeoutSeconds = this.setTimeoutSeconds < 5000 ? this.setTimeoutSeconds + 500 : this.setTimeoutSeconds;
  }

  clearInput(){
    this.zone.run(() => {
      setTimeout(() => {
        this.inputText = '';
        this.cd.detectChanges();
      }, 0);
    });
  }

  updateTimer() {
    if (this.pause) {
      return;
    }
    this.time--;
    if (this.time === 0) {
      clearInterval(this.intervalForAnimation);
      this.pause = true;
  
      this.totalScore = Math.max(this.score - this.mistakes * 10, 0);
      const minutesElapsed = Math.max((60 - this.time) / 60, 0);

      this.totalScore = this.totalScore > 0 ? this.totalScore: 0;  
      this.wordPerMinute = minutesElapsed > 0 ? Math.round((this.totalTyped / 5) / minutesElapsed) : 0;
      this.accuracy = this.totalTyped !== 0 ? Math.round(((this.totalTyped - this.mistakes) / this.totalTyped) * 100) : 0;
  
      this.yourGameData = [
        { totalScore: this.totalScore },
        { mistakes: this.mistakes },
        { wordPerminute: this.wordPerMinute },
        { accuracy: this.accuracy }
      ];

      this.typingService.postScore(this.totalScore);
      this.showResult = true;
      this.showGame = false;
    }
  }

  restartGame(){

    this.pause = false;
    this.showResult = false;
    this.newGame();
  }
}