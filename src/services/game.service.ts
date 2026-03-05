
import { Injectable, signal, computed } from '@angular/core';
import { GoogleGenAI, Type } from "@google/genai";

export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface StudentProfile {
  name: string;
  level: 'SD' | 'SMP' | 'SMA' | 'SMK';
  grade: string;
  schoolName: string;
  schoolCode: string; // NPSN
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly STORAGE_KEY = 'si_jangoan_coins';
  private readonly PROFILE_KEY = 'si_jangoan_profile';
  
  // State
  coins = signal<number>(0);
  badges = signal<string[]>([]);
  currentTopic = signal<string>('Umum');
  
  // Student Profile State
  studentProfile = signal<StudentProfile | null>(null);

  // Define available topics for rotation
  private readonly topics = [
    'Sejarah Perjuangan Kemerdekaan',
    'Kuliner & Makanan Khas Nusantara',
    'Lagu Daerah & Alat Musik Tradisional',
    'Flora & Fauna Endemik Indonesia',
    'Destinasi Wisata & Geografi Indonesia',
    'Pahlawan Nasional Wanita',
    'Adat Istiadat & Budaya Daerah',
    'Penemuan & Tokoh Modern Indonesia',
    'Permainan Tradisional Indonesia'
  ];

  // Gemini
  private ai: GoogleGenAI;

  constructor() {
    // Load coins
    const savedCoins = localStorage.getItem(this.STORAGE_KEY);
    if (savedCoins) {
      this.coins.set(parseInt(savedCoins, 10));
    }

    // Load Profile
    const savedProfile = localStorage.getItem(this.PROFILE_KEY);
    if (savedProfile) {
      this.studentProfile.set(JSON.parse(savedProfile));
    }

    // Initialize Gemini
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] || '' });
  }

  addCoins(amount: number) {
    this.coins.update(c => {
      const newVal = c + amount;
      localStorage.setItem(this.STORAGE_KEY, newVal.toString());
      return newVal;
    });
  }

  saveProfile(profile: StudentProfile) {
    this.studentProfile.set(profile);
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile));
  }

  async generateQuestions(): Promise<Question[]> {
    // 1. Pick a random topic
    const randomTopic = this.topics[Math.floor(Math.random() * this.topics.length)];
    this.currentTopic.set(randomTopic);
    
    // Adjust difficulty based on student level if available
    let levelContext = "umum";
    const profile = this.studentProfile();
    if (profile) {
      levelContext = `siswa tingkat ${profile.level} kelas ${profile.grade}`;
    }

    try {
      // 2. Customize prompt based on topic and student level
      const prompt = `Buatkan 5 soal pilihan ganda bahasa Indonesia untuk ${levelContext}. Topik spesifik: "${randomTopic}". Pastikan faktanya akurat dan edukatif.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { 
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctIndex: { type: Type.INTEGER, description: "Index 0-3 of the correct option" }
              },
              required: ["question", "options", "correctIndex"]
            }
          }
        }
      });

      const text = response.text;
      if (!text) return this.getFallbackQuestions();
      
      return JSON.parse(text) as Question[];

    } catch (error) {
      console.error('Error generating questions:', error);
      return this.getFallbackQuestions();
    }
  }

  private getFallbackQuestions(): Question[] {
    this.currentTopic.set('Pengetahuan Umum (Offline Mode)');
    return [
      {
        question: "Apa warna bendera Indonesia?",
        options: ["Merah Biru", "Merah Putih", "Putih Merah", "Hijau Kuning"],
        correctIndex: 1
      },
      {
        question: "Kapan hari kemerdekaan Indonesia?",
        options: ["17 Agustus", "20 Mei", "1 Oktober", "10 November"],
        correctIndex: 0
      },
      {
        question: "Siapa proklamator kemerdekaan Indonesia?",
        options: ["Soeharto", "B.J. Habibie", "Soekarno & Hatta", "Jenderal Sudirman"],
        correctIndex: 2
      },
      {
        question: "Apa lambang negara Indonesia?",
        options: ["Harimau", "Garuda Pancasila", "Komodo", "Elang Jawa"],
        correctIndex: 1
      },
      {
        question: "Dimana letak Candi Borobudur?",
        options: ["Bali", "Jakarta", "Magelang", "Yogyakarta"],
        correctIndex: 2
      }
    ];
  }
}
