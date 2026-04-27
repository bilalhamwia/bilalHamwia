import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './services.scss',
  template: `
    <div class="py-24 bg-gray-50/50 dark:bg-black/20" #servicesContainer>
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 services-header">
          <h2 class="text-4xl font-bold mb-4 gradient-text inline-block">My Services</h2>
          <p class="opacity-70 max-w-xl mx-auto text-lg">
            Providing specialized backend solutions to help businesses thrive with 
            scalable, secure, and performant architectures.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 services-grid">
          <div *ngFor="let service of services" 
               class="glass p-10 rounded-[2.5rem] group hover:bg-primary-start cursor-default service-card">
            <div class="w-16 h-16 glass rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform service-icon">
              {{ service.icon }}
            </div>
            <h3 class="text-2xl font-bold mb-4 group-hover:text-white transition-colors service-title">{{ service.title }}</h3>
            <p class="opacity-70 group-hover:text-white/80 transition-colors leading-relaxed service-desc">
              {{ service.description }}
            </p>
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
      // Small timeout to ensure layout is settled
      setTimeout(() => {
        this.initAnimations();
        ScrollTrigger.refresh();
      }, 100);
    }
  }

  private initAnimations() {
    // Header reveal
    gsap.from('.services-header', {
      scrollTrigger: {
        trigger: '.services-header',
        start: 'top 90%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Batch cards reveal
    ScrollTrigger.batch('.service-card', {
      onEnter: (elements) => gsap.from(elements, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out',
        overwrite: true,
        clearProps: 'all'
      }),
      start: 'top 85%',
      once: true
    });
  }
}
