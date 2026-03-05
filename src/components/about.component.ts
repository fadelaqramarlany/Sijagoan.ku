
import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-3xl mx-auto py-8 px-4 animate-fade-in-up">
      <!-- Header with Back Button -->
      <div class="flex items-center mb-6">
        <button (click)="backToHome.emit()" class="mr-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 class="text-2xl font-bold text-gray-800">Tentang Creator</h2>
      </div>

      <div class="space-y-6">
        <!-- Creator Profile Card -->
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden relative">
          <div class="h-32 bg-gradient-to-r from-red-600 to-red-400"></div>
          <div class="px-6 pb-6 text-center -mt-16">
            <div class="relative inline-block group">
              <!-- Profile Image: Customized to match user photo (Yellow shirt, black hair, smiling) -->
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fadel&top=shortHair&topColor=2c3e50&clothing=graphicShirt&clothingColor=f1c40f&eyes=happy&mouth=smile&skinColor=f8d25c&accessories=none&facialHair=none" 
                alt="Fadel Aqram" 
                class="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-yellow-50 transform group-hover:scale-105 transition-transform duration-300 object-cover"
              >
              <div class="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full border-2 border-white" title="Verified Creator">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            
            <h1 class="text-3xl font-extrabold text-gray-800 mt-3">Fadel Aqram Marpaung</h1>
            <p class="text-red-600 font-bold uppercase tracking-wider text-sm mb-4">Mastermind & Developer</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-red-100 rounded-lg text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-500 font-bold uppercase">Asal</p>
                  <p class="font-medium text-gray-800">Desa Sitiris-tiris</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="p-2 bg-red-100 rounded-lg text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-500 font-bold uppercase">Tanggal Lahir</p>
                  <p class="font-medium text-gray-800">24 Juni 2013</p>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <a href="https://wa.me/6288227793100" target="_blank" class="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>

        <!-- FAM AI Section -->
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-gray-700">
           <!-- Decorative tech circles -->
           <div class="absolute -top-10 -right-10 w-32 h-32 border-4 border-cyan-500 rounded-full opacity-20 animate-spin-slow"></div>
           <div class="absolute bottom-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-3xl opacity-30"></div>

           <div class="relative z-10 flex items-center gap-4 mb-4">
             <div class="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
             </div>
             <div>
               <h3 class="text-2xl font-bold text-cyan-400 tracking-wider">FAM AI</h3>
               <p class="text-gray-400 text-xs uppercase font-semibold">Artificial Intelligence Engine</p>
             </div>
           </div>

           <p class="text-gray-300 leading-relaxed mb-4">
             Website ini ditenagai oleh <strong>FAM AI</strong>, kecerdasan buatan canggih yang dikembangkan untuk membuat soal kuis yang dinamis, seru, dan edukatif secara otomatis setiap saat.
           </p>

           <div class="flex gap-2 flex-wrap">
             <span class="px-3 py-1 bg-gray-700 rounded-full text-xs font-mono text-cyan-300 border border-gray-600">v2.5-Flash</span>
             <span class="px-3 py-1 bg-gray-700 rounded-full text-xs font-mono text-cyan-300 border border-gray-600">Generative</span>
             <span class="px-3 py-1 bg-gray-700 rounded-full text-xs font-mono text-cyan-300 border border-gray-600">Smart Logic</span>
           </div>
        </div>

        <!-- Footer Quote -->
        <div class="text-center py-4">
          <p class="text-gray-400 italic font-medium">"Karya Anak Bangsa untuk Indonesia"</p>
          <p class="text-gray-300 text-xs mt-1">© 2024 Fadel Aqram Marpaung</p>
        </div>

      </div>
    </div>
  `
})
export class AboutComponent {
  backToHome = output<void>();
}
