import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ClippedShapeGalleryComponent, MediaItem } from '../../shared/components/clipped-shape-gallery.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ClippedShapeGalleryComponent],
  template: `
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <!-- Background Shapes (Bubbles) -->
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-start/20 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-end/20 rounded-full blur-3xl animate-pulse delay-1000 -z-10"></div>

      <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10 py-12 lg:py-0 w-full">
        <div #heroContent class="text-center lg:text-left order-2 lg:order-1 relative">
          <h2 class="text-xl md:text-2xl font-semibold mb-4 text-primary-start overflow-hidden">
            <span class="inline-block reveal-text">Hello, I'm</span>
          </h2>
          
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight headline-text text-slate-900 dark:text-white">
            <!-- Text content injected via TS for splitting -->
          </h1>

          <p class="text-lg md:text-xl opacity-80 mb-10 max-w-lg mx-auto lg:mx-0 reveal-text text-slate-600 dark:text-slate-400">
            Software Engineer and R&D Specialist crafting high-performance, 
            visually stunning web applications with modern technologies.
          </p>

          <!-- Social Icons -->
          <div class="flex gap-6 justify-center lg:justify-start mb-10 social-icons">
            <a href="https://github.com/bilalhamwia" target="_blank" class="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 rounded-full text-xl hover:text-primary-start transition-colors social-icon" aria-label="GitHub">
              GH
            </a>
            <a href="https://www.linkedin.com/in/bilal-hamwia0/" target="_blank" class="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 rounded-full text-xl hover:text-primary-start transition-colors social-icon" aria-label="LinkedIn">
              LI
            </a>
            <a href="https://www.facebook.com/BilalHamwia/" target="_blank" class="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 rounded-full text-xl hover:text-primary-start transition-colors social-icon" aria-label="Facebook">
              FB
            </a>
            <a href="https://www.instagram.com/bilal_hamwia/" target="_blank" class="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 rounded-full text-xl hover:text-primary-start transition-colors social-icon" aria-label="Instagram">
              IG
            </a>
          </div>

          <div class="flex flex-wrap gap-4 justify-center lg:justify-start reveal-btn-group">
            <button (click)="scrollTo('#portfolio')" class="px-8 py-3 rounded-full font-bold text-white transition-all duration-300 bg-primary-start hover:bg-primary-end hover:scale-105 shadow-lg relative z-30">
              View My Work
            </button>
            <button (click)="scrollTo('#contact')" class="px-8 py-3 rounded-full font-bold border-2 border-primary-start text-primary-start dark:text-white hover:bg-primary-start/10 transition-colors relative z-30">
              Contact Me
            </button>
          </div>
        </div>

        <div #heroImage class="relative order-1 lg:order-2 max-w-[280px] md:max-w-[380px] lg:max-w-[420px] mx-auto">
          <div class="hero-img-container">
            <!-- Clipped Shape Profile Image -->
            <app-clipped-shape-gallery 
              [items]="profileImage" 
              [columns]="1"
              className="w-full aspect-[4/5]">
            </app-clipped-shape-gallery>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroContent') heroContent!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;

  profileImage: MediaItem[] = [
    {
      src: 'images/profile.png',
      alt: 'Bilal Hamwia Profile',
      clipId: 'clip-another1',
      type: 'image'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initSplitText();
      setTimeout(() => {
        this.initAnimations();
      }, 100);
    }
  }

  private initSplitText() {
    const headlineContainer = this.heroContent.nativeElement.querySelector('.headline-text');
    if (!headlineContainer) return;

    const text = "Architect and build digital Products";
    const words = text.split(' ');
    
    headlineContainer.innerHTML = ''; 
    
    words.forEach((word) => {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('inline-block', 'mr-3');
      
      if (word.toLowerCase().includes('products')) {
        wordSpan.classList.add('text-primary-start');
      }

      word.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.classList.add('char', 'inline-block');
        charSpan.style.opacity = '0';
        charSpan.style.transform = 'translateY(20px)';
        wordSpan.appendChild(charSpan);
      });

      headlineContainer.appendChild(wordSpan);
    });
  }

  private initAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const chars = this.heroContent.nativeElement.querySelectorAll('.char');
    const revealTexts = this.heroContent.nativeElement.querySelectorAll('.reveal-text');
    const socialIcons = this.heroContent.nativeElement.querySelectorAll('.social-icon');
    const buttons = this.heroContent.nativeElement.querySelectorAll('.reveal-btn-group button');

    // 1. Text Reveal (Characters)
    if (chars.length > 0) {
      tl.to(chars, { 
        y: 0, 
        opacity: 1, 
        stagger: 0.02, 
        duration: 0.8, 
        ease: 'back.out(1.7)'
      });
    }

    // 2. Reveal Texts (Hello & Description)
    tl.from(revealTexts, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    }, '-=0.6');

    // 3. Social Icons
    tl.from(socialIcons, {
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, '-=0.4');

    // 4. Buttons (View My Work & Contact)
    tl.fromTo(buttons, 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
      '-=0.4'
    );

    // 5. Image Reveal
    const imageContainer = this.heroImage.nativeElement.querySelector('.hero-img-container');
    if (imageContainer) {
      tl.from(imageContainer, {
        x: 50,
        opacity: 0,
        duration: 1,
      }, '-=0.8');

      this.startFloatingAnimations(imageContainer);
      this.start3DTiltEffect(imageContainer);
    }
  }

  private startFloatingAnimations(element: HTMLElement) {
    gsap.to(element, {
      y: -10, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
  }

  private start3DTiltEffect(element: HTMLElement) {
    const container = this.heroImage.nativeElement;
    container.addEventListener('mousemove', (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(element, {
        rotationY: x * 15,
        rotationX: -y * 15,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    container.addEventListener('mouseleave', () => {
      gsap.to(element, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'power2.out' });
    });
  }

  scrollTo(selector: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector(selector);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}
