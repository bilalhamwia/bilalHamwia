import { Component, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, inView } from 'framer-motion/dom';

interface SocialLink {
  name: string;
  url: string;
  color: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-24 max-w-7xl mx-auto px-6" #contactSection>
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 gradient-text inline-block">Get In Touch</h2>
        <p class="opacity-70 max-w-xl mx-auto text-lg">
          Let's connect. Reach out through any of the platforms below.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto" #socialGrid>
        <a *ngFor="let link of socialLinks; let i = index"
           [href]="link.url"
           target="_blank"
           rel="noopener noreferrer"
           class="social-card group relative overflow-hidden rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer"
           [style.--hover-color]="link.color"
           [attr.data-index]="i">
          <!-- Background hover fill -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
               [style.background]="link.color"></div>

          <!-- Glass base -->
          <div class="absolute inset-0 glass rounded-2xl group-hover:opacity-0 transition-opacity duration-500"></div>

          <!-- SVG Icon -->
          <div class="relative z-10 w-14 h-14 rounded-full bg-primary-start/10 dark:bg-white/10 flex items-center justify-center social-icon">
            <ng-container [ngSwitch]="link.name">
              <svg *ngSwitchCase="'GitHub'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-primary-start dark:text-white">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              <svg *ngSwitchCase="'LinkedIn'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-primary-start dark:text-white">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              <svg *ngSwitchCase="'Email'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-primary-start dark:text-white">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <svg *ngSwitchCase="'WhatsApp'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-primary-start dark:text-white">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
              </svg>
              <svg *ngSwitchCase="'Instagram'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-primary-start dark:text-white">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <svg *ngSwitchCase="'Facebook'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-primary-start dark:text-white">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </ng-container>
          </div>

          <!-- Label -->
          <span class="relative z-10 text-sm font-bold tracking-wider opacity-70 group-hover:opacity-100 group-hover:text-white transition-all duration-300">
            {{ link.name }}
          </span>

          <!-- Hover ring -->
          <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500"></div>
        </a>
      </div>

      <div class="text-center mt-16">
        <p class="text-sm opacity-50">or email me directly at</p>
        <a href="mailto:bilal.hamwia1@gmail.com"
           class="text-xl font-bold gradient-text hover:opacity-80 transition-opacity inline-block mt-1">
          bilal.hamwia1&#64;gmail.com
        </a>
      </div>
    </div>
  `,
  styles: [`
    .social-card {
      min-height: 140px;
      will-change: transform;
    }
    .social-card .social-icon {
      will-change: transform;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .social-card:hover .social-icon {
      transform: scale(1.15) rotate(-6deg);
    }
  `]
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('socialGrid') socialGrid!: ElementRef;

  private isBrowser: boolean;
  private cleanupFns: VoidFunction[] = [];

  socialLinks: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/bilalhamwia', color: 'linear-gradient(135deg, #333, #000)' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/bilal-hamwia0/', color: 'linear-gradient(135deg, #0077B5, #004d7a)' },
    { name: 'Email', url: 'mailto:bilal.hamwia1@gmail.com', color: 'linear-gradient(135deg, #EA4335, #c5221f)' },
    { name: 'WhatsApp', url: 'https://wa.me/963932329731', color: 'linear-gradient(135deg, #25D366, #128C7E)' },
    { name: 'Instagram', url: 'https://www.instagram.com/bilal_hamwia/', color: 'linear-gradient(135deg, #E4405F, #833AB4, #FCAF45)' },
    { name: 'Facebook', url: 'https://www.facebook.com/BilalHamwia/', color: 'linear-gradient(135deg, #1877F2, #0d65d9)' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => this.initAnimations(), 100);
    }
  }

  ngOnDestroy() {
    this.cleanupFns.forEach(fn => fn());
  }

  private initAnimations() {
    const cards = this.socialGrid.nativeElement.querySelectorAll('.social-card');

    const stopInView = inView(this.socialGrid.nativeElement, () => {
      animate(cards, {
        scale: [0.8, 1],
        opacity: [0, 1],
        y: [30, 0],
      }, {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      });

      return () => {};
    }, { amount: 0.3 });
    this.cleanupFns.push(stopInView);

    cards.forEach((card: HTMLElement, i: number) => {
      card.addEventListener('mouseenter', () => {
        animate(card, {
          y: -8,
          scale: 1.04,
        }, {
          duration: 0.35,
          ease: [0.34, 1.56, 0.64, 1],
        });
      });

      card.addEventListener('mouseleave', () => {
        animate(card, {
          y: 0,
          scale: 1,
        }, {
          duration: 0.35,
          ease: [0.34, 1.56, 0.64, 1],
        });
      });
    });
  }
}
