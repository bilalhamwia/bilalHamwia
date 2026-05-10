import { Component, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { animate, inView } from 'framer-motion/dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Experience {
  company: string;
  role: string;
  period: string;
  tagline: string;
  stat: string;
  statLabel: string;
  color: string;
  responsibilities: string[];
  tech: string[];
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section #section
             class="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-black/20">

      <div class="max-w-7xl mx-auto px-6">

        <!-- ========== HEADER ========== -->
        <div class="mb-24 md:mb-36" appScrollReveal revealType="springUp">
          <div class="flex items-center gap-4 mb-5">
            <span class="h-px w-12 md:w-20 bg-current opacity-20"></span>
            <span class="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase opacity-40">The journey</span>
          </div>
          <h2 class="text-5xl md:text-7xl lg:text-8xl font-black leading-none">
            Where I've<br>
            <span class="gradient-text">Worked</span>
          </h2>
        </div>

        <!-- ========== EXPERIENCE 01 — MAIDS.CC ========== -->
        <div data-chapter="1"
             class="relative mb-28 md:mb-44 last:mb-0">

          <!-- ambient glow -->
          <div class="absolute -top-20 -left-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
               style="background: radial-gradient(circle at 30% 30%, rgba(99,102,241,0.06), transparent 70%)"></div>

          <div class="relative md:grid md:grid-cols-12 md:gap-6">

            <!-- === LEFT ZONE: typographic anchor === -->
            <div class="md:col-span-7 mb-10 md:mb-0 relative z-10">
              <span data-anim="period"
                    class="block text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-30 mb-4">
                {{ experiences[0].period }}
              </span>

              <h3 data-anim="role-title"
                  class="text-[clamp(2.5rem,9vw,7rem)] md:text-[clamp(3.5rem,5vw,7.5rem)] 
                         font-black leading-[0.88] tracking-tight mb-1">
                <span class="block">Software</span>
                <span class="block gradient-text">Engineer</span>
              </h3>

              <div data-anim="company-line"
                   class="flex items-center gap-4 mt-5 md:mt-7">
                <span class="w-10 h-[2px] rounded-full shrink-0 opacity-40"
                      style="background: #6366F1"></span>
                <span class="text-base md:text-lg font-semibold opacity-50">{{ experiences[0].company }}</span>
              </div>
            </div>

            <!-- === RIGHT ZONE: details === -->
            <div class="md:col-span-4 md:col-start-9 relative z-10">
              <div data-anim="stat-block"
                   class="mb-8 md:mb-10">
                <div class="stat-number text-5xl md:text-6xl lg:text-7xl font-black leading-none gradient-text mb-1">
                  {{ experiences[0].stat }}
                </div>
                <div class="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-30">
                  {{ experiences[0].statLabel }} of Impact
                </div>
              </div>

              <div data-anim="resp-group"
                   class="space-y-2.5 md:space-y-3 mb-8 md:mb-10">
                <div *ngFor="let r of experiences[0].responsibilities"
                     class="resp-item flex items-start gap-3 group cursor-default">
                  <span class="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0 transition-all duration-300"
                        style="background: #6366F1; opacity: 0.5"></span>
                  <span class="text-sm opacity-40 group-hover:opacity-70 transition-opacity duration-300">{{ r }}</span>
                </div>
              </div>

              <div data-anim="tech-group"
                   class="flex flex-wrap gap-2">
                <span *ngFor="let t of experiences[0].tech; let i = index"
                      class="px-3 py-1.5 text-xs font-semibold rounded-full border cursor-default
                             transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                      [style]="getPillStyle(0, i)">
                  {{ t }}
                </span>
              </div>
            </div>

          </div>
        </div>

        <!-- ========== DIVIDER ========== -->
        <div data-anim="divider"
             class="relative mb-28 md:mb-44">
          <div class="flex items-center gap-4 md:gap-6">
            <span class="h-px flex-1 bg-current opacity-[0.06]"></span>
            <div class="flex items-center gap-3">
              <span class="divider-dot w-1.5 h-1.5 rounded-full bg-current opacity-20"
                    style="animation-delay: 0s"></span>
              <span class="text-[10px] font-bold tracking-[0.3em] uppercase opacity-20">Continuum</span>
              <span class="divider-dot w-1.5 h-1.5 rounded-full bg-current opacity-20"
                    style="animation-delay: 1.5s"></span>
            </div>
            <span class="h-px flex-1 bg-current opacity-[0.06]"></span>
          </div>
        </div>

        <!-- ========== EXPERIENCE 02 — FREELANCER ========== -->
        <div data-chapter="2"
             class="relative mb-16 last:mb-0">

          <!-- ambient glow -->
          <div class="absolute -bottom-20 -right-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
               style="background: radial-gradient(circle at 70% 70%, rgba(236,72,153,0.06), transparent 70%)"></div>

          <div class="relative md:grid md:grid-cols-12 md:gap-6">

            <!-- === LEFT ZONE: details === -->
            <div class="md:col-span-4 md:col-start-1 mb-10 md:mb-0 relative z-10">
              <div data-anim="stat-block"
                   class="mb-8 md:mb-10">
                <div class="stat-number text-5xl md:text-6xl lg:text-7xl font-black leading-none gradient-text mb-1">
                  {{ experiences[1].stat }}
                </div>
                <div class="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-30">
                  {{ experiences[1].statLabel }} of Experience
                </div>
              </div>

              <div data-anim="resp-group"
                   class="space-y-2.5 md:space-y-3 mb-8 md:mb-10">
                <div *ngFor="let r of experiences[1].responsibilities"
                     class="resp-item resp-item--left flex items-start gap-3 group cursor-default">
                  <span class="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0 transition-all duration-300"
                        style="background: #EC4899; opacity: 0.5"></span>
                  <span class="text-sm opacity-40 group-hover:opacity-70 transition-opacity duration-300">{{ r }}</span>
                </div>
              </div>

              <div data-anim="tech-group"
                   class="flex flex-wrap gap-2">
                <span *ngFor="let t of experiences[1].tech; let i = index"
                      class="px-3 py-1.5 text-xs font-semibold rounded-full border cursor-default
                             transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                      [style]="getPillStyle(1, i)">
                  {{ t }}
                </span>
              </div>
            </div>

            <!-- === RIGHT ZONE: typographic anchor === -->
            <div class="md:col-span-7 md:col-start-6 md:text-right relative z-10">
              <span data-anim="period"
                    class="block text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-30 mb-4">
                {{ experiences[1].period }}
              </span>

              <h3 data-anim="role-title"
                  class="text-[clamp(2.5rem,9vw,7rem)] md:text-[clamp(3.5rem,5vw,7.5rem)] 
                         font-black leading-[0.88] tracking-tight mb-1">
                <span class="block">Backend</span>
                <span class="block gradient-text">Developer</span>
              </h3>

              <div data-anim="company-line"
                   class="flex items-center justify-end gap-4 mt-5 md:mt-7">
                <span class="text-base md:text-lg font-semibold opacity-50">{{ experiences[1].company }}</span>
                <span class="w-10 h-[2px] rounded-full shrink-0 opacity-40"
                      style="background: #EC4899"></span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .stat-number {
      transition: filter 0.4s ease;
    }
    .stat-number:hover {
      filter: brightness(1.2) drop-shadow(0 0 12px rgba(99,102,241,0.2));
    }
    [data-chapter="2"] .stat-number:hover {
      filter: brightness(1.2) drop-shadow(0 0 12px rgba(236,72,153,0.2));
    }

    .resp-item {
      transition: transform 0.3s ease;
    }
    .resp-item:hover {
      transform: translateX(5px);
    }

    @keyframes breathe {
      0%, 100% { opacity: 0.12; transform: scale(1); }
      50% { opacity: 0.35; transform: scale(1.6); }
    }
    .divider-dot {
      animation: breathe 3s ease-in-out infinite;
    }

    h3[data-anim="role-title"] {
      overflow-wrap: break-word;
    }
  `]
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('section') section!: ElementRef;

  private cleanupFns: VoidFunction[] = [];
  private isBrowser: boolean;

  experiences: Experience[] = [
    {
      company: 'Maids.cc',
      role: 'Software Engineer',
      period: 'Aug 2022 \u2014 Present',
      tagline: '',
      stat: '3+',
      statLabel: 'Years',
      color: '#6366F1',
      responsibilities: [
        'Developed backend services using Java and Spring Boot',
        'Designed and optimized MySQL database structures',
        'Collaborated closely with cross-functional teams to integrate new features',
        'Conducted code reviews and manual testing',
      ],
      tech: ['Java', 'Spring Boot', 'MySQL', 'Jira'],
    },
    {
      company: 'Freelancer',
      role: 'Backend Developer',
      period: 'Jan 2020 \u2014 Aug 2022',
      tagline: '',
      stat: '2',
      statLabel: 'Years',
      color: '#EC4899',
      responsibilities: [
        'Designed RESTful APIs for web platforms',
        'Built scalable backend services with Spring Boot',
        'Implemented secure authentication and integrations',
        'Managed backend architecture and database structures',
      ],
      tech: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => this.initAnimations(), 80);
    }
  }

  ngOnDestroy() {
    this.cleanupFns.forEach(fn => fn());
  }

  getPillStyle(expIdx: number, techIdx: number): Record<string, string> {
    const c = this.experiences[expIdx].color;
    const a = 0.08 + techIdx * 0.03;
    const ba = 0.15 + techIdx * 0.04;
    return {
      borderColor: `${c}${Math.round(ba * 255).toString(16).padStart(2, '0')}`,
      background: `${c}${Math.round(a * 255).toString(16).padStart(2, '0')}`,
      color: c,
    };
  }

  private q(selector: string): Element | null {
    return this.section?.nativeElement?.querySelector(selector) ?? null;
  }

  private initAnimations() {
    const el = this.section.nativeElement;

    const stopInView = inView(el, () => {

      // ch1
      const c1 = '[data-chapter="1"]';

      const c1p = el.querySelectorAll(`${c1} [data-anim="period"]`);
      if (c1p.length) animate(c1p, { y: [8, 0], opacity: [0, 1] }, { duration: 0.35, delay: 0.15 });

      const c1r = el.querySelectorAll(`${c1} [data-anim="role-title"]`);
      if (c1r.length) animate(c1r, { y: [45, 0], scale: [0.96, 1], opacity: [0, 1] }, { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 });

      const c1c = el.querySelectorAll(`${c1} [data-anim="company-line"]`);
      if (c1c.length) animate(c1c, { x: [-25, 0], opacity: [0, 1] }, { duration: 0.45, delay: 0.35, ease: 'easeOut' });

      const c1s = el.querySelectorAll(`${c1} [data-anim="stat-block"]`);
      if (c1s.length) animate(c1s, { scale: [0.85, 1], opacity: [0, 1] }, { duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay: 0.45 });

      const c1resp = el.querySelectorAll(`${c1} [data-anim="resp-group"] .resp-item`);
      if (c1resp.length) animate(c1resp, { x: [12, 0], opacity: [0, 1] }, { duration: 0.35, delay: 0.55, ease: 'easeOut' });

      const c1tech = el.querySelectorAll(`${c1} [data-anim="tech-group"] span`);
      if (c1tech.length) animate(c1tech, { y: [10, 0], opacity: [0, 1] }, { duration: 0.3, delay: 0.65, ease: 'easeOut' });

      // divider
      const dv = el.querySelectorAll('[data-anim="divider"]');
      if (dv.length) animate(dv, { opacity: [0, 1] }, { duration: 0.5, delay: 0.75 });

      // ch2
      const c2 = '[data-chapter="2"]';

      const c2s = el.querySelectorAll(`${c2} [data-anim="stat-block"]`);
      if (c2s.length) animate(c2s, { scale: [0.85, 1], opacity: [0, 1] }, { duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay: 0.9 });

      const c2resp = el.querySelectorAll(`${c2} [data-anim="resp-group"] .resp-item`);
      if (c2resp.length) animate(c2resp, { x: [-12, 0], opacity: [0, 1] }, { duration: 0.35, delay: 1.0, ease: 'easeOut' });

      const c2tech = el.querySelectorAll(`${c2} [data-anim="tech-group"] span`);
      if (c2tech.length) animate(c2tech, { y: [10, 0], opacity: [0, 1] }, { duration: 0.3, delay: 1.1, ease: 'easeOut' });

      const c2p = el.querySelectorAll(`${c2} [data-anim="period"]`);
      if (c2p.length) animate(c2p, { y: [8, 0], opacity: [0, 1] }, { duration: 0.35, delay: 0.85 });

      const c2r = el.querySelectorAll(`${c2} [data-anim="role-title"]`);
      if (c2r.length) animate(c2r, { y: [45, 0], scale: [0.96, 1], opacity: [0, 1] }, { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.9 });

      const c2c = el.querySelectorAll(`${c2} [data-anim="company-line"]`);
      if (c2c.length) animate(c2c, { x: [25, 0], opacity: [0, 1] }, { duration: 0.45, delay: 1.0, ease: 'easeOut' });

      return () => {};
    }, { amount: 0.08 });

    this.cleanupFns.push(stopInView);
  }
}
