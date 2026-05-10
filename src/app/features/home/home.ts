import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeroComponent } from '../hero/hero';
import { AboutComponent } from '../about/about';
import { PortfolioComponent } from '../portfolio/portfolio';
import { ServicesComponent } from '../services/services';
import { TestimonialsComponent } from '../testimonials/testimonials';
import { ContactComponent } from '../contact/contact';
import { MetaService } from '../../core/services/meta';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    PortfolioComponent,
    ServicesComponent,
    TestimonialsComponent,
    ContactComponent
  ],
  template: `
    <div #pageWrapper>
      <section id="home"><app-hero></app-hero></section>
      
      <!-- Section dividers with fade transitions -->
      <div class="relative">
        <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-black/20 pointer-events-none z-10"></div>
        <section id="about" class="relative"><app-about></app-about></section>
      </div>
      
      <section id="services"><app-services></app-services></section>
      
      <div class="relative">
        <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-black/20 pointer-events-none z-10"></div>
        <section id="portfolio" class="relative"><app-portfolio></app-portfolio></section>
      </div>
      
      <section id="testimonials"><app-testimonials></app-testimonials></section>
      
      <div class="relative">
        <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-black/20 pointer-events-none z-10"></div>
        <section id="contact" class="relative"><app-contact></app-contact></section>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private metaService: MetaService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.metaService.updateTags({
      title: 'Bilal Hamwia',
      description: 'Explore the portfolio of a Software Engineer Developer specializing in high-performance web applications, modern UI/UX design, and scalable architectures.',
      image: 'https://angularpro.dev/assets/og-image.jpg',
      url: 'https://angularpro.dev'
    });

    this.metaService.setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Senior Angular Developer',
      'jobTitle': 'Senior Software Engineer',
      'url': 'https://angularpro.dev',
      'sameAs': [
        'https://www.linkedin.com/in/bilal-hamwia0/',
        'https://github.com/bilalhamwia'
      ],
      'description': 'Senior Software Engineer and R&D Specialist crafting high-performance, visually stunning web applications.'
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    }
  }
}
