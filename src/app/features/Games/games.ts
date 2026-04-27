import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 px-6 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">Arcade Games</h2>
          <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A collection of classic arcade games reimagined with modern tech. 
            Playable on both desktop and mobile devices.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Pong Card -->
          <div class="group relative bg-white dark:bg-slate-900 rounded-3xl p-1 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden cursor-pointer"
               (click)="playGame('pong')">
            <!-- Animated Border Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-primary-start to-primary-end opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative bg-white dark:bg-slate-900 rounded-[calc(1.5rem-1px)] p-6 h-full flex flex-col">
              <div class="h-48 rounded-2xl mb-6 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                <!-- Simple Pong Graphic -->
                <div class="relative w-full h-full bg-slate-950 flex items-center justify-center">
                  <div class="absolute left-4 w-2 h-16 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
                  <div class="absolute right-4 w-2 h-16 bg-pink-500 shadow-[0_0_10px_#ec4899]"></div>
                  <div class="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
                  <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"></div>
                </div>
              </div>

              <h3 class="text-2xl font-bold mb-2 group-hover:text-primary-start transition-colors">NEON PONG</h3>
              <p class="text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                Experience the classic Pong with a neon aesthetic. Features single-player VS AI and local 2-player modes.
              </p>

              <div class="flex items-center justify-between mt-auto">
                <span class="text-xs font-bold tracking-widest uppercase text-slate-400">Classic Arcade</span>
                <button class="px-6 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm transition-all hover:px-8">
                  PLAY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .gradient-text {
      @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-start to-primary-end;
    }
  `]
})
export class GamesComponent {
  constructor(private router: Router) {}

  playGame(gameId: string) {
    this.router.navigate(['/games', gameId]);
  }
}
