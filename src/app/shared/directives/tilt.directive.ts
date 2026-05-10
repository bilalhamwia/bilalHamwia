import { Directive, ElementRef, HostListener, Inject, PLATFORM_ID, NgZone, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  @Input() tiltMax = 10;
  @Input() tiltPerspective = 1000;
  @Input() tiltScale = 1.02;
  @Input() tiltSpeed = 0.4;

  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isBrowser) return;
    this.ngZone.runOutsideAngular(() => {
      const { left, top, width, height } = this.el.nativeElement.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(this.el.nativeElement, {
        rotationY: x * this.tiltMax,
        rotationX: -y * this.tiltMax,
        transformPerspective: this.tiltPerspective,
        scale: this.tiltScale,
        duration: this.tiltSpeed,
        ease: 'power2.out',
      });
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.isBrowser) return;
    this.ngZone.runOutsideAngular(() => {
      gsap.to(this.el.nativeElement, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: this.tiltSpeed * 1.5,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  }
}
