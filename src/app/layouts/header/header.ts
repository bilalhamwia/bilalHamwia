import { Component, signal, HostListener, Inject, PLATFORM_ID, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header #headerEl class="fixed top-0 left-0 w-full z-[100] transition-all duration-500"
            [class.bg-white/90]="!themeService.isDarkMode() && isScrolled()"
            [class.bg-slate-900/90]="themeService.isDarkMode() && isScrolled()"
            [class.backdrop-blur-lg]="isScrolled()"
            [class.shadow-lg]="isScrolled()"
            [class.-translate-y-full]="isHidden()">
      <nav class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold gradient-text cursor-pointer" (click)="navigateToHome()">
          Bilal Hamwia
        </div>
        
        <div #navLinks class="hidden md:flex gap-8 items-center font-medium">
          <a (click)="scrollTo('#home')" class="hover:text-primary-start transition-colors cursor-pointer nav-link">Home</a>
          <a (click)="scrollTo('#about')" class="hover:text-primary-start transition-colors cursor-pointer nav-link">About</a>
          <a (click)="scrollTo('#services')" class="hover:text-primary-start transition-colors cursor-pointer nav-link">Services</a>
          <a (click)="scrollTo('#portfolio')" class="hover:text-primary-start transition-colors cursor-pointer nav-link">Portfolio</a>
          <a routerLink="/games" routerLinkActive="text-primary-start" class="hover:text-primary-start transition-colors cursor-pointer nav-link">Games</a>
          <a (click)="scrollTo('#contact')" class="hover:text-primary-start transition-colors cursor-pointer nav-link">Contact</a>
          
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
            <span #bar1 class="block w-6 h-0.5 bg-current mb-1.5 transition-all"></span>
            <span #bar2 class="block w-6 h-0.5 bg-current mb-1.5 transition-all"></span>
            <span #bar3 class="block w-6 h-0.5 bg-current transition-all"></span>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Overlay -->
      <div #mobileMenu
           class="md:hidden fixed inset-0 top-[72px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-[90] p-8 flex flex-col gap-6"
           style="display: none;">
        <a (click)="scrollTo('#home')" class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4 mobile-link">Home</a>
        <a (click)="scrollTo('#about')" class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4 mobile-link">About</a>
        <a (click)="scrollTo('#services')" class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4 mobile-link">Services</a>
        <a (click)="scrollTo('#portfolio')" class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4 mobile-link">Portfolio</a>
        <a routerLink="/games" (click)="toggleMobileMenu()" class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4 mobile-link">Games</a>
        <a (click)="scrollTo('#contact')" class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4 mobile-link">Contact</a>
      </div>
    </header>
  `
})
export class HeaderComponent implements AfterViewInit {
  isScrolled = signal(false);
  isHidden = signal(false);
  isMobileMenuOpen = signal(false);

  @ViewChild('headerEl') headerEl!: ElementRef;
  @ViewChild('navLinks') navLinks!: ElementRef;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  @ViewChild('bar1') bar1!: ElementRef;
  @ViewChild('bar2') bar2!: ElementRef;
  @ViewChild('bar3') bar3!: ElementRef;

  private lastScroll = 0;
  private isBrowser: boolean;

  constructor(
    public themeService: ThemeService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initNavLinkAnimation();
    }
  }

  private initNavLinkAnimation() {
    const links = this.navLinks.nativeElement.querySelectorAll('.nav-link');
    gsap.from(links, {
      y: -20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.3,
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      const currentScroll = window.scrollY;
      this.isScrolled.set(currentScroll > 50);

      if (currentScroll > 200) {
        if (currentScroll > this.lastScroll && !this.isHidden()) {
          this.isHidden.set(true);
        } else if (currentScroll < this.lastScroll && this.isHidden()) {
          this.isHidden.set(false);
        }
      } else {
        this.isHidden.set(false);
      }

      this.lastScroll = currentScroll;
    }
  }

  toggleMobileMenu() {
    const isOpening = !this.isMobileMenuOpen();
    this.isMobileMenuOpen.set(isOpening);

    if (!this.isBrowser) return;

    const menu = this.mobileMenu.nativeElement;
    const bars = [this.bar1.nativeElement, this.bar2.nativeElement, this.bar3.nativeElement];
    const links = menu.querySelectorAll('.mobile-link');

    if (isOpening) {
      gsap.set(menu, { display: 'flex' });
      gsap.from(menu, {
        opacity: 0,
        height: 0,
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.from(links, {
        x: -30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.4,
        ease: 'power3.out',
        delay: 0.1,
      });
      gsap.to(bars[0], { rotation: 45, y: 8, duration: 0.3 });
      gsap.to(bars[1], { opacity: 0, duration: 0.3 });
      gsap.to(bars[2], { rotation: -45, y: -8, duration: 0.3 });
    } else {
      gsap.to(menu, {
        opacity: 0,
        height: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(menu, { display: 'none' });
        },
      });
      gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(bars[1], { opacity: 1, duration: 0.3 });
      gsap.to(bars[2], { rotation: 0, y: 0, duration: 0.3 });
    }
  }

  navigateToHome() {
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    } else {
      this.scrollTo('#home');
    }
  }

  scrollTo(selector: string) {
    if (this.isBrowser) {
      if (this.router.url !== '/') {
        this.router.navigate(['/']).then(() => {
          setTimeout(() => this.performScroll(selector), 100);
        });
      } else {
        this.performScroll(selector);
      }
      if (this.isMobileMenuOpen()) {
        this.toggleMobileMenu();
      }
    }
  }

  private performScroll(selector: string) {
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
  }
}

