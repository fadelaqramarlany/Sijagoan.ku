
import { Component, inject, output, signal, computed } from '@angular/core';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto py-8 px-4 relative">
      <div class="flex items-center mb-6">
        <button (click)="backToHome.emit()" class="mr-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 class="text-2xl font-bold text-gray-800">Festival & Hadiah</h2>
      </div>

      <!-- Balance Card -->
      <div class="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-6 text-white shadow-lg mb-8 flex justify-between items-center relative overflow-hidden">
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-20 rounded-full blur-2xl"></div>
        <div>
          <p class="text-yellow-100 font-medium mb-1">Saldo Koin Kamu</p>
          <h1 class="text-4xl font-extrabold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-yellow-200" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
            </svg>
            {{ gameService.coins() }}
          </h1>
        </div>
        <div class="text-center z-10">
           @if (gameService.studentProfile(); as profile) {
             <div class="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/30">
               <span class="text-xs font-bold uppercase tracking-wider block mb-1">Terdaftar</span>
               <div class="font-bold text-sm">{{ profile.level }} - {{ profile.schoolName }}</div>
             </div>
           } @else {
             <div class="bg-white/20 p-2 rounded-lg backdrop-blur-sm animate-pulse">
               <span class="text-xs font-bold uppercase tracking-wider">Status</span>
               <div class="font-bold text-lg">Warga Tamu</div>
             </div>
           }
        </div>
      </div>

      <!-- Festival Section -->
      <div class="mb-8">
        <div class="flex items-center gap-2 mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
           </svg>
           <h3 class="text-xl font-bold text-gray-800">Spesial Festival Nasional</h3>
        </div>
        
        <div class="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
           <!-- Confetti BG -->
           <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style="background-image: radial-gradient(#ef4444 1px, transparent 1px); background-size: 20px 20px;"></div>
           
           <div class="w-full md:w-1/3 relative z-10">
             <img src="https://picsum.photos/400/250?random=1" class="rounded-lg shadow-md w-full object-cover h-40" alt="Festival">
           </div>
           <div class="flex-1 relative z-10">
             <h4 class="text-lg font-bold text-red-700 mb-2">Gebyar Kemerdekaan Pelajar</h4>
             <p class="text-gray-600 text-sm mb-4">
               Kompetisi khusus pelajar se-Indonesia! Menangkan Beasiswa dan Laptop Pendidikan. Daftarkan sekolahmu sekarang.
             </p>
             
             @if (gameService.studentProfile()) {
                <button class="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition flex items-center gap-2 shadow-lg shadow-green-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Sudah Terdaftar
                </button>
             } @else {
                <button (click)="openRegistration()" class="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition shadow-lg shadow-red-200 animate-bounce-slow">
                  Ikuti Event & Daftar Data Sekolah
                </button>
             }
           </div>
        </div>
      </div>

      <!-- Rewards Grid -->
      <h3 class="text-xl font-bold text-gray-800 mb-4">Tukar Koin</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (reward of rewards; track $index) {
          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition hover:shadow-md">
            <div class="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-3xl">
              {{ reward.icon }}
            </div>
            <h4 class="font-bold text-gray-800 mb-1">{{ reward.name }}</h4>
            <p class="text-xs text-gray-500 mb-4 h-8">{{ reward.desc }}</p>
            <button class="mt-auto w-full py-2 rounded-lg font-bold text-sm transition-colors"
               [class]="gameService.coins() >= reward.cost ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500' : 'bg-gray-200 text-gray-400 cursor-not-allowed'">
              {{ reward.cost }} Koin
            </button>
          </div>
        }
      </div>

      <!-- Registration Modal -->
      @if (showModal()) {
        <div class="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" (click)="closeRegistration()"></div>
          
          <!-- Modal Content -->
          <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden animate-fade-in-up">
            <div class="bg-red-600 p-6 text-white text-center">
              <h3 class="text-xl font-bold">Data Peserta Pelajar</h3>
              <p class="text-red-100 text-sm">Isi data sekolahmu untuk mengikuti Festival Nasional</p>
            </div>

            <div class="p-6">
              <form [formGroup]="regForm" (ngSubmit)="submitRegistration()" class="space-y-4">
                
                <!-- Nama Siswa -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
                  <input formControlName="name" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: Budi Santoso">
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Jenjang -->
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Jenjang</label>
                    <select formControlName="level" (change)="onLevelChange()" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none bg-white">
                      <option value="">Pilih...</option>
                      <option value="SD">SD / MI</option>
                      <option value="SMP">SMP / MTS</option>
                      <option value="SMA">SMA / MA</option>
                      <option value="SMK">SMK</option>
                    </select>
                  </div>

                  <!-- Kelas (Dynamic) -->
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Kelas</label>
                    <select formControlName="grade" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none bg-white">
                      <option value="">Pilih...</option>
                      @for (grade of availableGrades(); track grade) {
                        <option [value]="grade">{{ grade }}</option>
                      }
                    </select>
                  </div>
                </div>

                <!-- Kode Sekolah / NPSN -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Kode Sekolah (NPSN)</label>
                  <div class="flex gap-2">
                    <input formControlName="schoolCode" type="text" maxlength="8" class="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none uppercase font-mono tracking-wider" placeholder="Contoh: 10101234">
                    <button type="button" (click)="verifySchoolCode()" class="bg-gray-800 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-gray-700 transition">
                      Cek Data
                    </button>
                  </div>
                  @if (schoolVerified()) {
                     <p class="text-green-600 text-xs mt-1 font-bold">✓ Data Sekolah Terverifikasi</p>
                  } @else if (regForm.get('schoolCode')?.value && !schoolVerified()) {
                     <p class="text-gray-400 text-xs mt-1">Masukkan 8 digit kode NPSN</p>
                  }
                </div>

                <!-- Nama Sekolah -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Nama Sekolah</label>
                  <input formControlName="schoolName" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none bg-gray-50" placeholder="Otomatis atau isi manual...">
                </div>

                <button type="submit" [disabled]="regForm.invalid" class="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
                  Simpan & Ikuti Event
                </button>
              </form>
            </div>
            
            <!-- Close X -->
            <button (click)="closeRegistration()" class="absolute top-4 right-4 text-white hover:text-red-100 bg-red-700/50 hover:bg-red-700 rounded-full p-1">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class RewardsComponent {
  backToHome = output<void>();
  gameService = inject(GameService);
  
  showModal = signal(false);
  schoolVerified = signal(false);
  availableGrades = signal<string[]>([]);

  regForm = new FormGroup({
    name: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required),
    schoolCode: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    schoolName: new FormControl('', Validators.required)
  });

  rewards = [
    { name: 'Voucher Pulsa 5k', cost: 500, icon: '📱', desc: 'Pulsa elektrik semua operator.' },
    { name: 'E-Badge Pahlawan', cost: 1000, icon: '🏅', desc: 'Lencana digital khusus di profilmu.' },
    { name: 'Donasi Pendidikan', cost: 2000, icon: '📚', desc: 'Sumbangkan koin untuk buku sekolah.' },
    { name: 'Voucher Jajan', cost: 3000, icon: '🍢', desc: 'Diskon jajan di merchant pilihan.' },
    { name: 'Kaos "Jangoan"', cost: 10000, icon: '👕', desc: 'Kaos eksklusif edisi terbatas.' },
  ];

  openRegistration() {
    this.showModal.set(true);
  }

  closeRegistration() {
    this.showModal.set(false);
  }

  onLevelChange() {
    const level = this.regForm.get('level')?.value;
    this.regForm.get('grade')?.setValue(''); // Reset grade
    
    switch (level) {
      case 'SD':
        this.availableGrades.set(['1', '2', '3', '4', '5', '6']);
        break;
      case 'SMP':
        this.availableGrades.set(['7', '8', '9']);
        break;
      case 'SMA':
      case 'SMK':
        this.availableGrades.set(['10', '11', '12']);
        break;
      default:
        this.availableGrades.set([]);
    }
  }

  verifySchoolCode() {
    const code = this.regForm.get('schoolCode')?.value;
    if (code && code.length === 8) {
      // Simulate verification simulation
      this.schoolVerified.set(true);
      
      // Auto-fill mock school name based on code for better UX
      const randomNum = Math.floor(Math.random() * 5) + 1;
      const level = this.regForm.get('level')?.value || 'Sekolah';
      this.regForm.patchValue({
        schoolName: `${level} Negeri ${randomNum} Harapan Bangsa`
      });
    } else {
      this.schoolVerified.set(false);
      alert('Kode NPSN harus 8 digit angka.');
    }
  }

  submitRegistration() {
    if (this.regForm.valid) {
      const formValue = this.regForm.value;
      
      this.gameService.saveProfile({
        name: formValue.name!,
        level: formValue.level as any,
        grade: formValue.grade!,
        schoolCode: formValue.schoolCode!,
        schoolName: formValue.schoolName!
      });

      this.closeRegistration();
      alert(`Selamat Datang, ${formValue.name}! Data sekolah berhasil disimpan. Selamat bertanding!`);
    }
  }
}
