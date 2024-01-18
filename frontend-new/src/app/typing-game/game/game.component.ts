import { Component, OnInit , OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

type AudioFile = string;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})


export class GameComponent implements OnInit, OnDestroy {

  audioFiles: AudioFile[] =  ['../../../assets/typing-game/Sounds/2.mp3', '../../../assets/typing-game/Sounds/3.mp3', '../../../assets/typing-game/Sounds/4.mp3', '../../../assets/typing-game/Sounds/6.mp3', '../../../assets/typing-game/Sounds/8.mp3', '../../../assets/typing-game/Sounds/9.mp3', '../../../assets/typing-game/Sounds/10.mp3'];

  words: string[] = ["and", "but", "cat", "dog", "run", "fun", "hop", "top", "hat", "eat",
  "pat", "rat", "bit", "sit", "map", "lip", "cap", "lap", "pen", "hen",
  "gem", "sun", "one", "two", "red", "led", "fog", "jog", "bug", "mug",
  "dig", "pig", "jog", "log", "zap", "yap", "nap", "sap", "dad", "add",
  "ice", "ace", "den", "men", "wet", "jet", "hit", "pit", "lot", "dot",
  "rot", "cut", "hut", "nut", "bun", "fun", "mud", "bud", "hot", "dot",
  "pot", "got", "jog", "jog", "box", "fox", "mix", "fix", "bag", "rag",
  "tag", "jam", "ram", "dam", "ham", "jar", "car", "bar", "tar", "par",
  "bat", "rat", "fat", "cat", "hat", "mat", "pat", "sat", "vat", "bet",
  "pet", "get", "set", "jet", "let", "met", "net", "wet", "yet", "hum",
  "gum", "sum", "rum", "bum", "run", "sun", "fun", "bun", "nun", "gun"
  ];

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

  ngOnInit() {
    this.newGame();
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);
  }
  
  ngOnDestroy(): void {
    // clearInterval(this.timerInterval);
    // clearInterval(this.intervalForAnimation);
  }

  newGame(): void {
    if (!this.pause) {
      this.keepInputFocused();
      clearInterval(this.timerInterval);
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
      // this.updateValues();
      this.createFallingWord();
    }
  }

  createFallingWord() {
   clearInterval(this.intervalForAnimation);
    const word = document.createElement('div');
    word.className = 'falling-word';
    word.textContent = this.words[Math.floor(Math.random() * this.words.length)];
  
    const wordContainer = document.getElementById('word-container');
    if (wordContainer) {
      while (wordContainer.firstChild) {
        wordContainer.removeChild(wordContainer.firstChild);
      }
      
      wordContainer.appendChild(word);
      this.intervalForAnimation = setInterval(this.createFallingWord,this.setTimeoutSeconds);
      // this.resetAnimation(this.setTimeoutSeconds / 1000);
    }
  }
  
  // resetAnimation(duration: number) {
  //   const wordContainer = document.getElementById('word-container');
  //   if(wordContainer)
  //   {
  //     wordContainer.style.animation = 'none';
  //     setTimeout(() => {
  //       wordContainer.style.animation = `fallAnimation ${duration}s linear infinite`;
  //     }, 50);
  //   }
  // }

  keepInputFocused() {
    const inputElement = document.getElementById('input') as HTMLInputElement;
  
    if (inputElement) {
      // Immediately focus the input element
      inputElement.focus();
  
      // Add an event listener to re-focus the input element whenever it loses focus
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

   checkInput(event: Event): void {
    if (!this.pause) {
      const wordContainer = document.getElementById('word-container');
      
      if (wordContainer) {
        const typedText: string = this.inputText.trim().toLowerCase();
        const charTyped: string = typedText.charAt(this.index);
        this.totalTyped++;
        
        const wordElements: Element[] = Array.from(wordContainer.getElementsByClassName('falling-word'));
        for (const wordElement of wordElements) {
          const wordText: string = (wordElement.textContent || '').toLowerCase();
          if (charTyped === wordText.charAt(this.index)) {
            this.typeSound();
            if (typedText === wordText) {
              this.score += 10 * this.multiplier;
              this.index = 0;
              this.multiplier += 0.2 * wordText.length;
              this.multiplier = Number(this.multiplier.toFixed(2));
              wordElement.remove();
              this.inputText='';
              this.createFallingWord();
              if (this.setTimeoutSeconds > 1000) {
                this.setTimeoutSeconds -= 500;
              }
            } else {
              this.index++; // Move to the next character
            }
          } 
          else {
            this.inputText = ''; // Clear input on mistake
            this.index = 0; // Reset index on mistake
            
            this.mistakes++;
            this.multiplier = 1;

            if (this.setTimeoutSeconds < 5000) {
              this.setTimeoutSeconds += 500;
            }
  
        //    updateMistakes(mistakesElement);
            
          }
  
          this.totalScore = this.score - this.mistakes * 10;
        }
      }
    }
  }

  updateTimer() {
    if(!this.pause)
    {
      this.time--;
      if (this.time === 0) {
        this.pause = true;
        this.newGame(); // Reset the game after the timer reaches 0
      }
    }
  }
}