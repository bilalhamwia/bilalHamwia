import { Directive, ElementRef, Inject, PLATFORM_ID, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animate, inView } from 'framer-motion/dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type RevealType = 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger' | 'clipPath' | 'blur' | 'springUp' | 'flip';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealType: RevealType = 'springUp';
  @Input() revealDuration = 0.7;
  @Input() revealDelay = 0;
  @Input() revealStagger = 0.08;
  @Input() revealStart = 'top 85%';
  @Input() revealTarget = '';

  private triggers: ScrollTrigger[] = [];
  private cleanupFns: VoidFunction[] = [];
  private isBrowser: boolean;
  private revealed = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => this.initReveal(), 80);
    }
  }

  ngOnDestroy() {
    this.triggers.forEach(t => t.kill());
    this.cleanupFns.forEach(fn => fn());
  }

  private initReveal() {
    const target = this.revealTarget
      ? this.el.nativeElement.querySelectorAll(this.revealTarget)
      : this.el.nativeElement;

    const config = this.getFramerMotionConfig();

    if (target instanceof NodeList && target.length > 0) {
      const stop = inView(target[0].parentElement || this.el.nativeElement, () => {
        if (this.revealed) return;
        this.revealed = true;

        animate(target as unknown as HTMLElement[], {
          ...config.variants,
        }, {
          type: config.type as any,
          stiffness: config.stiffness,
          damping: config.damping,
          mass: config.mass,
          duration: config.duration || this.revealDuration,
          delay: config.stagger ? this.revealStagger : this.revealDelay,
          ease: config.ease,
        } as any);

        return () => {};
      }, { amount: 0.2 });
      this.cleanupFns.push(stop);
    } else {
      if (this.revealType === 'clipPath') {
        this.initClipPathReveal(target);
        return;
      }

      const stop = inView(this.el.nativeElement, () => {
        if (this.revealed) return;
        this.revealed = true;

        animate(this.el.nativeElement, {
          ...config.variants,
        }, {
          type: config.type as any,
          duration: this.revealDuration,
          delay: this.revealDelay,
          ease: config.ease,
        } as any);
        return () => {};
      }, { amount: 0.2 });
      this.cleanupFns.push(stop);
    }
  }

  private initClipPathReveal(target: Element) {
    gsap.set(target, { clipPath: 'inset(0 100% 0 0)' });
    const st = ScrollTrigger.create({
      trigger: this.el.nativeElement,
      start: this.revealStart,
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to(target, {
          clipPath: 'inset(0 0% 0 0)',
          duration: this.revealDuration,
          delay: this.revealDelay,
          ease: 'power3.inOut',
        });
      },
    });
    this.triggers.push(st);
  }

  private getFramerMotionConfig(): any {
    const spring = { type: 'spring', stiffness: 120, damping: 14, mass: 0.8 };
    const easeOut = { ease: [0.16, 1, 0.3, 1] };

    switch (this.revealType) {
      case 'springUp':
        return { ...spring, variants: { y: [30, 0], opacity: [0, 1] } };
      case 'slideUp':
        return { ...easeOut, variants: { y: [40, 0], opacity: [0, 1] } };
      case 'slideDown':
        return { ...easeOut, variants: { y: [-40, 0], opacity: [0, 1] } };
      case 'slideLeft':
        return { ...easeOut, variants: { x: [60, 0], opacity: [0, 1] } };
      case 'slideRight':
        return { ...easeOut, variants: { x: [-60, 0], opacity: [0, 1] } };
      case 'fade':
        return { ...easeOut, variants: { opacity: [0, 1] } };
      case 'scale':
        return { ...spring, variants: { scale: [0.85, 1], opacity: [0, 1] } };
      case 'blur':
        return { ...easeOut, variants: { filter: ['blur(8px)', 'blur(0px)'], opacity: [0, 1] } };
      case 'flip':
        return { ...spring, variants: { rotateX: [25, 0], y: [20, 0], opacity: [0, 1] } };
      case 'stagger':
        return { ...easeOut, stagger: this.revealStagger, variants: { y: [30, 0], opacity: [0, 1] } };
      default:
        return { ...spring, variants: { y: [30, 0], opacity: [0, 1] } };
    }
  }
}
