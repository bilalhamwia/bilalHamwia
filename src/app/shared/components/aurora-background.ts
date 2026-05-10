import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aurora-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      role="img"
      [attr.aria-label]="ariaLabel"
      class="relative flex flex-col w-screen h-screen items-center justify-center bg-black text-slate-50 overflow-hidden"
      [ngClass]="className"
    >
      <!-- Background layers -->
      <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
        <!-- Pulsing radial gradients -->
        <div
          class="absolute inset-0 opacity-50 pulse-animation"
          [style.backgroundImage]="gradientStyle"
          [style.animationDuration.s]="pulseDuration"
        ></div>

        <!-- Blurred color blobs (using CSS animations for simplicity/performance in Angular) -->
        <div class="absolute inset-0 mix-blend-screen opacity-0 animate-fade-in">
          <div class="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-600 rounded-full filter blur-3xl opacity-40 animate-blob-1"></div>
          <div class="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-fuchsia-600 rounded-full filter blur-3xl opacity-40 animate-blob-2"></div>
          <div class="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-indigo-700 rounded-full filter blur-3xl opacity-30 animate-blob-3"></div>
        </div>

        <!-- Twinkling stars -->
        <div *ngFor="let star of stars"
          class="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle"
          [style.left]="star.x"
          [style.top]="star.y"
          [style.animationDuration.s]="star.duration"
          [style.animationDelay.s]="star.delay"
        ></div>
      </div>

      <!-- Foreground content -->
      <div class="relative z-10">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .pulse-animation {
      background-size: 100% 100%;
      animation: pulse infinite ease-in-out;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.05); }
    }

    .animate-fade-in {
      animation: fadeIn 1s ease-in-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .animate-blob-1 {
      animation: blob1 30s infinite alternate ease-in-out;
    }

    @keyframes blob1 {
      0% { transform: translate(-50px, -20px) scale(1); }
      50% { transform: translate(50px, 20px) scale(1.2); }
      100% { transform: translate(-50px, -20px) scale(1); }
    }

    .animate-blob-2 {
      animation: blob2 40s infinite alternate ease-in-out;
    }

    @keyframes blob2 {
      0% { transform: translate(50px, 20px) scale(1); }
      50% { transform: translate(-50px, -20px) scale(1.3); }
      100% { transform: translate(50px, 20px) scale(1); }
    }

    .animate-blob-3 {
      animation: blob3 50s infinite alternate ease-in-out;
    }

    @keyframes blob3 {
      0% { transform: translate(20px, -30px) rotate(0deg); }
      50% { transform: translate(-20px, 30px) rotate(180deg); }
      100% { transform: translate(20px, -30px) rotate(360deg); }
    }

    .animate-twinkle {
      opacity: 0;
      animation: twinkle infinite ease-in-out;
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0; }
      50% { opacity: 0.8; }
    }
  `]
})
export class AuroraBackgroundComponent implements OnInit {
  @Input() className: string = '';
  @Input() starCount: number = 50;
  @Input() gradientColors: [string, string] = [
    'var(--aurora-color1, rgba(168,85,247,0.2))',
    'var(--aurora-color2, rgba(79,70,229,0.2))',
  ];
  @Input() pulseDuration: number = 10;
  @Input() ariaLabel: string = 'Animated aurora background';

  stars: any[] = [];
  gradientStyle: string = '';

  ngOnInit() {
    this.generateStars();
    this.updateGradient();
  }

  private generateStars() {
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: `${Math.random() * 100}vw`,
        y: `${Math.random() * 100}vh`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5
      });
    }
  }

  private updateGradient() {
    const [colorA, colorB] = this.gradientColors;
    this.gradientStyle = `radial-gradient(circle, ${colorA} 0%, transparent 80%), radial-gradient(circle, ${colorB} 0%, transparent 80%)`;
  }
}
