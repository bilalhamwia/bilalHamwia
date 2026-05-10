import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { animate, inView } from 'framer-motion/dom';

@Component({
  selector: 'app-profile-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #container class="profile-root relative max-w-[300px] md:max-w-[450px] mx-auto">
      <!-- Glow behind image -->
      <div #glow class="absolute inset-0 rounded-full blur-3xl opacity-30"
           style="background: radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.2) 50%, transparent 70%);">
      </div>

      <!-- Animated gradient border ring -->
      <div #borderRing class="absolute -inset-[6px] rounded-full"
           style="background: conic-gradient(from 0deg, #6366F1, #8B5CF6, #EC4899, #6366F1); mask: radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px)); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px));">
      </div>

      <!-- Second ring (outer, rotates opposite) -->
      <div #outerRing class="absolute -inset-[12px] rounded-full opacity-40"
           style="background: conic-gradient(from 180deg, #8B5CF6, #EC4899, #6366F1, #8B5CF6); mask: radial-gradient(farthest-side, transparent calc(100% - 1.5px), black calc(100% - 1px)); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 1.5px), black calc(100% - 1px));">
      </div>

      <!-- Image card -->
      <div #imageCard class="glass p-[5px] rounded-full relative z-10"
           style="box-shadow: 0 0 40px rgba(99,102,241,0.15);">
        <div class="bg-gradient-to-br from-primary-start to-primary-end rounded-full overflow-hidden">
          <div #imageWrapper class="aspect-square overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <img #profileImg src="images/profile.png" alt="Profile"
                 class="w-full h-full object-cover"
                 style="will-change: transform;">
          </div>
        </div>
      </div>

      <!-- Orbiting element 1 (sparkle) -->
      <div #orbit1 class="absolute z-20 w-9 h-9 md:w-11 md:h-11 glass rounded-full flex items-center justify-center text-sm md:text-base orbit-decor"
           style="backdrop-filter: blur(8px); box-shadow: 0 0 20px rgba(99,102,241,0.2);">
        ✨
      </div>

      <!-- Orbiting element 2 (code) -->
      <div #orbit2 class="absolute z-20 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-base md:text-lg orbit-decor"
           style="backdrop-filter: blur(8px); box-shadow: 0 0 20px rgba(139,92,246,0.2);">
        💻
      </div>

      <!-- Floating dots -->
      <div #dot1 class="absolute w-2 h-2 rounded-full bg-primary-start/50 z-20"></div>
      <div #dot2 class="absolute w-1.5 h-1.5 rounded-full bg-primary-end/40 z-20"></div>
      <div #dot3 class="absolute w-1 h-1 rounded-full bg-pink-400/40 z-20"></div>
    </div>
  `,
  styles: [`
    .profile-root {
      will-change: transform;
    }
    .orbit-decor {
      pointer-events: none;
      transition: box-shadow 0.3s ease;
    }
  `]
})
export class ProfileImageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') container!: ElementRef;
  @ViewChild('glow') glow!: ElementRef;
  @ViewChild('borderRing') borderRing!: ElementRef;
  @ViewChild('outerRing') outerRing!: ElementRef;
  @ViewChild('imageCard') imageCard!: ElementRef;
  @ViewChild('imageWrapper') imageWrapper!: ElementRef;
  @ViewChild('profileImg') profileImg!: ElementRef;
  @ViewChild('orbit1') orbit1!: ElementRef;
  @ViewChild('orbit2') orbit2!: ElementRef;
  @ViewChild('dot1') dot1!: ElementRef;
  @ViewChild('dot2') dot2!: ElementRef;
  @ViewChild('dot3') dot3!: ElementRef;

  private cleanupFns: VoidFunction[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initEntranceAnimation();
      this.initFloating();
      this.initGlowPulse();
      this.initBorderRotation();
      this.initOrbitingElements();
      this.initFloatingDots();
      this.initTiltEffect();
    }
  }

  ngOnDestroy() {
    this.cleanupFns.forEach(fn => fn());
  }

  private initEntranceAnimation() {
    const el = this.container.nativeElement;
    const img = this.profileImg.nativeElement;

    const stopInView = inView(el, () => {
      animate(el, {
        scale: [0.85, 1],
        opacity: [0, 1],
      }, { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] });

      animate(img, {
        scale: [1.15, 1],
      }, { duration: 1, ease: [0.34, 1.56, 0.64, 1] });

      return () => {};
    });
    this.cleanupFns.push(stopInView);
  }

  private initFloating() {
    const el = this.container.nativeElement;
    const controls = animate(el, {
      y: [-6, 6, -6],
    }, {
      duration: 4.5,
      repeat: Infinity,
      ease: 'easeInOut',
    });
  }

  private initGlowPulse() {
    const el = this.glow.nativeElement;
    animate(el, {
      scale: [1, 1.15, 1],
      opacity: [0.25, 0.5, 0.25],
    }, {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    });
  }

  private initBorderRotation() {
    const innerRing = this.borderRing.nativeElement;
    animate(innerRing, {
      rotate: [0, 360],
    }, {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    });

    const outerRing = this.outerRing.nativeElement;
    animate(outerRing, {
      rotate: [360, 0],
    }, {
      duration: 12,
      repeat: Infinity,
      ease: 'linear',
    });
  }

  private initOrbitingElements() {
    const container = this.container.nativeElement;
    const cardSize = container.offsetWidth || 300;
    const orbitRadius = cardSize * 0.65;

    const orbit1El = this.orbit1.nativeElement;
    const orbit2El = this.orbit2.nativeElement;

    const controls1 = animate(orbit1El, {
      x: [0, orbitRadius * 0.7, orbitRadius, orbitRadius * 0.7, 0, -orbitRadius * 0.7, -orbitRadius, -orbitRadius * 0.7, 0],
      y: [-orbitRadius, -orbitRadius * 0.7, 0, orbitRadius * 0.7, orbitRadius, orbitRadius * 0.7, 0, -orbitRadius * 0.7, -orbitRadius],
      scale: [0.8, 1, 1.1, 1, 0.8, 1, 1.1, 1, 0.8],
    }, {
      duration: 10,
      repeat: Infinity,
      ease: 'linear',
    });

    const controls2 = animate(orbit2El, {
      x: [0, orbitRadius * 0.5, orbitRadius * 0.7, orbitRadius * 0.5, 0, -orbitRadius * 0.5, -orbitRadius * 0.7, -orbitRadius * 0.5, 0],
      y: [orbitRadius, orbitRadius * 0.5, 0, -orbitRadius * 0.5, -orbitRadius, -orbitRadius * 0.5, 0, orbitRadius * 0.5, orbitRadius],
      scale: [1, 1.1, 0.9, 1.1, 1, 1.1, 0.9, 1.1, 1],
    }, {
      duration: 13,
      repeat: Infinity,
      ease: 'linear',
    });
  }

  private initFloatingDots() {
    const dots = [
      { el: this.dot1.nativeElement, xRange: 40, yRange: 30, dur: 3.5, delay: 0 },
      { el: this.dot2.nativeElement, xRange: -35, yRange: 25, dur: 4.2, delay: 0.8 },
      { el: this.dot3.nativeElement, xRange: 30, yRange: -35, dur: 3.8, delay: 1.5 },
    ];

    dots.forEach(({ el, xRange, yRange, dur, delay }) => {
      setTimeout(() => {
        animate(el, {
          x: [0, xRange, 0],
          y: [0, yRange, 0],
          opacity: [0.4, 0.8, 0.4],
        }, {
          duration: dur,
          repeat: Infinity,
          ease: 'easeInOut',
        });
      }, delay * 1000);
    });
  }

  private initTiltEffect() {
    const card = this.imageCard.nativeElement;
    const container = this.container.nativeElement;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      animate(card, {
        rotateY: x * 18,
        rotateX: -y * 18,
      }, {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      });

      const glowEl = this.glow.nativeElement;
      animate(glowEl, {
        x: x * 15,
        y: y * 15,
      }, {
        duration: 0.5,
        ease: 'easeOut',
      });
    };

    const onLeave = () => {
      animate(card, {
        rotateY: 0,
        rotateX: 0,
      }, {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      });

      animate(this.glow.nativeElement, {
        x: 0,
        y: 0,
      }, {
        duration: 0.8,
        ease: 'easeOut',
      });
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    this.cleanupFns.push(() => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    });
  }
}
