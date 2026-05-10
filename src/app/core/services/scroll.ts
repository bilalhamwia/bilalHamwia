import { Injectable, Inject, PLATFORM_ID, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animate } from 'framer-motion/dom';

export interface ScrollState {
  progress: number;
  direction: 'up' | 'down';
  velocity: number;
  activeSection: string;
}

@Injectable({
  providedIn: 'root',
})
export class Scroll {
  progress = signal(0);
  direction = signal<'up' | 'down'>('down');
  velocity = signal(0);
  activeSection = signal('home');
  isScrolled = signal(false);

  private sectionIds = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
  private lastY = 0;
  private rafId = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this.initScrollTracking();
    }
  }

  private initScrollTracking() {
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(y / max, 1) : 0;

      this.progress.set(p);
      this.isScrolled.set(y > 50);
      this.direction.set(y > this.lastY ? 'down' : 'up');
      this.velocity.set(Math.abs(y - this.lastY));
      this.lastY = y;

      this.updateActiveSection(y);

      this.rafId = requestAnimationFrame(update);
    };

    this.rafId = requestAnimationFrame(update);
  }

  private updateActiveSection(scrollY: number) {
    const offset = 200;
    for (let i = this.sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(this.sectionIds[i]);
      if (el && el.offsetTop - offset <= scrollY) {
        this.activeSection.set(this.sectionIds[i]);
        return;
      }
    }
    this.activeSection.set('home');
  }

  scrollTo(selector: string, offset = 80) {
    const el = document.querySelector(selector);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
