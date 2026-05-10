import { Directive, ElementRef, Inject, PLATFORM_ID, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type RevealType = 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealType: RevealType = 'slideUp';
  @Input() revealDuration = 1;
  @Input() revealDelay = 0;
  @Input() revealStagger = 0;
  @Input() revealStart = 'top 85%';
  @Input() revealTarget = '';

  private triggers: ScrollTrigger[] = [];
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => this.initReveal(), 50);
    }
  }

  ngOnDestroy() {
    this.triggers.forEach(t => t.kill());
  }

  private initReveal() {
    const target = this.revealTarget
      ? this.el.nativeElement.querySelectorAll(this.revealTarget)
      : this.el.nativeElement;

    const config = this.getConfig();

    if (target instanceof NodeList && target.length > 0) {
      gsap.from(target, {
        scrollTrigger: {
          trigger: this.el.nativeElement,
          start: this.revealStart,
          toggleActions: 'play none none none',
        },
        ...config,
        stagger: this.revealStagger || undefined,
        duration: this.revealDuration,
        delay: this.revealDelay,
        ease: 'power3.out',
      });
    } else {
      const st = ScrollTrigger.create({
        trigger: this.el.nativeElement,
        start: this.revealStart,
        toggleActions: 'play none none none',
        onEnter: () => {
          gsap.from(this.el.nativeElement, {
            ...config,
            duration: this.revealDuration,
            delay: this.revealDelay,
            ease: 'power3.out',
          });
        },
      });
      this.triggers.push(st);
    }

    ScrollTrigger.refresh();
  }

  private getConfig() {
    switch (this.revealType) {
      case 'fade':
        return { opacity: 0 };
      case 'slideUp':
        return { y: 40, opacity: 0 };
      case 'slideLeft':
        return { x: 60, opacity: 0 };
      case 'slideRight':
        return { x: -60, opacity: 0 };
      case 'scale':
        return { scale: 0.85, opacity: 0 };
      case 'stagger':
        return { y: 30, opacity: 0 };
      default:
        return { y: 40, opacity: 0 };
    }
  }
}
