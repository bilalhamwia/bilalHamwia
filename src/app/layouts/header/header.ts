import { Component, signal, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../core/services/theme';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 left-0 w-full z-[100] transition-all duration-300"
            [class.bg-white/90]="!themeService.isDarkMode() && isScrolled()"
            [class.bg-slate-900/90]="themeService.isDarkMode() && isScrolled()"
            [class.backdrop-blur-lg]="isScrolled()"
            [class.shadow-lg]="isScrolled()">
      <nav class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold gradient-text cursor-pointer" (click)="scrollTo('#home')">
          Bilal Hamwia
        </div>
        
        <div class="hidden md:flex gap-8 items-center font-medium">
          <a (click)="scrollTo('#home')" class="hover:text-primary-start transition-colors cursor-pointer">Home</a>
          <a (click)="scrollTo('#about')" class="hover:text-primary-start transition-colors cursor-pointer">About</a>
          <a (click)="scrollTo('#services')" class="hover:text-primary-start transition-colors cursor-pointer">Services</a>
          <a (click)="scrollTo('#portfolio')" class="hover:text-primary-start transition-colors cursor-pointer">Portfolio</a>
          <a (click)="scrollTo('#contact')" class="hover:text-primary-start transition-colors cursor-pointer">Contact</a>
          
          <button (click)="themeService.toggleTheme()" 
                  class="p-2 rounded-xl glass hover:scale-110 transition-all ml-4"
                  [title]="themeService.isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
            <span>{{ themeService.isDarkMode() ? '☀️' : '🌙' }}</span>
          </button>
        </div>

        <!-- Mobile Toggle -->
        <div class="flex items-center gap-4 md:hidden">
          <button (click)="themeService.toggleTheme()" class="p-2 rounded-lg glass">
            <span>{{ themeService.isDarkMode() ? '☀️' : '🌙' }}</span>
          </button>
          <button class="p-2 text-2xl focus:outline-none" (click)="toggleMobileMenu()">
            <span class="block w-6 h-0.5 bg-current mb-1.5 transition-all" [class.rotate-45]="isMobileMenuOpen()" [class.translate-y-2]="isMobileMenuOpen()"></span>
            <span class="block w-6 h-0.5 bg-current mb-1.5 transition-all" [class.opacity-0]="isMobileMenuOpen()"></span>
            <span class="block w-6 h-0.5 bg-current transition-all" [class.-rotate-45]="isMobileMenuOpen()" [class.-translate-y-2]="isMobileMenuOpen()"></span>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Overlay -->
      <div *ngIf="isMobileMenuOpen()" 
           class="md:hidden fixed inset-0 top-[72px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-[90] p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
        <a (click)="scrollTo('#home')" class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4">Home</a>
        <a (click)="scrollTo('#about')" class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4">About</a>
        <a (click)="scrollTo('#services')" class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4">Services</a>
        <a (click)="scrollTo('#portfolio')" class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4">Portfolio</a>
        <a (click)="scrollTo('#contact')" class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4">Contact</a>
      </div>
    </header>
  `
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  constructor(
    public themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 50);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  scrollTo(selector: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector(selector);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      this.isMobileMenuOpen.set(false);
    }
  }
}

