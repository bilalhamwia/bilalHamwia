import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <!-- Background Shapes (Fallback/Additional depth) -->
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-start/10 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-end/10 rounded-full blur-3xl animate-pulse delay-1000 -z-10"></div>

      <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10 py-12 lg:py-0 w-full">
        <div #heroContent class="text-center lg:text-left order-2 lg:order-1 relative">
          <h2 class="text-xl md:text-2xl font-semibold mb-4 text-primary-start overflow-hidden">
            <span class="inline-block reveal-text">Hello, I'm</span>
          </h2>
          
          <h1 class="text-4xl md:text-6xl lg:text-8xl font-black mb-6 leading-tight headline-text">
            <!-- Text content injected via TS for splitting -->
          </h1>

          <p class="text-lg md:text-xl opacity-80 mb-10 max-w-lg mx-auto lg:mx-0 reveal-text">
            Software Engineer & UI/UX Specialist crafting high-performance, 
            visually stunning web applications with modern technologies.
          </p>

          <!-- Social Icons with Liquid Morph -->
          <div class="flex gap-6 justify-center lg:justify-start mb-10 social-icons">
            <a href="#" class="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-2xl hover:text-primary-start transition-colors social-icon" aria-label="GitHub">
              <i class="fab fa-github">GH</i>
            </a>
            <a href="#" class="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-2xl hover:text-primary-start transition-colors social-icon" aria-label="LinkedIn">
              <i class="fab fa-linkedin">LI</i>
            </a>
            <a href="#" class="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-2xl hover:text-primary-start transition-colors social-icon" aria-label="Twitter">
              <i class="fab fa-twitter">TW</i>
            </a>
             <a href="#" class="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-2xl hover:text-primary-start transition-colors social-icon" aria-label="Email">
              <i class="fas fa-envelope">@</i>
            </a>
          </div>

          <div class="flex flex-wrap gap-4 justify-center lg:justify-start reveal-btn-group">
            <button class="px-8 py-3 rounded-full font-bold text-white transition-all duration-300 bg-primary-start hover:bg-primary-end hover:scale-105 shadow-lg relative z-20">
              View My Work
            </button>
            <button class="px-8 py-3 rounded-full font-bold border-2 border-primary-start hover:bg-primary-start/10 transition-colors glass-btn relative z-20">
              Contact Me
            </button>
          </div>        </div>

        <div #heroImage class="relative order-1 lg:order-2 max-w-[300px] md:max-w-[450px] mx-auto lg:max-w-none">
          <div class="glass p-3 md:p-4 rounded-3xl transform rotate-3 hover:rotate-0 transition-transform duration-500 hero-img-container">
            <!-- Placeholder for Hero Image -->
            <div class="bg-gradient-to-br from-primary-start to-primary-end w-full aspect-square rounded-2xl flex items-center justify-center text-8xl text-white shadow-2xl relative">
              <!-- Profile Image -->        
               <div class="w-full h-full rounded-2xl overflow-hidden shadow-2xl">    
                <img src="images/profile.png" alt="Profile"    
                class="w-full h-full object-cover">  
              </div>
            </div>
          </div>
          <!-- Decorative Elements -->
          <div class="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-16 h-16 md:w-20 md:h-20 glass rounded-full flex items-center justify-center text-xl md:text-2xl z-20 hero-decor decor-1">✨</div>
          <div class="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-20 h-20 md:w-24 md:h-24 glass rounded-full flex items-center justify-center text-2xl md:text-3xl z-20 hero-decor decor-2">💻</div>
        </div>
      </div>
    </div>
  `
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroContent') heroContent!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initSplitText();
      this.initAnimations();
    }
  }

  private initSplitText() {
  // ... (rest of the method)

    // Manually split text to avoid dependency issues with premium plugins
    const headlineContainer = this.heroContent.nativeElement.querySelector('.headline-text');
    const text = "Architect and build digital Products";
    const words = text.split(' ');
    
    headlineContainer.innerHTML = ''; // Clear content
    
    words.forEach((word) => {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('inline-block', 'mr-3', 'whitespace-nowrap'); // Keep words together
      
      if (word.toLowerCase().includes('products')) {
        wordSpan.classList.add('text-primary-start');
      }

      word.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.classList.add('char', 'inline-block');
        charSpan.style.opacity = '0'; // Hide initially
        wordSpan.appendChild(charSpan);
      });

      headlineContainer.appendChild(wordSpan);
    });
  }

  private initAnimations() {
    const tl = gsap.timeline();
    const chars = this.heroContent.nativeElement.querySelectorAll('.char');
    const socialIcons = this.heroContent.nativeElement.querySelectorAll('.social-icon');

    // 1. Text Reveal (Character by Character)
    tl.to(chars, { 
      y: 0, 
      opacity: 1, 
      stagger: 0.03, 
      duration: 0.8, 
      ease: 'back.out(1.7)' 
    });

    // 2. Secondary Text Reveal
    tl.from('.reveal-text', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.5');

    // 3. Social Icons Reveal
    tl.from(socialIcons, {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)'
    }, '-=0.4');

    // 4. Buttons Reveal
    tl.fromTo('.reveal-btn-group button', 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      }, 
    '-=0.4');

    // 5. Image & Decor Reveal
    const imageContainer = this.heroImage.nativeElement.querySelector('.hero-img-container');
    tl.from(imageContainer, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8');

    tl.to('.hero-decor', {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    }, '-=0.4');

    // 6. Floating Animations
    this.startFloatingAnimations();
    this.start3DTiltEffect(imageContainer);
  }

  private startFloatingAnimations() {
    gsap.to('.decor-1', {
      y: -15, rotation: 10, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
    gsap.to('.decor-2', {
      y: 15, rotation: -10, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5
    });
    gsap.to('.hero-img-container', {
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
}
