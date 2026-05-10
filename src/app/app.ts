import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header';
import { FooterComponent } from './layouts/footer/footer';
import { AuroraBackgroundComponent } from './shared/components/aurora-background';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, AuroraBackgroundComponent],
  template: `
    <!-- Global Animated Background -->
    <app-aurora-background class="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <!-- Grain Overlay -->
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none grain-texture"></div>
    </app-aurora-background>

    <app-header></app-header>
    <main class="relative z-10">
      <router-outlet></router-outlet>
    </main>
    <app-footer class="relative z-10"></app-footer>
  `,
  styles: [`
    :host { display: block; }
    main { min-height: 100vh; }
    
    .grain-texture {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
  `]
})
export class App {
}
