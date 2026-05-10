import { Directive, ElementRef, HostListener, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective {
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(e: MouseEvent) {
    if (!this.isBrowser) return;
    this.ngZone.runOutsideAngular(() => {
      this.animateTo(e);
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isBrowser) return;
    this.ngZone.runOutsideAngular(() => {
      this.animateTo(e);
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.isBrowser) return;
    this.ngZone.runOutsideAngular(() => {
      gsap.to(this.el.nativeElement, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  }

  private animateTo(e: MouseEvent) {
    const { clientX, clientY } = e;
    const { left, top, width, height } = this.el.nativeElement.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    gsap.to(this.el.nativeElement, {
      x,
      y,
      duration: 0.6,
      ease: 'power2.out',
    });
  }
}
