import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-schema-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative card-border overflow-hidden rounded-2xl flex flex-col animate-float h-full group">
      <!-- Top visual section with local Wave Visualizer -->
      <div class="p-4 flex justify-center relative">
        <div class="w-full h-48 rounded-xl gradient-border inner-glow overflow-hidden relative bg-black">
          <!-- Image Overlay (optional, if provided) -->
          <img *ngIf="image" [src]="image" [alt]="title" 
               class="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-500">
          
          <!-- Placeholder Overlay -->
          <div *ngIf="!image" class="absolute inset-0 flex items-center justify-center">
             <div class="w-24 h-24 bg-indigo-500/10 rounded-lg blur-xl animate-schemaPulse"></div>
             <span class="text-4xl relative z-10">🖼️</span>
          </div>

          <!-- Local Canvas for Wave Animation - Moved on top with screen blend mode -->
          <canvas #waveCanvas class="absolute inset-0 w-full h-full opacity-80 mix-blend-screen"></canvas>

          <!-- Animated grid background overlay -->
          <div class="absolute inset-0 opacity-10">
            <div class="w-full h-full animate-pulse" 
                 style="background-image: linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px); background-size: 15px 15px;">
            </div>
          </div>

          <!-- Hover Overlay with Links -->
          <div class="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
            <a *ngIf="githubUrl" [href]="githubUrl" target="_blank" 
               class="px-4 py-2 bg-white text-indigo-900 rounded-full font-bold hover:bg-opacity-90 transition-all text-xs">
              {{ githubBackendUrl ? 'Frontend' : 'GitHub' }}
            </a>
            <a *ngIf="githubBackendUrl" [href]="githubBackendUrl" target="_blank" 
               class="px-4 py-2 bg-white text-indigo-900 rounded-full font-bold hover:bg-opacity-90 transition-all text-xs">
              Backend
            </a>
            <a *ngIf="demoUrl" [href]="demoUrl" target="_blank" 
               class="px-4 py-2 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-indigo-900 transition-all text-xs">
              Demo
            </a>
          </div>
        </div>
      </div>

      <div class="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

      <!-- Content section -->
      <div class="p-6 bg-black/40 backdrop-blur-md flex-grow flex flex-col">
        <div class="flex justify-between items-center mb-3">
          <span class="inline-block px-3 py-1 glass text-indigo-300 rounded-full text-[10px] font-medium border border-indigo-400/30 uppercase tracking-wider">
            {{ category }}
          </span>
          <span class="text-white/50 text-[10px] glass px-2 py-1 rounded-full border border-white/10">Live</span>
        </div>
        
        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{{ title }}</h3>
        <p class="text-white/70 mb-6 leading-relaxed text-xs line-clamp-3 flex-grow">
          {{ description }}
        </p>

        <div class="flex flex-wrap gap-2 mt-auto">
          <span *ngFor="let tag of tags" class="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/60">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
  `]
})
export class SchemaCardComponent implements AfterViewInit, OnDestroy {
  @Input() title!: string;
  @Input() category!: string;
  @Input() description!: string;
  @Input() image?: string;
  @Input() tags: string[] = [];
  @Input() githubUrl?: string;
  @Input() githubBackendUrl?: string;
  @Input() demoUrl?: string;

  @ViewChild('waveCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private time = 0;
  private animationFrameId!: number;
  private waveData = Array.from({ length: 8 }).map(() => ({
    value: Math.random() * 0.5 + 0.1,
    targetValue: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 0.02 + 0.01
  }));

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initVisualizer();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeCanvasBound);
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private resizeCanvasBound = () => this.resizeCanvas();

  private initVisualizer() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    window.addEventListener('resize', this.resizeCanvasBound);
    this.resizeCanvas();
    this.animate();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
  }

  private updateWaveData() {
    this.waveData.forEach(data => {
      if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1;
      const diff = data.targetValue - data.value;
      data.value += diff * data.speed;
    });
  }

  private draw() {
    if (!this.ctx) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.waveData.forEach((data, i) => {
      const freq = data.value * 7;
      this.ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const nx = (x / canvas.width) * 2 - 1;
        const px = nx + i * 0.04 + freq * 0.03;
        const py = Math.sin(px * 10 + this.time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8);
        const y = (py + 1) * canvas.height / 2;
        x === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
      }
      const intensity = Math.min(1, freq * 0.3);
      const r = 79 + intensity * 100;
      const g = 70 + intensity * 130;
      const b = 229;
      this.ctx.lineWidth = 1 + i * 0.3;
      this.ctx.strokeStyle = `rgba(${r},${g},${b},0.6)`;
      this.ctx.shadowColor = `rgba(${r},${g},${b},0.5)`;
      this.ctx.shadowBlur = 5;
      this.ctx.stroke();
      this.ctx.shadowBlur = 0;
    });
  }

  private animate = () => {
    this.time += 0.02;
    this.updateWaveData();
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
