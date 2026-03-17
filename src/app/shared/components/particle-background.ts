import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-particle-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #particleCanvas class="fixed inset-0 z-[-40] pointer-events-none w-full h-full"></canvas>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ParticleBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') particleCanvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouse = { x: 0, y: 0 };
  private canvasSize = { width: 0, height: 0 };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initCanvas();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.ticker.remove(this.animateCanvasBound);
      window.removeEventListener('resize', this.resizeCanvasBound);
      window.removeEventListener('mousemove', this.mouseMoveBound);
      this.particles.forEach(p => gsap.killTweensOf(p));
    }
  }

  private animateCanvasBound = () => this.animateCanvas();
  private resizeCanvasBound = () => this.resizeCanvas();
  private mouseMoveBound = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };

  private initCanvas() {
    const canvas = this.particleCanvas.nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true })!;
    
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvasBound);
    window.addEventListener('mousemove', this.mouseMoveBound);

    this.createParticles();
    gsap.ticker.add(this.animateCanvasBound);
  }

  private resizeCanvas() {
    const canvas = this.particleCanvas.nativeElement;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.canvasSize = { width: canvas.width, height: canvas.height };
    this.createParticles();
  }

  private createParticles() {
    this.particles.forEach(p => gsap.killTweensOf(p));
    this.particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 50 : 130; // Slightly more particles
    
    for (let i = 0; i < particleCount; i++) {
      const p = new Particle(this.canvasSize.width, this.canvasSize.height);
      this.particles.push(p);
      
      gsap.to(p, {
        size: p.size * (1.8 + Math.random()), // Larger pulse
        opacity: 0.2 + Math.random() * 0.4, // Increased base opacity (from 0.05-0.3)
        duration: 2 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    }
  }

  private animateCanvas() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.drawConnections();
    this.particles.forEach(particle => {
      particle.update(this.canvasSize.width, this.canvasSize.height, this.mouse);
      particle.draw(this.ctx);
    });
  }

  private drawConnections() {
    const maxDistance = 170;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - (distance / maxDistance)) * 0.25; // More visible lines (from 0.1)
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          this.ctx.lineWidth = 0.8; // Slightly thicker lines
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  opacity: number = 0.3;
  color: string = '99, 102, 241'; // Primary Indigo

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.baseSize = Math.random() * 2.5 + 1; // Larger base size (from 0.5-1.5)
    this.size = this.baseSize;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update(width: number, height: number, mouse: { x: number, y: number }) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxMouseDist = 200;

    if (distance < maxMouseDist) {
      const force = (maxMouseDist - distance) / maxMouseDist;
      const angle = Math.atan2(dy, dx);
      const pushX = Math.cos(angle) * force * 1.5;
      const pushY = Math.sin(angle) * force * 1.5;
      this.x -= pushX;
      this.y -= pushY;
    }
  }
}
