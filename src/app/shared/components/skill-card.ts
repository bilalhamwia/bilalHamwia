import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div 
      class="group relative p-6 rounded-2xl transition-all duration-500 hover:scale-[1.02] cursor-default"
      [ngClass]="active ? 'glass-active' : 'glass'"
      (mouseenter)="isHovered = true"
      (mouseleave)="isHovered = false"
      [@cardState]="isHovered ? 'hover' : 'rest'"
    >
      <!-- Background Glow -->
      <div 
        class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl bg-gradient-to-br"
        [ngClass]="colorClass"
      ></div>

      <div class="flex items-start gap-4 mb-4">
        <div 
          class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
          [ngClass]="iconBgClass"
        >
          <lucide-icon [name]="iconName" [size]="24" class="text-white"></lucide-icon>
        </div>
        <div class="flex-grow">
          <h4 class="text-lg font-bold group-hover:text-primary-start transition-colors">{{ name }}</h4>
          <span class="text-xs opacity-60 uppercase tracking-widest font-semibold">{{ category }}</span>
        </div>
        <div class="text-right">
          <span class="text-xl font-black gradient-text">{{ level }}%</span>
        </div>
      </div>

      <div class="space-y-2">
        <div class="flex justify-between text-[10px] font-bold opacity-40 uppercase tracking-tighter">
          <span>Beginner</span>
          <span>Expert</span>
        </div>
        <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <div 
            class="h-full rounded-full transition-all duration-1000 ease-out relative"
            [style.width.%]="level"
            [ngClass]="progressClass"
          >
            <!-- Animated shimmer on progress bar -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>

      <!-- Detail text (optional) -->
      <p *ngIf="description" class="mt-4 text-xs opacity-60 leading-relaxed group-hover:opacity-100 transition-opacity">
        {{ description }}
      </p>
    </div>
  `,
  styles: [`
    .glass {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .glass-active {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }
    .animate-shimmer {
      animation: shimmer 2s infinite linear;
      background-size: 200% 100%;
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `],
  animations: [
    trigger('cardState', [
      state('rest', style({ transform: 'translateY(0)' })),
      state('hover', style({ transform: 'translateY(-8px)' })),
      transition('rest <=> hover', animate('400ms cubic-bezier(0.2, 0.8, 0.2, 1)'))
    ])
  ]
})
export class SkillCardComponent {
  @Input() name!: string;
  @Input() level: number = 0;
  @Input() iconName: string = 'code';
  @Input() category: string = 'General';
  @Input() description?: string;
  @Input() color: 'purple' | 'blue' | 'green' | 'orange' | 'pink' = 'purple';
  @Input() active: boolean = false;

  isHovered = false;

  get colorClass() {
    const classes = {
      purple: 'from-purple-500 to-indigo-500',
      blue: 'from-blue-500 to-cyan-500',
      green: 'from-emerald-500 to-teal-500',
      orange: 'from-orange-500 to-amber-500',
      pink: 'from-pink-500 to-rose-500'
    };
    return classes[this.color];
  }

  get iconBgClass() {
    const classes = {
      purple: 'bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
      blue: 'bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]',
      green: 'bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
      orange: 'bg-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.3)]',
      pink: 'bg-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
    };
    return classes[this.color];
  }

  get progressClass() {
    const classes = {
      purple: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      blue: 'bg-gradient-to-r from-blue-500 to-cyan-600',
      green: 'bg-gradient-to-r from-emerald-500 to-teal-600',
      orange: 'bg-gradient-to-r from-orange-500 to-amber-600',
      pink: 'bg-gradient-to-r from-pink-500 to-rose-600'
    };
    return classes[this.color];
  }
}
