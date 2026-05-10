import { Component, AfterViewInit, Inject, PLATFORM_ID, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scroll } from '../../core/services/scroll';
import { animate } from 'framer-motion/dom';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Back to Top with Progress Ring -->
    <button #backToTop
            class="fixed bottom-8 right-8 w-14 h-14 z-50 flex items-center justify-center"
            style="opacity: 0; visibility: hidden; cursor: pointer;"
            (click)="scroll.scrollToTop()">
      <!-- Progress ring -->
      <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="25" fill="none" stroke="currentColor" stroke-width="2" 
                class="text-gray-200 dark:text-gray-700 opacity-30"/>
        <circle cx="28" cy="28" r="25" fill="none" stroke="url(#progressGrad)" stroke-width="2.5"
                stroke-linecap="round"
                #progressCircle
                style="stroke-dasharray: 157.08; stroke-dashoffset: 157.08; transition: stroke-dashoffset 0.1s ease;"/>
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366F1"/>
            <stop offset="100%" stop-color="#8B5CF6"/>
          </linearGradient>
        </defs>
      </svg>
      <span class="relative z-10 text-sm font-bold text-primary-start">↑</span>
    </button>

    <footer class="py-16 bg-gray-50 dark:bg-black/40">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-200 dark:border-white/10 pb-12 mb-12">
          <div class="text-3xl md:text-4xl font-bold gradient-text">Bilal Hamwia</div>
          <div class="flex gap-8 items-center text-sm font-bold uppercase tracking-widest">
            <a (click)="scroll.scrollTo('#home')" class="hover:text-primary-start transition-colors duration-300 cursor-pointer footer-link">Home</a>
            <a (click)="scroll.scrollTo('#about')" class="hover:text-primary-start transition-colors duration-300 cursor-pointer footer-link">About</a>
            <a (click)="scroll.scrollTo('#portfolio')" class="hover:text-primary-start transition-colors duration-300 cursor-pointer footer-link">Portfolio</a>
            <a (click)="scroll.scrollTo('#contact')" class="hover:text-primary-start transition-colors duration-300 cursor-pointer footer-link">Contact</a>
          </div>
          <div class="flex gap-4">
            <a href="https://github.com/bilalhamwia" target="_blank" class="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-primary-start hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer footer-social">GH</a>
            <a href="https://www.linkedin.com/in/bilal-hamwia0/" target="_blank" class="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-primary-start hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer footer-social">LI</a>
          </div>
        </div>
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <p>© 2026 Bilal Hamwia. Built with Angular &amp; Passion.</p>
          <div class="flex gap-8">
            <a href="#" class="hover:underline hover:text-primary-start transition-colors">Privacy Policy</a>
            <a href="#" class="hover:underline hover:text-primary-start transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('backToTop') backToTopBtn!: ElementRef;
  @ViewChild('progressCircle') progressCircle!: ElementRef;

  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public scroll: Scroll
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => this.initAnimations(), 100);
    }
  }

  private initAnimations() {
    gsap.from('.footer-link', {
      scrollTrigger: { trigger: 'footer', start: 'top 95%' },
      y: 15,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: 'power3.out',
    });

    gsap.from('.footer-social', {
      scrollTrigger: { trigger: 'footer', start: 'top 95%' },
      scale: 0,
      opacity: 0,
      stagger: 0.08,
      duration: 0.4,
      ease: 'back.out(1.7)',
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.isBrowser || !this.backToTopBtn) return;
    const btn = this.backToTopBtn.nativeElement;
    if (window.scrollY > 500) {
      gsap.to(btn, { opacity: 1, visibility: 'visible', duration: 0.3, y: 0, ease: 'power2.out' });
    } else {
      gsap.to(btn, { opacity: 0, visibility: 'hidden', duration: 0.3, ease: 'power2.out' });
    }

    // Update progress ring
    if (this.progressCircle) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      const circumference = 157.08;
      this.progressCircle.nativeElement.style.strokeDashoffset = (circumference * (1 - progress)).toString();
    }
  }
}
