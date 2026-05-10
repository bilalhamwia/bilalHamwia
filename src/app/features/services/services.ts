import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, inView } from 'framer-motion/dom';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <div class="py-24 md:py-32 bg-gray-50/50 dark:bg-black/20" #servicesContainer>
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 md:mb-20" appScrollReveal revealType="springUp">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text inline-block">My Services</h2>
          <p class="opacity-70 max-w-xl mx-auto text-lg leading-relaxed">
            Providing specialized backend solutions to help businesses thrive with 
            scalable, secure, and performant architectures.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 md:gap-8 services-grid" appScrollReveal revealType="springUp" [revealStagger]="0.1" revealTarget=".service-card">
          <div *ngFor="let service of services; let i = index" 
               class="service-card group relative overflow-hidden rounded-[2.5rem] transition-all duration-500 cursor-default"
               [style.transformStyle]="'preserve-3d'"
               (mousemove)="onCardMove($event, i)"
               (mouseleave)="onCardLeave(i)">
            <!-- Hover gradient overlay -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary-start/20 via-primary-start/10 to-transparent rounded-[2.5rem]"></div>
            
            <!-- Card content -->
            <div class="glass p-8 md:p-10 rounded-[2.5rem] relative z-10 h-full transition-all duration-500 group-hover:bg-primary-start/5"
                 #serviceCard>
              <div class="w-16 h-16 glass rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-500 service-icon"
                   style="will-change: transform;">
                {{ service.icon }}
              </div>
              <h3 class="text-2xl font-bold mb-4 transition-colors duration-300 service-title">{{ service.title }}</h3>
              <p class="opacity-70 leading-relaxed transition-colors duration-300">
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ServicesComponent implements AfterViewInit {
  @ViewChild('servicesContainer') servicesContainer!: ElementRef;

  services = [
    {
      title: 'Backend Architecture',
      description: 'Designing scalable microservices and robust monolithic architectures using Java and Spring Boot.',
      icon: '⚙️'
    },
    {
      title: 'API Development',
      description: 'Building secure, high-performance RESTful and GraphQL APIs with comprehensive documentation.',
      icon: '🔌'
    },
    {
      title: 'Database Optimization',
      description: 'Expertise in MySQL schema design, indexing strategies, and performance tuning for high-load systems.',
      icon: '📊'
    },
    {
      title: 'System Integration',
      description: 'Seamlessly connecting complex enterprise systems with high reliability and fault tolerance.',
      icon: '🔄'
    },
    {
      title: 'Security Auditing',
      description: 'Implementing OAuth2, JWT, and rigorous security practices to protect your data and infrastructure.',
      icon: '🛡️'
    },
    {
      title: 'Performance Tuning',
      description: 'Deep profiling and optimization of JVM, database queries, and caching strategies.',
      icon: '⚡'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }
  }

  onCardMove(e: MouseEvent, index: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    const cards = this.servicesContainer.nativeElement.querySelectorAll('.service-card');
    const card = cards[index] as HTMLElement;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotationY: x * 8,
      rotationX: -y * 8,
      transformPerspective: 1200,
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  onCardLeave(index: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    const cards = this.servicesContainer.nativeElement.querySelectorAll('.service-card');
    const card = cards[index] as HTMLElement;
    if (!card) return;

    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  }
}
