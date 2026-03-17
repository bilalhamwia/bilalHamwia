import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-24 max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 gradient-text inline-block">My Portfolio</h2>
        <p class="opacity-70 max-w-xl mx-auto text-lg">
          A selection of recent projects showcasing my expertise in 
          building modern, scalable web applications.
        </p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button *ngFor="let filter of filters" 
                (click)="activeFilter.set(filter)"
                class="px-6 py-2 rounded-full font-semibold transition-all duration-300"
                [class.bg-primary-start]="activeFilter() === filter"
                [class.text-white]="activeFilter() === filter"
                [class.glass]="activeFilter() !== filter">
          {{ filter }}
        </button>
      </div>

      <!-- Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div *ngFor="let project of filteredProjects()" 
             class="glass rounded-3xl overflow-hidden group hover:scale-[1.02] transition-all duration-500 cursor-pointer">
          <div class="relative aspect-video overflow-hidden">
            <div class="w-full h-full bg-gradient-to-br from-primary-start/40 to-primary-end/40 flex items-center justify-center text-4xl">
              🖼️
            </div>
            <div class="absolute inset-0 bg-primary-start/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <button class="px-8 py-2 bg-white text-primary-start rounded-full font-bold">View Details</button>
            </div>
          </div>
          <div class="p-6">
            <span class="text-xs font-bold uppercase tracking-wider text-primary-start">{{ project.category }}</span>
            <h3 class="text-2xl font-bold mt-2 mb-4">{{ project.title }}</h3>
            <p class="opacity-70 text-sm mb-6">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let tag of project.tags" class="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PortfolioComponent {
  filters = ['All', 'Web App', 'UI/UX', 'Mobile'];
  activeFilter = signal('All');

  projects: Project[] = [
    {
      id: 1,
      title: 'Enterprise Dashboard',
      category: 'Web App',
      image: '',
      description: 'A real-time data visualization platform for global logistics.',
      tags: ['Angular', 'NgRx', 'D3.js']
    },
    {
      id: 2,
      title: 'Creative Agency Portfolio',
      category: 'UI/UX',
      image: '',
      description: 'A high-performance portfolio site with smooth animations.',
      tags: ['Angular', 'GSAP', 'Tailwind']
    },
    {
      id: 3,
      title: 'E-commerce App',
      category: 'Mobile',
      image: '',
      description: 'Cross-platform mobile shopping experience with real-time updates.',
      tags: ['Ionic', 'Angular', 'Firebase']
    },
    {
      id: 4,
      title: 'SaaS Platform',
      category: 'Web App',
      image: '',
      description: 'Project management tool with complex state management.',
      tags: ['Angular', 'Akita', 'Material']
    }
  ];

  filteredProjects() {
    return this.activeFilter() === 'All' 
      ? this.projects 
      : this.projects.filter(p => p.category === this.activeFilter());
  }
}
