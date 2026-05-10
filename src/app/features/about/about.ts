import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillCardComponent } from '../../shared/components/skill-card';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SkillCardComponent],
  template: `
    <div class="py-24 max-w-7xl mx-auto px-6 overflow-hidden" #aboutContainer>
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <div #aboutContent>
          <h2 class="text-4xl font-bold mb-8 gradient-text inline-block about-title">About Me</h2>
          <p class="text-lg mb-6 opacity-80 leading-relaxed about-p text-balance">
            With over 5 years of specialized experience in Backend Development, I focus on building 
            robust, scalable systems using Java and Spring Boot. My approach combines 
            deep technical expertise with a passion for clean code and performance tuning.
          </p>
          
          <div class="space-y-4 mb-10 about-list">
            <div *ngFor="let item of highlights" class="flex items-center gap-4 group">
              <span class="w-12 h-12 glass rounded-full flex items-center justify-center text-primary-start group-hover:scale-110 transition-transform">✔</span>
              <span class="group-hover:text-primary-start transition-colors">{{ item }}</span>
            </div>
          </div>

          <div class="mb-10 education-section">
            <h3 class="text-2xl font-bold mb-6 gradient-text inline-block">Education</h3>
            <div class="glass p-8 rounded-[2rem] border-l-4 border-primary-start hover:scale-[1.02] transition-all duration-500 shadow-xl group">
              <h4 class="text-xl font-bold group-hover:text-primary-start transition-colors">Bachelor Degree in Information Technology</h4>
              <p class="text-primary-start font-semibold">Arab International University</p>
              <div class="flex justify-between items-center mt-4 opacity-70 text-sm">
                <span class="flex items-center gap-2">📍 Damascus, Syria</span>
                <span class="flex items-center gap-2">🎓 2015 – 2022</span>
              </div>
            </div>
          </div>

          <a href="assets/cv.pdf" download class="btn-primary about-btn inline-block">Download CV</a>
        </div>

        <div class="space-y-8" #skillsSection>
          <div class="flex justify-between items-end mb-8">
            <div>
              <h3 class="text-3xl font-bold gradient-text skills-title">Technical Expertise</h3>
              <p class="text-sm opacity-60 mt-2">A comprehensive overview of my technical proficiency</p>
            </div>
          </div>
          
          <div class="grid sm:grid-cols-2 gap-6 skill-grid">
            <app-skill-card 
              *ngFor="let skill of technicalSkills"
              [name]="skill.name"
              [level]="skill.level"
              [iconName]="skill.icon"
              [category]="skill.category"
              [color]="skill.color"
              class="skill-card-item"
            ></app-skill-card>
          </div>

          <div class="mt-12 p-8 glass rounded-[2.5rem] tech-stack-container">
            <h4 class="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-center opacity-50">Tools & Technologies</h4>
            <div class="grid grid-cols-4 sm:grid-cols-8 gap-6 tech-grid">
              <div *ngFor="let tech of techStack" 
                   class="flex flex-col items-center gap-2 group cursor-pointer tech-icon-wrapper"
                   [title]="tech.name">
                <div class="w-12 h-12 glass rounded-xl flex items-center justify-center text-2xl group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-300 group-hover:bg-primary-start/20">
                  {{ tech.icon }}
                </div>
                <span class="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-tighter">{{ tech.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tech-grid {
      perspective: 1000px;
    }
  `]
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aboutContent') aboutContent!: ElementRef;
  @ViewChild('skillsSection') skillsSection!: ElementRef;

  highlights = [
    'Java & Spring Boot Expert',
    'RESTful API & Microservices Specialist',
    'Scalable Database Design (MySQL)'
  ];

  technicalSkills: any[] = [
    { name: 'Java / Spring', level: 95, icon: 'coffee', category: 'Backend', color: 'orange' },
    { name: 'MySQL Design', level: 90, icon: 'database', category: 'Database', color: 'blue' },
    { name: 'RESTful APIs', level: 95, icon: 'globe', category: 'Network', color: 'purple' },
    { name: 'Git / CI/CD', level: 85, icon: 'git-branch', category: 'DevOps', color: 'pink' },
    { name: 'Microservices', level: 80, icon: 'layers', category: 'Architecture', color: 'green' },
    { name: 'Architecture', level: 88, icon: 'cpu', category: 'Engineering', color: 'purple' }
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
    // Left side reveal
    const leftTl = gsap.timeline({
      scrollTrigger: {
        trigger: this.aboutContent.nativeElement,
        start: 'top 80%',
      }
    });

    leftTl.from('.about-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
          .from('.about-p', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
          .from('.about-list > div', { x: -30, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.4')
          .from('.education-section', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
          .from('.about-btn', { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.2');

    // Right side (Skills) reveal
    gsap.from('.skills-title', {
      scrollTrigger: { trigger: '.skills-title', start: 'top 90%' },
      opacity: 0,
      x: 30,
      duration: 1,
      ease: 'power3.out'
    });

    // Skill cards staggered reveal
    gsap.from('.skill-card-item', {
      scrollTrigger: {
        trigger: '.skill-grid',
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power4.out'
    });

    // Tech stack reveal
    gsap.from('.tech-stack-container', {
      scrollTrigger: {
        trigger: '.tech-stack-container',
        start: 'top 90%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from('.tech-icon-wrapper', {
      scrollTrigger: {
        trigger: '.tech-grid',
        start: 'top 95%',
      },
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'back.out(2)'
    });

    ScrollTrigger.refresh();
  }
}
