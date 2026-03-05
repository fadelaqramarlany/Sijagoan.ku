
import { Component, signal, effect, inject, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService, Question } from '../services/game.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-2xl mx-auto w-full py-8 px-4">
      
      @if (loading()) {
        <div class="flex flex-col items-center justify-center h-64 animate-pulse">
          <div class="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-gray-600 font-semibold">Si Jangoan sedang memikirkan soal...</p>
          <p class="text-sm text-red-500 mt-2 font-medium">Mencari topik seru untukmu!</p>
        </div>
      } @else if (finished()) {
        <!-- Results View -->
        <div class="bg-white rounded-3xl shadow-xl p-8 text-center animate-fade-in-up border-b-8 border-yellow-400">
          <div class="mb-6 inline-block p-4 rounded-full bg-yellow-100 text-yellow-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 class="text-3xl font-bold text-gray-800 mb-2">Kuis Selesai!</h2>
          <p class="text-gray-500 mb-6">Topik: {{ gameService.currentTopic() }}</p>
          
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="bg-green-50 p-4 rounded-2xl">
              <div class="text-2xl font-bold text-green-600">{{ score() }}</div>
              <div class="text-xs text-green-500 uppercase font-bold tracking-wider">Benar</div>
            </div>
            <div class="bg-yellow-50 p-4 rounded-2xl">
              <div class="text-2xl font-bold text-yellow-600">+{{ earnedCoins() }}</div>
              <div class="text-xs text-yellow-500 uppercase font-bold tracking-wider">Koin Didapat</div>
            </div>
          </div>

          <button (click)="backToHome.emit()" class="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-red-700 transition">
            Kembali ke Beranda
          </button>
        </div>

      } @else {
        <!-- Quiz View -->
        <div class="mb-4">
           <div class="inline-block bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full mb-2 border border-red-200">
              Topik Saat Ini
           </div>
           <h2 class="text-xl font-bold text-gray-800">{{ gameService.currentTopic() }}</h2>
        </div>

        <div class="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <div class="flex items-center gap-2">
             <span class="text-sm font-bold text-gray-400">Soal</span>
             <span class="text-xl font-black text-red-600">{{ currentIndex() + 1 }}<span class="text-gray-300 text-sm">/{{ questions().length }}</span></span>
          </div>
          <div class="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
             <span class="font-mono font-bold text-gray-700">{{ timeLeft() }}s</span>
          </div>
        </div>

        <div class="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[400px] flex flex-col">
          <!-- Question -->
          <div class="p-8 bg-gradient-to-br from-red-600 to-red-500 text-white">
            <h3 class="text-xl md:text-2xl font-bold leading-relaxed">
              {{ currentQuestion().question }}
            </h3>
          </div>

          <!-- Options -->
          <div class="p-6 flex-1 flex flex-col justify-center gap-3 bg-gray-50">
            @for (option of currentQuestion().options; track $index) {
              <button 
                (click)="answer($index)"
                [disabled]="hasAnswered()"
                [class]="getOptionClass($index)"
                class="w-full text-left p-4 rounded-xl border-2 font-semibold transition-all duration-200 transform active:scale-98 flex justify-between items-center group relative overflow-hidden"
              > 
                <span class="relative z-10">{{ option }}</span>
                @if (hasAnswered() && $index === currentQuestion().correctIndex) {
                  <svg class="w-6 h-6 text-green-600 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                }
                @if (hasAnswered() && $index === selectedAnswer() && $index !== currentQuestion().correctIndex) {
                   <svg class="w-6 h-6 text-red-600 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>
                }
              </button>
            }
          </div>
          
          <!-- Progress Bar -->
           <div class="h-2 bg-gray-200 w-full">
             <div class="h-full bg-green-500 transition-all duration-500" [style.width.%]="((currentIndex()) / questions().length) * 100"></div>
           </div>
        </div>
      }
    </div>
  `
})
export class QuizComponent {
  backToHome = output<void>();
  gameService = inject(GameService);

  questions = signal<Question[]>([]);
  currentIndex = signal(0);
  loading = signal(true);
  finished = signal(false);
  
  // Quiz State
  score = signal(0);
  earnedCoins = signal(0);
  
  // Current Question State
  selectedAnswer = signal<number | null>(null);
  hasAnswered = signal(false);
  timeLeft = signal(30);
  
  // Computed
  currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  
  private timer: any;

  constructor() {
    this.startQuiz();
  }

  async startQuiz() {
    this.loading.set(true);
    const qs = await this.gameService.generateQuestions();
    this.questions.set(qs);
    this.loading.set(false);
    this.resetQuestionState();
  }

  resetQuestionState() {
    this.selectedAnswer.set(null);
    this.hasAnswered.set(false);
    this.timeLeft.set(20);
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(t => t - 1);
      } else {
        this.handleTimeout();
      }
    }, 1000);
  }

  handleTimeout() {
    if (!this.hasAnswered()) {
      this.answer(-1); // -1 indicates timeout/wrong
    }
  }

  answer(index: number) {
    if (this.hasAnswered()) return;
    
    clearInterval(this.timer);
    this.hasAnswered.set(true);
    this.selectedAnswer.set(index);

    const isCorrect = index === this.currentQuestion().correctIndex;
    if (isCorrect) {
      this.score.update(s => s + 1);
    }

    // Delay before next question
    setTimeout(() => {
      this.nextQuestion();
    }, 1500);
  }

  nextQuestion() {
    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.resetQuestionState();
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    this.finished.set(true);
    const coins = this.score() * 10; // 10 coins per correct answer
    this.earnedCoins.set(coins);
    this.gameService.addCoins(coins);
    clearInterval(this.timer);
  }

  getOptionClass(index: number): string {
    if (!this.hasAnswered()) {
      return 'bg-white border-gray-200 hover:border-red-400 hover:bg-red-50 text-gray-700';
    }

    const correctIndex = this.currentQuestion().correctIndex;

    if (index === correctIndex) {
      return 'bg-green-100 border-green-500 text-green-800';
    }

    if (index === this.selectedAnswer()) {
      return 'bg-red-100 border-red-500 text-red-800';
    }

    return 'bg-gray-100 border-gray-200 text-gray-400 opacity-60';
  }
}
