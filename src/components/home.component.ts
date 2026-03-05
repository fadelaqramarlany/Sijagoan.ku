
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in-up">
      <!-- Decoration -->
      <div class="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-red-600 to-transparent -z-10 opacity-20"></div>

      <div class="mb-8 relative">
         <div class="absolute -top-10 -left-10 w-24 h-24 bg-red-500 rounded-full blur-2xl opacity-50"></div>
         <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-40"></div>
         
         <img src="https://cdn-icons-png.flaticon.com/512/3014/3014207.png" alt="Garuda" class="w-32 h-32 mx-auto mb-4 animate-bounce-slow drop-shadow-lg">
         <h1 class="text-5xl font-extrabold text-red-600 mb-2 tracking-tight drop-shadow-sm">
           Si Jangoan
         </h1>
         <p class="text-xl text-gray-600 font-semibold">Kuis Nasional Berhadiah</p>
      </div>

      <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border-b-4 border-red-500 transform transition hover:scale-105 duration-300">
        <p class="mb-4 text-gray-500 leading-relaxed">
          Ayo uji pengetahuanmu tentang Indonesia! Kumpulkan koin, raih medali, dan jadilah juara nasional!
        </p>

        <!-- New Feature Badge -->
        <div class="mb-6 inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Topik Kuis Selalu Baru!
        </div>

        <div class="flex flex-col gap-4">
          <button (click)="onStart.emit()" class="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-red-500/50 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Mulai Kuis
          </button>
          
          <button (click)="onRewards.emit()" class="w-full bg-white text-red-600 border-2 border-red-100 font-bold py-3 px-6 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Lihat Hadiah
          </button>
        </div>
      </div>

      <div class="mt-8 flex gap-4 text-sm text-gray-500 font-medium">
        <div class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-green-500"></span> Online
        </div>
        <div class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-blue-500"></span> AI Generator
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  onStart = output<void>();
  onRewards = output<void>();
}
