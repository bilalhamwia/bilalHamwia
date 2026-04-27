import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
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
            <div class="glass p-6 rounded-2xl border-l-4 border-primary-start hover:scale-[1.02] transition-transform duration-300">
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
          
          <div *ngFor="let skill of skills" class="space-y-2 skill-item">
            <div class="flex justify-between font-semibold">
              <span>{{ skill.name }}</span>
              <span>{{ skill.level }}%</span>
            </div>
            <div class="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-primary-start to-primary-end skill-bar"
                   [attr.data-level]="skill.level"
                   style="width: 0%">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4 mt-12 tech-grid">
            <div *ngFor="let tech of techStack" 
                 class="glass p-4 rounded-xl flex items-center justify-center text-3xl hover:scale-110 cursor-pointer tech-icon"
                 [title]="tech.name">
              {{ tech.icon }}
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
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        this.initAnimations();
      }, 100);
    }
  }

  ngOnDestroy() {
    // Kill all ScrollTriggers when component is destroyed
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

    leftTl.from('.about-title', { y: 30, opacity: 0, duration: 0.8, immediateRender: false })
          .from('.about-p', { y: 20, opacity: 0, duration: 0.8, immediateRender: false }, '-=0.4')
          .from('.about-list > div', { x: -20, opacity: 0, stagger: 0.15, duration: 0.6, immediateRender: false }, '-=0.4')
          .from('.about-btn', { scale: 0.8, opacity: 0, duration: 0.5, clearProps: 'all', immediateRender: false }, '-=0.2');

    // Right side (Skills) reveal
    gsap.from('.skills-title', {
      scrollTrigger: { trigger: '.skills-title', start: 'top 90%' },
      opacity: 0,
      y: 20,
      duration: 1
    });

    // Skill bars animation
    const skillBars = gsap.utils.toArray('.skill-bar');
    skillBars.forEach((bar: any) => {
      const level = bar.getAttribute('data-level');
      gsap.to(bar, {
        scrollTrigger: {
          trigger: bar,
          start: 'top 95%',
        },
        width: `${level}%`,
        duration: 1.5,
        ease: 'power3.out'
      });
    });

    // Tech icons - Staggered reveal
    gsap.from('.tech-icon', {
      scrollTrigger: {
        trigger: '.tech-grid',
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      scale: 0,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });

    // Refresh ScrollTrigger to ensure all positions are calculated correctly
    ScrollTrigger.refresh();
  }
}
