import { Component, signal, HostListener, Inject, PLATFORM_ID, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme';
import { Scroll } from '../../core/services/scroll';
import { gsap } from 'gsap';
import { animate, inView } from 'framer-motion/dom';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header #headerEl class="fixed top-0 left-0 w-full z-[100] transition-colors duration-700"
            [class.bg-white/80]="!themeService.isDarkMode() && scroll.isScrolled()"
            [class.bg-slate-900/80]="themeService.isDarkMode() && scroll.isScrolled()"
            [class.backdrop-blur-xl]="scroll.isScrolled()"
            [class.shadow-lg]="scroll.isScrolled()"
            [class.-translate-y-full]="isHidden()"
            style="will-change: transform;">
      
      <!-- Scroll Progress Bar -->
      <div class="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
        <div #progressBar class="h-full bg-gradient-to-r from-primary-start to-primary-end transition-all duration-150 ease-out"
             style="width: 0%"></div>
      </div>

      <nav class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold gradient-text cursor-pointer" (click)="navigateToHome()">
          Bilal Hamwia
        </div>
        
        <div #navLinks class="hidden md:flex gap-6 items-center font-medium">
          @for (item of navItems; track item.label) {
            <a (click)="scrollTo(item.target)"
               class="relative px-1 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer nav-link"
               [class.text-primary-start]="scroll.activeSection() === item.id"
               [class.opacity-60]="scroll.activeSection() !== item.id"
               [class.hover:opacity-100]="scroll.activeSection() !== item.id">
              {{ item.label }}
              @if (scroll.activeSection() === item.id) {
                <span class="absolute -bottom-px left-0 w-full h-[2px] bg-primary-start rounded-full"></span>
              }
            </a>
          }
          <a routerLink="/games" routerLinkActive="text-primary-start"
             class="relative px-1 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer nav-link opacity-60 hover:opacity-100">
            Games
          </a>
          
          <button (click)="themeService.toggleTheme()" 
                  class="p-2 rounded-xl glass hover:scale-110 transition-all ml-2"
                  [title]="themeService.isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
            <span class="block transition-transform duration-300" [class.rotate-180]="!themeService.isDarkMode()">
              {{ themeService.isDarkMode() ? '☀️' : '🌙' }}
            </span>
          </button>
        </div>

        <!-- Mobile Toggle -->
        <div class="flex items-center gap-3 md:hidden">
          <button (click)="themeService.toggleTheme()" class="p-2 rounded-lg glass">
            <span>{{ themeService.isDarkMode() ? '☀️' : '🌙' }}</span>
          </button>
          <button class="p-2 text-2xl focus:outline-none" (click)="toggleMobileMenu()" aria-label="Toggle menu">
            <span #bar1 class="block w-6 h-[2px] bg-current mb-1.5 transition-all duration-300 rounded-full"></span>
            <span #bar2 class="block w-6 h-[2px] bg-current mb-1.5 transition-all duration-300 rounded-full"></span>
            <span #bar3 class="block w-6 h-[2px] bg-current transition-all duration-300 rounded-full"></span>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Overlay -->
      <div #mobileMenu
           class="md:hidden fixed inset-0 top-[72px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-[90] p-8 flex flex-col gap-6"
           style="display: none;">
        @for (item of navItems; track item.label) {
          <a (click)="scrollTo(item.target)"
             class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4 mobile-link cursor-pointer">
            {{ item.label }}
          </a>
        }
        <a routerLink="/games" (click)="toggleMobileMenu()"
           class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4 mobile-link">Games</a>
        <a (click)="scrollTo('#contact')"
           class="text-2xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4 mobile-link">Contact</a>
      </div>
    </header>
  `
})
export class HeaderComponent implements AfterViewInit {
  isHidden = signal(false);
  isMobileMenuOpen = signal(false);

  navItems = [
    { label: 'Home', id: 'home', target: '#home' },
    { label: 'About', id: 'about', target: '#about' },
    { label: 'Services', id: 'services', target: '#services' },
    { label: 'Portfolio', id: 'portfolio', target: '#portfolio' },
    { label: 'Experience', id: 'testimonials', target: '#testimonials' },
  ];

  @ViewChild('headerEl') headerEl!: ElementRef;
  @ViewChild('navLinks') navLinks!: ElementRef;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  @ViewChild('bar1') bar1!: ElementRef;
  @ViewChild('bar2') bar2!: ElementRef;
  @ViewChild('bar3') bar3!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;

  private lastScroll = 0;
  private isBrowser: boolean;

  constructor(
    public themeService: ThemeService,
    public scroll: Scroll,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initNavLinkAnimation();
      this.initScrollProgress();
    }
  }

  private initNavLinkAnimation() {
    const links = this.navLinks.nativeElement.querySelectorAll('.nav-link');
    gsap.from(links, {
      y: -20,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  private initScrollProgress() {
    if (!this.isBrowser) return;
    const bar = this.progressBar.nativeElement;
    this.scroll.progress();
    requestAnimationFrame(() => {
      gsap.to(bar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        }
      });
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      const currentScroll = window.scrollY;
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
      gsap.set(menu, { display: 'flex', opacity: 0 });
      gsap.to(menu, { opacity: 1, height: '100vh', duration: 0.4, ease: 'power3.out' });
      gsap.from(links, {
        x: -30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power3.out',
        delay: 0.1,
      });
      gsap.to(bars[0], { rotation: 45, y: 7.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(bars[1], { opacity: 0, duration: 0.2 });
      gsap.to(bars[2], { rotation: -45, y: -7.5, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(menu, { opacity: 0, height: 0, duration: 0.3, ease: 'power3.in', onComplete: () => { gsap.set(menu, { display: 'none' }); } });
      gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(bars[1], { opacity: 1, duration: 0.3 });
      gsap.to(bars[2], { rotation: 0, y: 0, duration: 0.3 });
    }
  }

  navigateToHome() {
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    } else {
      this.scroll.scrollTo('#home');
    }
  }

  scrollTo(selector: string) {
    if (this.isBrowser) {
      if (this.router.url !== '/') {
        this.router.navigate(['/']).then(() => {
          setTimeout(() => this.scroll.scrollTo(selector), 100);
        });
      } else {
        this.scroll.scrollTo(selector);
      }
      if (this.isMobileMenuOpen()) {
        this.toggleMobileMenu();
      }
    }
  }
}
