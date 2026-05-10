import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  template: `
    <div class="py-24 max-w-7xl mx-auto px-6 overflow-hidden" #aboutContainer>
      <div class="grid md:grid-cols-2 gap-16 items-start">
        <div #aboutContent>
          <h2 class="text-4xl font-bold mb-8 gradient-text inline-block about-title">About Me</h2>
          <p class="text-lg mb-6 opacity-80 leading-relaxed about-p">
            With over 5 years of specialized experience in Backend Development, I focus on building 
            robust, scalable systems using Java and Spring Boot. My approach combines 
            deep technical expertise with a passion for clean code and performance tuning.
          </p>
          <div class="space-y-4 mb-10 about-list">
            <div class="flex items-center gap-4">
              <span class="w-12 h-12 glass rounded-full flex items-center justify-center text-primary-start">✔</span>
              <span>Java & Spring Boot Expert</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="w-12 h-12 glass rounded-full flex items-center justify-center text-primary-start">✔</span>
              <span>RESTful API & Microservices Specialist</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="w-12 h-12 glass rounded-full flex items-center justify-center text-primary-start">✔</span>
              <span>Scalable Database Design (MySQL)</span>
            </div>
          </div>

          <div class="mb-10 education-section">
            <h3 class="text-2xl font-bold mb-6 gradient-text inline-block">Education</h3>
            <div #educationCard class="glass p-6 rounded-2xl border-l-4 border-primary-start group hover:scale-[1.02] transition-transform duration-300">
              <div class="flex items-center gap-1 mb-2">
                <span class="w-2 h-2 bg-primary-start rounded-full animate-pulse"></span>
                <span class="w-2 h-2 bg-primary-start rounded-full animate-pulse" style="animation-delay: 0.3s"></span>
                <span class="w-2 h-2 bg-primary-start rounded-full animate-pulse" style="animation-delay: 0.6s"></span>
              </div>
              <h4 class="text-xl font-bold">Bachelor Degree in Information Technology</h4>
              <p class="text-primary-start font-semibold">Arab International University</p>
              <div class="flex justify-between items-center mt-2 opacity-70 text-sm">
                <span>📍 Damascus, Syria</span>
                <span>🎓 2015 – 2022</span>
              </div>
            </div>
          </div>

          <a href="assets/cv.pdf" download class="btn-primary about-btn inline-block">Download CV</a>
        </div>

        <div class="space-y-8" #skillsSection>
          <h3 class="text-2xl font-bold mb-6 skills-title">Technical Expertise</h3>
          
          <div *ngFor="let skill of skills; let i = index" class="space-y-2 skill-item">
            <div class="flex justify-between font-semibold">
              <span>{{ skill.name }}</span>
              <span #percentLabel>{{ skill.level }}%</span>
            </div>
            <div class="h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-primary-start to-primary-end skill-bar rounded-full"
                   [attr.data-level]="skill.level"
                   style="width: 0%">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4 mt-12 tech-grid">
            <div *ngFor="let tech of techStack" appTilt [tiltMax]="15" [tiltScale]="1.05"
                 class="glass p-4 rounded-xl flex items-center justify-center text-3xl cursor-pointer tech-icon group"
                 [title]="tech.name">
              <span class="group-hover:scale-110 transition-transform duration-300">{{ tech.icon }}</span>
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initAnimations();
      }, 100);
    }
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  private initAnimations() {
    const leftTl = gsap.timeline({
      scrollTrigger: {
        trigger: this.aboutContent.nativeElement,
        start: 'top 80%',
      }
    });

    leftTl.from('.about-title', { y: 30, opacity: 0, duration: 0.8, immediateRender: false })
          .from('.about-p', { y: 20, opacity: 0, duration: 0.8, immediateRender: false }, '-=0.4')
          .from('.about-list > div', { x: -20, opacity: 0, stagger: 0.12, duration: 0.6, immediateRender: false }, '-=0.4')
          .from(this.educationCard.nativeElement, { y: 30, opacity: 0, duration: 0.6, immediateRender: false }, '-=0.2')
          .from('.about-btn', { scale: 0.8, opacity: 0, duration: 0.5, clearProps: 'all', immediateRender: false }, '-=0.2');

    gsap.from('.skills-title', {
      scrollTrigger: { trigger: '.skills-title', start: 'top 90%' },
      opacity: 0,
      y: 20,
      duration: 1
    });

    const skillBars = gsap.utils.toArray('.skill-bar') as HTMLElement[];
    const percentLabels = this.skillsSection.nativeElement.querySelectorAll('#percentLabel') || [];
    
    skillBars.forEach((bar, idx) => {
      const level = parseInt(bar.getAttribute('data-level') || '0', 10);
      gsap.to(bar, {
        scrollTrigger: {
          trigger: bar,
          start: 'top 95%',
        },
        width: `${level}%`,
        duration: 1.5,
        ease: 'power3.out',
        onStart: () => {
          const obj = { value: 0 };
          gsap.to(obj, {
            value: level,
            duration: 1.5,
            ease: 'power3.out',
            onUpdate: () => {
              percentLabels[idx].textContent = `${Math.round(obj.value)}%`;
            },
          });
        },
      });
    });

    const skillItems = gsap.utils.toArray('.skill-item');
    gsap.from(skillItems, {
      scrollTrigger: {
        trigger: '.skills-title',
        start: 'top 85%',
      },
      x: -30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power3.out',
    });

    gsap.from('.tech-icon', {
      scrollTrigger: {
        trigger: '.tech-grid',
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      scale: 0,
      opacity: 0,
      stagger: 0.06,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });

    ScrollTrigger.refresh();
  }
}
