import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-24 bg-white dark:bg-dark-bg overflow-hidden">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 gradient-text inline-block">What Clients Say</h2>
          <p class="opacity-70 max-w-xl mx-auto text-lg">
            Feedback from partners and clients I've had the pleasure of working with.
          </p>
        </div>

        <div class="flex flex-col md:flex-row gap-8">
          <div *ngFor="let testimonial of testimonials" 
               class="glass p-8 rounded-3xl relative">
            <div class="absolute -top-4 -left-4 text-6xl opacity-20 text-primary-start">"</div>
            <p class="text-lg mb-8 italic opacity-80 relative z-10">{{ testimonial.text }}</p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-primary-start rounded-full flex items-center justify-center text-xl text-white">
                👤
              </div>
              <div>
                <h4 class="font-bold">{{ testimonial.author }}</h4>
                <p class="text-sm opacity-60">{{ testimonial.position }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TestimonialsComponent {
  testimonials = [
    {
      text: 'Working with this team was a game-changer. The Angular application they built is fast, reliable, and our users love it.',
      author: 'Sarah Johnson',
      position: 'CTO at TechFlow'
    },
    {
      text: 'Their attention to detail in UI/UX design is unmatched. They truly understand how to create engaging digital experiences.',
      author: 'Michael Chen',
      position: 'Founder of DesignHub'
    }
  ];
}
