import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, inView } from 'framer-motion/dom';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TiltDirective, ScrollRevealDirective],
  template: `
    <div class="py-24 md:py-32 max-w-7xl mx-auto px-6 overflow-hidden" #aboutContainer>
      <div class="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
        <div #aboutContent appScrollReveal revealType="springUp" revealStart="top 85%">
          <h2 class="text-4xl md:text-5xl font-bold mb-8 gradient-text inline-block">About Me</h2>
          <p class="text-lg mb-6 opacity-80 leading-relaxed">
            With over 5 years of specialized experience in Backend Development, I focus on building 
            robust, scalable systems using Java and Spring Boot. My approach combines 
            deep technical expertise with a passion for clean code and performance tuning.
          </p>
          <div class="space-y-4 mb-10 about-list">
            <div *ngFor="let item of highlights" class="flex items-center gap-4 group">
              <span class="w-12 h-12 glass rounded-full flex items-center justify-center text-primary-start group-hover:scale-110 transition-transform duration-300">{{ item.icon }}</span>
              <span>{{ item.text }}</span>
            </div>
          </div>

          <div class="mb-10">
            <h3 class="text-2xl font-bold mb-6 gradient-text inline-block">Education</h3>
            <div #educationCard class="glass p-6 md:p-8 rounded-2xl border-l-4 border-primary-start group hover:scale-[1.02] transition-all duration-500 hover:shadow-xl hover:shadow-primary-start/10">
              <div class="flex items-center gap-1 mb-3">
                <span class="w-2 h-2 bg-primary-start rounded-full animate-pulse"></span>
                <span class="w-2 h-2 bg-primary-start rounded-full animate-pulse" style="animation-delay: 0.3s"></span>
                <span class="w-2 h-2 bg-primary-start rounded-full animate-pulse" style="animation-delay: 0.6s"></span>
              </div>
              <h4 class="text-xl font-bold">Bachelor Degree in Information Technology</h4>
              <p class="text-primary-start font-semibold mt-1">Arab International University</p>
              <div class="flex justify-between items-center mt-3 opacity-70 text-sm">
                <span>Damascus, Syria</span>
                <span>2015 – 2022</span>
              </div>
            </div>
          </div>

          <a href="assets/cv.pdf" download 
             class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary-start to-primary-end hover:shadow-xl hover:shadow-primary-start/30 hover:scale-105">
            <span>Download CV</span>
            <span>↓</span>
          </a>
        </div>

        <div class="space-y-8" #skillsSection>
          <h3 class="text-2xl font-bold mb-6" appScrollReveal revealType="springUp">Technical Expertise</h3>
          
          <div *ngFor="let skill of skills; let i = index" class="space-y-2 skill-item" appScrollReveal revealType="slideUp" [revealDelay]="i * 0.1">
            <div class="flex justify-between font-semibold">
              <span>{{ skill.name }}</span>
              <span #percentLabel>{{ skill.level }}%</span>
            </div>
            <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-primary-start to-primary-end skill-bar rounded-full"
                   [attr.data-level]="skill.level"
                   style="width: 0%">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4 mt-12" appScrollReveal revealType="scale" [revealStagger]="0.05" revealTarget=".tech-icon">
            <div *ngFor="let tech of techStack" appTilt [tiltMax]="12" [tiltScale]="1.05"
                 class="glass p-4 rounded-xl flex items-center justify-center text-3xl cursor-pointer tech-icon group hover:bg-primary-start/10 transition-all duration-300"
                 [title]="tech.name">
              <span class="group-hover:scale-125 transition-transform duration-300">{{ tech.icon }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aboutContent') aboutContent!: ElementRef;
  @ViewChild('skillsSection') skillsSection!: ElementRef;
  @ViewChild('educationCard') educationCard!: ElementRef;

  highlights = [
    { icon: '☕', text: 'Java & Spring Boot Expert' },
    { icon: '🔗', text: 'RESTful API & Microservices Specialist' },
    { icon: '🗄️', text: 'Scalable Database Design (MySQL)' },
  ];

  skills = [
    { name: 'Java / Spring Boot', level: 95 },
    { name: 'MySQL / Database Design', level: 90 },
    { name: 'RESTful APIs', level: 95 },
    { name: 'Git / CI/CD', level: 85 },
    { name: 'Microservices', level: 80 }
  ];

  techStack = [
    { name: 'Java', icon: '☕' },
    { name: 'Spring', icon: '🍃' },
    { name: 'MySQL', icon: '🐬' },
    { name: 'Git', icon: '📁' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '⚓' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Maven', icon: '📦' }
  ];

  private cleanupFns: VoidFunction[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initSkillBars();
        this.initEducationCard();
        this.initListReveal();
      }, 150);
    }
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    this.cleanupFns.forEach(fn => fn());
  }

  private initSkillBars() {
    const skillBars = gsap.utils.toArray('.skill-bar') as HTMLElement[];
    
    skillBars.forEach((bar) => {
      const level = parseInt(bar.getAttribute('data-level') || '0', 10);
      const parentEl = bar.closest('.skill-item');
      const label = parentEl?.querySelector('[id]') || bar.parentElement?.previousElementSibling?.querySelector('[id]') || parentEl?.querySelector('[id]');

      const st = ScrollTrigger.create({
        trigger: bar,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(bar, {
            width: `${level}%`,
            duration: 1.8,
            ease: 'power4.out',
          });

          const obj = { value: 0 };
          gsap.to(obj, {
            value: level,
            duration: 1.8,
            ease: 'power4.out',
            onUpdate: () => {
              if (label) {
                label.textContent = `${Math.round(obj.value)}%`;
              }
            },
          });
        },
        once: true,
      });
    });
  }

  private initEducationCard() {
    const stop = inView(this.educationCard.nativeElement, () => {
      animate(this.educationCard.nativeElement, {
        y: [30, 0],
        opacity: [0, 1],
      }, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
      return () => {};
    }, { amount: 0.5 });
    this.cleanupFns.push(stop);
  }

  private initListReveal() {
    const items = this.aboutContent.nativeElement.querySelectorAll('.about-list > div');
    if (items.length) {
      const stop = inView(items[0], () => {
        animate(items as unknown as HTMLElement[], {
          x: [-20, 0],
          opacity: [0, 1],
        }, {
          duration: 0.5,
          delay: 0.08,
          ease: [0.16, 1, 0.3, 1],
        });
        return () => {};
      }, { amount: 0.5 });
      this.cleanupFns.push(stop);
    }
  }
}
