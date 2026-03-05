
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { QuizComponent } from './components/quiz.component';
import { RewardsComponent } from './components/rewards.component';
import { ContactComponent } from './components/contact.component';
import { AboutComponent } from './components/about.component';
import { GameService } from './services/game.service';

type View = 'home' | 'quiz' | 'rewards' | 'contact' | 'about';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, QuizComponent, RewardsComponent, ContactComponent, AboutComponent],
  template: `
    <div class="flex flex-col min-h-screen">
      <!-- Navbar -->
      <nav class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div class="max-w-5xl mx-auto px-4">
          <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div (click)="currentView.set('home')" class="flex items-center gap-2 cursor-pointer group">
              <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-lg transform group-hover:rotate-12 transition">S</div>
              <span class="font-bold text-gray-800 text-lg">Si Jangoan</span>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
              <button (click)="currentView.set('home')" class="hover:text-red-600 transition" [class.text-red-600]="currentView() === 'home'">Beranda</button>
              <button (click)="currentView.set('rewards')" class="hover:text-red-600 transition" [class.text-red-600]="currentView() === 'rewards'">Hadiah</button>
              <button (click)="currentView.set('about')" class="hover:text-red-600 transition" [class.text-red-600]="currentView() === 'about'">Tentang</button>
              <button (click)="currentView.set('contact')" class="hover:text-red-600 transition" [class.text-red-600]="currentView() === 'contact'">Kontak</button>
              
              <!-- Coin Chip -->
              <div class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1 cursor-default">
                <span class="text-yellow-500">🪙</span>
                {{ gameService.coins() }}
              </div>
            </div>
            
            <!-- Mobile Menu Toggle (simplified) -->
            <button class="md:hidden p-2 text-gray-600" (click)="toggleMobileMenu()">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
               </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu Dropdown -->
        @if (isMobileMenuOpen()) {
          <div class="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg p-4 flex flex-col gap-4 animate-fade-in-up">
              <button (click)="setView('home')" class="text-left font-semibold text-gray-600">Beranda</button>
              <button (click)="setView('rewards')" class="text-left font-semibold text-gray-600">Hadiah & Festival</button>
              <button (click)="setView('about')" class="text-left font-semibold text-gray-600">Tentang Creator</button>
              <button (click)="setView('contact')" class="text-left font-semibold text-gray-600">Kontak Admin</button>
              <div class="h-px bg-gray-100 w-full"></div>
              <div class="flex items-center gap-2 font-bold text-yellow-600">
                 <span>🪙</span> {{ gameService.coins() }} Koin
              </div>
          </div>
        }
      </nav>

      <!-- Main Content -->
      <main class="flex-grow relative overflow-hidden">
        @switch (currentView()) {
          @case ('home') {
            <app-home (onStart)="currentView.set('quiz')" (onRewards)="currentView.set('rewards')"></app-home>
          }
          @case ('quiz') {
            <app-quiz (backToHome)="currentView.set('home')"></app-quiz>
          }
          @case ('rewards') {
            <app-rewards (backToHome)="currentView.set('home')"></app-rewards>
          }
          @case ('contact') {
            <app-contact (backToHome)="currentView.set('home')"></app-contact>
          }
          @case ('about') {
            <app-about (backToHome)="currentView.set('home')"></app-about>
          }
        }
      </main>

      <!-- Footer -->
      <footer class="bg-white border-t border-gray-200 py-6 mt-auto">
         <div class="text-center text-gray-500 text-sm">
           &copy; 2024 Si Jangoan. Merayakan Indonesia. 🇮🇩
         </div>
      </footer>
    </div>
  `
})
export class AppComponent {
  gameService = inject(GameService);
  currentView = signal<View>('home');
  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  setView(view: View) {
    this.currentView.set(view);
    this.isMobileMenuOpen.set(false);
  }
}
