import { Component, AfterViewInit, Inject, PLATFORM_ID, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Back to Top -->
    <button #backToTop
            class="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary-start text-white shadow-lg z-50 flex items-center justify-center text-xl hover:shadow-xl hover:shadow-primary-start/30 transition-shadow"
            style="opacity: 0; visibility: hidden;"
            (click)="scrollToTop()">
      ↑
    </button>

    <footer class="py-12 bg-gray-50 dark:bg-black/40">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-200 dark:border-white/10 pb-12 mb-12">
          <div class="text-3xl font-bold gradient-text">Bilal Hamwia</div>
          <div class="flex gap-8 items-center text-sm font-bold uppercase tracking-widest">
            <a href="#home" class="hover:text-primary-start transition-colors footer-link">Home</a>
            <a href="#about" class="hover:text-primary-start transition-colors footer-link">About</a>
            <a href="#portfolio" class="hover:text-primary-start transition-colors footer-link">Portfolio</a>
            <a href="#contact" class="hover:text-primary-start transition-colors footer-link">Contact</a>
          </div>
          <div class="flex gap-4 footer-socials">
            <a class="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-primary-start hover:text-white transition-all cursor-pointer social-icon">🔗</a>
            <a class="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-primary-start hover:text-white transition-all cursor-pointer social-icon">🐦</a>
            <a class="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-primary-start hover:text-white transition-all cursor-pointer social-icon">💻</a>
          </div>
        </div>
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <p>© 2026 Bilal Hamwia. Built with Angular & GSAP.</p>
          <div class="flex gap-8">
            <a href="#" class="hover:underline">Privacy Policy</a>
            <a href="#" class="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('backToTop') backToTopBtn!: ElementRef;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 95%',
      },
      y: 15,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: 'power3.out',
    });

    gsap.from('.social-icon', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 95%',
      },
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: 'back.out(1.7)',
    });

    gsap.from('.footer-socials', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 95%',
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.isBrowser || !this.backToTopBtn) return;
    const btn = this.backToTopBtn.nativeElement;
    if (window.scrollY > 500) {
      gsap.to(btn, { opacity: 1, visibility: 'visible', duration: 0.3, y: 0 });
    } else {
      gsap.to(btn, { opacity: 0, visibility: 'hidden', duration: 0.3 });
    }
  }

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
