import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'framer-motion/dom';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';
import { ProfileImageComponent } from '../../shared/components/profile-image/profile-image';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MagneticDirective, ProfileImageComponent],
  template: `
    <div #heroSection class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
         style="will-change: transform;">
      <!-- Parallax Background Layers -->
      <div #parallaxBg class="absolute inset-0 -z-10 overflow-hidden">
        <div class="absolute top-[15%] left-[10%] w-72 h-72 bg-primary-start/10 rounded-full blur-3xl parallax-layer" data-speed="0.4"></div>
        <div class="absolute bottom-[20%] right-[15%] w-96 h-96 bg-primary-end/8 rounded-full blur-3xl parallax-layer" data-speed="0.25"></div>
        <div class="absolute top-[40%] left-[60%] w-48 h-48 bg-pink-400/8 rounded-full blur-3xl parallax-layer" data-speed="0.15"></div>
      </div>

      <!-- Scroll Indicator -->
      <div #scrollIndicator class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
           style="will-change: opacity, transform;">
        <span class="text-xs font-bold tracking-[0.2em] uppercase opacity-40">Scroll</span>
        <div class="w-[1px] h-12 bg-gradient-to-b from-current to-transparent opacity-30 overflow-hidden">
          <div class="w-full h-full bg-primary-start animate-scroll-indicator"></div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10 py-12 lg:py-0 w-full"
           #heroGrid>
        <div #heroContent class="text-center lg:text-left order-2 lg:order-1 relative">
          <h2 class="text-xl md:text-2xl font-semibold mb-4 text-primary-start overflow-hidden">
            <span class="inline-block reveal-text">Hello, I'm</span>
          </h2>
          
          <h1 class="text-4xl md:text-6xl lg:text-8xl font-black mb-6 leading-tight headline-text text-slate-900 dark:text-white">
          </h1>

          <p #subtitleEl class="text-lg md:text-xl opacity-80 mb-10 max-w-lg mx-auto lg:mx-0 min-h-[2rem] font-medium">
          </p>

          <!-- Social Icons with Magnetic Effect -->
          <div class="flex gap-5 justify-center lg:justify-start mb-10 social-icons">
            <a appMagnetic href="https://github.com/bilalhamwia" class="w-14 h-14 flex items-center justify-center glass rounded-full hover:text-primary-start hover:border-primary-start/40 transition-all duration-300 social-icon border border-white/20 text-slate-700 dark:text-white" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a appMagnetic href="https://www.linkedin.com/in/bilal-hamwia0/" class="w-14 h-14 flex items-center justify-center glass rounded-full hover:text-primary-start hover:border-primary-start/40 transition-all duration-300 social-icon border border-white/20 text-slate-700 dark:text-white" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a appMagnetic href="https://www.facebook.com/BilalHamwia/" class="w-14 h-14 flex items-center justify-center glass rounded-full hover:text-primary-start hover:border-primary-start/40 transition-all duration-300 social-icon border border-white/20 text-slate-700 dark:text-white" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a appMagnetic href="https://www.instagram.com/bilal_hamwia/" class="w-14 h-14 flex items-center justify-center glass rounded-full hover:text-primary-start hover:border-primary-start/40 transition-all duration-300 social-icon border border-white/20 text-slate-700 dark:text-white" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>

          <div class="flex flex-wrap gap-4 justify-center lg:justify-start reveal-btn-group">
            <button appMagnetic (click)="scrollTo('#portfolio')" class="px-8 py-3.5 rounded-full font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary-start to-primary-end hover:shadow-xl hover:shadow-primary-start/30 hover:scale-105 relative z-20">
              View My Work
            </button>
            <button appMagnetic (click)="scrollTo('#contact')" class="px-8 py-3.5 rounded-full font-bold border-2 border-primary-start/50 hover:bg-primary-start/10 hover:border-primary-start transition-all duration-300 relative z-20">
              Contact Me
            </button>
          </div>        
        </div>

        <div class="order-1 lg:order-2 flex items-center justify-center">
          <app-profile-image></app-profile-image>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes scrollIndicator {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    .animate-scroll-indicator {
      animation: scrollIndicator 1.8s ease-in-out infinite;
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('heroContent') heroContent!: ElementRef;
  @ViewChild('subtitleEl') subtitleEl!: ElementRef;
  @ViewChild('scrollIndicator') scrollIndicator!: ElementRef;

  private roles = [
    'Software Engineer & R&D Specialist',
    'Java & Spring Boot Expert',
    'Full-Stack Problem Solver',
    'System Architecture Designer',
  ];
  private typeInterval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      this.initSplitText();
      setTimeout(() => {
        this.initEntranceAnimations();
        this.startTypewriter();
        this.initScrollDrivenEffects();
        this.initParallax();
      }, 50);
    }
  }

  ngOnDestroy() {
    if (this.typeInterval) clearInterval(this.typeInterval);
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  private initSplitText() {
    const headlineContainer = this.heroContent.nativeElement.querySelector('.headline-text');
    if (!headlineContainer) return;

    const text = "Architect and build digital Products";
    const words = text.split(' ');
    
    headlineContainer.innerHTML = ''; 
    
    words.forEach((word) => {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('inline-block', 'mr-3', 'whitespace-nowrap');
      
      const isProducts = word.toLowerCase().includes('products');

      word.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.classList.add('char', 'inline-block');
        if (isProducts) {
          charSpan.classList.add('gradient-text');
        }
        charSpan.style.opacity = '0';
        charSpan.style.transform = 'translateY(30px) rotateX(40deg)';
        wordSpan.appendChild(charSpan);
      });

      headlineContainer.appendChild(wordSpan);
    });
  }

  private initEntranceAnimations() {
    const tl = gsap.timeline();
    const chars = this.heroContent.nativeElement.querySelectorAll('.char');
    const socialIcons = this.heroContent.nativeElement.querySelectorAll('.social-icon');

    if (chars.length > 0) {
      tl.fromTo(chars, 
        { y: 30, opacity: 0, rotateX: 40 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          stagger: 0.025, 
          duration: 0.6, 
          ease: 'power3.out',
        }
      );
    }

    tl.from('.reveal-text', {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.2');

    tl.from(socialIcons, {
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.3');

    tl.fromTo('.reveal-btn-group button', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, 
      '-=0.3'
    );
  }

  private startTypewriter() {
    const el = this.subtitleEl.nativeElement;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentRole = this.roles[roleIndex];

      if (!isDeleting) {
        el.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          isDeleting = true;
          this.typeInterval = setTimeout(type, 2500);
          return;
        }
      } else {
        el.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % this.roles.length;
          this.typeInterval = setTimeout(type, 500);
          return;
        }
      }

      this.typeInterval = setTimeout(type, isDeleting ? 30 : 50);
    };

    setTimeout(type, 1500);
  }

  private initScrollDrivenEffects() {
    const hero = this.heroSection.nativeElement;
    const content = this.heroContent.nativeElement;
    const grid = this.heroContent.nativeElement.closest('.grid') || this.heroSection.nativeElement.querySelector('.grid');
    const indicator = this.scrollIndicator.nativeElement;

    // Hero content fades and scales on scroll
    gsap.to(grid, {
      opacity: 0.3,
      scale: 0.92,
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom 40%',
        scrub: 1,
      },
    });

    // Scroll indicator fades out
    gsap.to(indicator, {
      opacity: 0,
      y: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top 20%',
        end: 'bottom 60%',
        scrub: 0.5,
      },
    });
  }

  private initParallax() {
    const layers = this.heroSection.nativeElement.querySelectorAll('.parallax-layer');
    layers.forEach((layer: any) => {
      const speed = parseFloat(layer.getAttribute('data-speed') || '0.2');
      gsap.to(layer, {
        y: () => window.innerHeight * speed * 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: this.heroSection.nativeElement,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });
  }

  scrollTo(selector: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector(selector);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  }
}
