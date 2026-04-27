import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  githubBackendUrl?: string;
  demoUrl?: string;
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
          building modern, scalable web and desktop applications.
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
             class="glass rounded-3xl overflow-hidden group hover:scale-[1.02] transition-all duration-500">
          <div class="relative aspect-video overflow-hidden">
            <img *ngIf="project.image" [src]="project.image" [alt]="project.title" 
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            <div *ngIf="!project.image" class="w-full h-full bg-gradient-to-br from-primary-start/40 to-primary-end/40 flex items-center justify-center text-4xl">
              🖼️
            </div>
            <div class="absolute inset-0 bg-primary-start/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 flex-wrap p-4">
              <a *ngIf="project.githubUrl" [href]="project.githubUrl" target="_blank" 
                 class="px-4 py-2 bg-white text-primary-start rounded-full font-bold hover:bg-opacity-90 transition-all text-sm">
                {{ project.githubBackendUrl ? 'Frontend' : 'GitHub' }}
              </a>
              <a *ngIf="project.githubBackendUrl" [href]="project.githubBackendUrl" target="_blank" 
                 class="px-4 py-2 bg-white text-primary-start rounded-full font-bold hover:bg-opacity-90 transition-all text-sm">
                Backend
              </a>
              <a *ngIf="project.demoUrl" [href]="project.demoUrl" target="_blank" 
                 class="px-4 py-2 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-primary-start transition-all text-sm">
                Demo
              </a>
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs font-bold uppercase tracking-wider text-primary-start">{{ project.category }}</span>
            </div>
            <h3 class="text-2xl font-bold mb-4 group-hover:text-primary-start transition-colors">{{ project.title }}</h3>
            <p class="opacity-70 text-sm mb-6 line-clamp-3">{{ project.description }}</p>
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
  filters = ['All', 'Web App', 'Desktop', 'Mobile'];
  activeFilter = signal('All');

  projects: Project[] = [
    {
      id: 1,
      title: 'Smart Garage: AI-Powered IoT Parking System',
      category: 'Web App',
      image: 'images/smart.png',
      description: 'An intelligent parking management system utilizing Raspberry Pi and Computer Vision. Features automated gate control via motor integration, real-time license plate recognition (OCR) using OpenCV, and a centralized web/Android interface for traffic optimization.',
      tags: ['Python', 'OpenCV', 'OCR', 'Raspberry Pi', 'IoT', 'Android', 'SQL'],
      githubUrl: 'https://github.com/bilalhamwia'
    },
    {
      id: 2,
      title: 'ExamPortal: Full-Stack Assessment Platform',
      category: 'Web App',
      image: '',
      description: 'A robust educational platform featuring a secure Spring Boot REST API and a dynamic Angular frontend. Implements JWT-based authentication, Role-Based Access Control (Admin/User), real-time quiz attempts, and automated result calculation.',
      tags: ['Angular', 'Java', 'Spring Boot', 'Spring Security', 'JWT', 'TypeScript', 'RxJS', 'MySQL'],
      githubUrl: 'https://github.com/bilalhamwia/examfrontEnd',
      githubBackendUrl: 'https://github.com/bilalhamwia/examServer'
    },
    {
      id: 3,
      title: 'BistroFlow: Smart Restaurant Management',
      category: 'Desktop',
      image: 'images/resturant1.png',
      description: 'A high-performance C# desktop application for streamlined restaurant operations. Features dynamic order processing, XAML-based UI, SQL-driven data persistence, and automated billing with localized 6% tax calculation.',
      tags: ['C#', '.NET', 'SQL Server', 'XAML', 'ADO.NET', 'LINQ'],
      githubUrl: 'https://github.com/bilalhamwia/Restrurent-App-work',
      demoUrl: 'https://drive.google.com/file/d/1TMH5YPeJODuyKotoVdAASd6JbsLYXJ-O/view?usp=sharing'
    },
    {
      id: 4,
      title: 'eMart: React E-commerce Solution',
      category: 'Web App',
      image: 'images/e-comm.png',
      description: 'A dynamic storefront developed using React and Bootstrap. Integrated with a RESTful Web API, it features advanced product filtering, custom-designed UI components, and client-side routing for a seamless shopping experience.',
      tags: ['React', 'Bootstrap', 'Web API', 'React Router', 'JavaScript'],
      githubUrl: 'https://github.com/bilalhamwia/emart',
      demoUrl: 'https://drive.google.com/file/d/1zeOCGl3ZIUoCSMdlmKDv5bXyYOHgGNzq/view?usp=sharing'
    },
    {
      id: 5,
      title: 'SARC Organization Portal',
      category: 'Web App',
      image: 'images/SARC.png',
      description: 'A comprehensive multi-page web platform for the Syrian Arab Red Crescent. Built with core web technologies, featuring news modules, interactive service sections, map integrations, and contact management.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      githubUrl: 'https://github.com/bilalhamwia/Basic-WebSite',
      demoUrl: 'https://drive.google.com/file/d/1D0b9VpI10i-RasqzUwLNYNiHyN5gkHbi/view?usp=sharing'
    },
    {
      id: 6,
      title: 'BistroBackend: Restaurant Management System',
      category: 'Web App',
      image: '',
      description: 'A comprehensive backend solution for restaurant operations. Featuring advanced management for bills, products, and categories, integrated with a secure JWT authentication system and real-time dashboard analytics.',
      tags: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'Hibernate'],
      githubUrl: 'https://github.com/bilalhamwia/com.inn.cafe'
    },
    {
      id: 7,
      title: 'Flutter Portfolio Showcase',
      category: 'Mobile',
      image: '',
      description: 'A sleek, cross-platform portfolio application built with Flutter. Demonstrates clean UI architecture, custom form handling, and responsive design patterns across mobile devices.',
      tags: ['Flutter', 'Dart', 'UI/UX', 'Mobile Development'],
      githubUrl: 'https://github.com/bilalhamwia/BasicPortfolioFlutter'
    },
    {
      id: 8,
      title: 'SmartForm: Interactive Input System',
      category: 'Mobile',
      image: '',
      description: 'A specialized Flutter application focused on advanced form validation and user input management. Features a streamlined interface for efficient data collection and real-time feedback.',
      tags: ['Flutter', 'Dart', 'Forms', 'Validation'],
      githubUrl: 'https://github.com/bilalhamwia/BasicForm'
    },
    {
      id: 9,
      title: 'AgeCalc: Precise Chronology Tool',
      category: 'Mobile',
      image: '',
      description: 'A practical utility application developed with Flutter for accurate age calculations and time interval tracking. Highlights Flutter\'s ability to build fast, lightweight, and functional utility apps.',
      tags: ['Flutter', 'Dart', 'Utility', 'Mobile'],
      githubUrl: 'https://github.com/bilalhamwia/basic_calculater'
    }
  ];

  filteredProjects() {
    return this.activeFilter() === 'All' 
      ? this.projects 
      : this.projects.filter(p => p.category === this.activeFilter());
  }
}
