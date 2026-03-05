
import { Component, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="max-w-2xl mx-auto py-8 px-4 animate-fade-in-up">
      <div class="flex items-center mb-6">
        <button (click)="backToHome.emit()" class="mr-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 class="text-2xl font-bold text-gray-800">Hubungi Kami</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Admin Info -->
        <div class="bg-red-600 rounded-2xl p-6 text-white shadow-xl h-fit">
           <h3 class="text-xl font-bold mb-4 border-b border-red-400 pb-2">Informasi Admin</h3>
           <div class="space-y-4">
             <div class="flex items-start gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-200 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
               <div>
                 <p class="text-xs text-red-200 uppercase font-bold">Alamat Kantor</p>
                 <p class="font-medium">Jl. Merdeka No. 45, Jakarta Pusat, Indonesia</p>
               </div>
             </div>

             <div class="flex items-start gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-200 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
               <div>
                 <p class="text-xs text-red-200 uppercase font-bold">Email Admin</p>
                 <p class="font-medium">admin@sijangoan.id</p>
               </div>
             </div>

             <div class="mt-8 pt-4 border-t border-red-500 text-center">
               <p class="text-sm italic opacity-80">"Maju Terus Pantang Mundur"</p>
             </div>
           </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white rounded-2xl p-6 shadow-lg">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Kirim Pesan</h3>
          
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input formControlName="name" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" placeholder="Budi Santoso">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input formControlName="email" type="email" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" placeholder="budi@example.com">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
              <textarea formControlName="message" rows="4" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" placeholder="Tulis masukanmu disini..."></textarea>
            </div>

            <button type="submit" [disabled]="contactForm.invalid || sent()" class="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
              @if (sent()) {
                Terkirim! ✅
              } @else {
                Kirim Pesan
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  backToHome = output<void>();
  sent = signal(false);
  
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.contactForm.valid) {
      // Simulate API call
      console.log(this.contactForm.value);
      this.sent.set(true);
      setTimeout(() => {
        this.contactForm.reset();
        this.sent.set(false);
      }, 3000);
    }
  }
}
