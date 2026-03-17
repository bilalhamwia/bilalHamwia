import { Component, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header';
import { FooterComponent } from './layouts/footer/footer';
import { ParticleBackgroundComponent } from './shared/components/particle-background';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ParticleBackgroundComponent],
  template: `
    <!-- Global Animated Background -->
    <div class="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <!-- Particle System -->
      <app-particle-background></app-particle-background>

      <!-- Animated Blobs -->
      <div #blob1 class="absolute w-[600px] h-[600px] rounded-full bg-primary-start/20 blur-[120px] -top-[10%] -left-[10%]"></div>
      <div #blob2 class="absolute w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[100px] top-[40%] -right-[5%]"></div>
      <div #blob3 class="absolute w-[400px] h-[400px] rounded-full bg-primary-end/10 blur-[80px] -bottom-[10%] left-[20%]"></div>
      
      <!-- Grain Overlay -->
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none grain-texture"></div>
    </div>

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
export class App implements AfterViewInit {
  @ViewChild('blob1') blob1!: ElementRef;
  @ViewChild('blob2') blob2!: ElementRef;
  @ViewChild('blob3') blob3!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initBackgroundAnimations();
    }
  }

  private initBackgroundAnimations() {
    // Blob 1: Top-Left movement
    gsap.to(this.blob1.nativeElement, {
      x: '30%',
      y: '20%',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Blob 2: Right-Middle movement
    gsap.to(this.blob2.nativeElement, {
      x: '-20%',
      y: '10%',
      scale: 1.2,
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2
    });

    // Blob 3: Bottom-Left movement
    gsap.to(this.blob3.nativeElement, {
      x: '15%',
      y: '-25%',
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    });

    // Global subtle pulse of colors
    const blobs = [this.blob1.nativeElement, this.blob2.nativeElement, this.blob3.nativeElement];
    blobs.forEach(blob => {
      gsap.to(blob, {
        opacity: 0.6,
        duration: 8 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }
}
