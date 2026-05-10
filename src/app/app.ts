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
    <!-- Custom Cursor Follower -->
    <div #cursorFollower
         class="fixed w-6 h-6 rounded-full bg-primary-start/20 border border-primary-start/40 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
         style="left: -100px; top: -100px; transition: width 0.3s, height 0.3s;">
    </div>

    <!-- Global Animated Background -->
    <div class="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <!-- Particle System -->
      <app-particle-background></app-particle-background>

      <!-- Animated Blobs with organic paths -->
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
  @ViewChild('cursorFollower') cursorFollower!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initBackgroundAnimations();
      this.initCursorFollower();
    }
  }

  private initCursorFollower() {
    const cursor = this.cursorFollower.nativeElement;
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      gsap.set(cursor, { x: currentX, y: currentY });
    });

    const interactive = document.querySelectorAll('a, button, [appMagnetic]');
    interactive.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
          scale: 1.8,
          borderColor: 'rgba(99, 102, 241, 0.7)',
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
          scale: 1,
          borderColor: 'rgba(99, 102, 241, 0.4)',
          backgroundColor: 'rgba(99, 102, 241, 0.05)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }

  private initBackgroundAnimations() {
    const paths = [
      { x: '25%', y: '15%', s: 1.1 },
      { x: '10%', y: '30%', s: 0.9 },
      { x: '-5%', y: '10%', s: 1.2 },
      { x: '15%', y: '-10%', s: 0.95 },
    ];

    [this.blob1, this.blob2, this.blob3].forEach((blob, i) => {
      const path = paths[i % paths.length];
      gsap.to(blob.nativeElement, {
        x: path.x,
        y: path.y,
        scale: path.s,
        duration: 18 + i * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 1.5,
      });

      gsap.to(blob.nativeElement, {
        opacity: 0.5,
        duration: 6 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i,
      });
    });
  }
}
