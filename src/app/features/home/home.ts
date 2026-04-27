import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../hero/hero';
import { AboutComponent } from '../about/about';
import { PortfolioComponent } from '../portfolio/portfolio';
import { ServicesComponent } from '../services/services';
import { TestimonialsComponent } from '../testimonials/testimonials';
import { ContactComponent } from '../contact/contact';
import { MetaService } from '../../core/services/meta';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    PortfolioComponent,
    ServicesComponent,
    TestimonialsComponent,
    ContactComponent
  ],
  template: `
    <section id="home"><app-hero></app-hero></section>
    <section id="about"><app-about></app-about></section>
    <section id="services"><app-services></app-services></section>
    <section id="portfolio"><app-portfolio></app-portfolio></section>
    <section id="testimonials"><app-testimonials></app-testimonials></section>
    <section id="contact"><app-contact></app-contact></section>
  `
})
export class HomeComponent implements OnInit {
  constructor(private metaService: MetaService) {}

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
      'description': 'Senior Software Engineer & UI/UX Specialist crafting high-performance, visually stunning web applications.'
    });
  }
}
