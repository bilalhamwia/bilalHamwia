import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { trigger, state, style, transition, animate } from '@angular/animations';

const cardVariants = cva(
  "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg",
  {
    variants: {
      gradient: {
        orange: "bg-gradient-to-br from-orange-100 to-amber-200/50",
        gray: "bg-gradient-to-br from-slate-100 to-slate-200/50",
        purple: "bg-gradient-to-br from-purple-100 to-indigo-200/50",
        green: "bg-gradient-to-br from-emerald-100 to-teal-200/50",
      },
    },
    defaultVariants: {
      gradient: "gray",
    },
  }
);

@Component({
  selector: 'app-gradient-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [@cardHover]="hoverState"
      (mouseenter)="hoverState = 'hover'"
      (mouseleave)="hoverState = 'rest'"
      [class]="cardClasses"
    >
      <!-- Decorative background image with animation -->
      <img
        *ngIf="imageUrl"
        [src]="imageUrl"
        [alt]="title + ' background graphic'"
        [@imageHover]="hoverState"
        class="absolute -right-1/4 -bottom-1/4 w-3/4 opacity-80 pointer-events-none dark:opacity-30 transition-transform duration-500"
      />

      <!-- Card Content -->
      <div class="z-10 flex flex-col h-full">
        <!-- Badge -->
        <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1 text-sm font-medium text-slate-900 backdrop-blur-sm w-fit border border-white/20">
          <span 
            class="h-2 w-2 rounded-full" 
            [style.backgroundColor]="badgeColor"
          ></span>
          {{ badgeText }}
        </div>

        <!-- Title and Description -->
        <div class="flex-grow">
          <h3 class="text-2xl font-bold text-slate-900 mb-2">{{ title }}</h3>
          <p class="text-slate-700 max-w-xs">{{ description }}</p>
        </div>
        
        <!-- Call to Action Link -->
        <a
          [href]="ctaHref"
          class="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 no-underline"
        >
          {{ ctaText }}
          <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  `,
  animations: [
    trigger('cardHover', [
      state('rest', style({ transform: 'scale(1) translateY(0)' })),
      state('hover', style({ transform: 'scale(1.03) translateY(-4px)' })),
      transition('rest <=> hover', animate('400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'))
    ]),
    trigger('imageHover', [
      state('rest', style({ transform: 'scale(1) rotate(0)' })),
      state('hover', style({ transform: 'scale(1.1) rotate(3deg)' })),
      transition('rest <=> hover', animate('500ms ease-out'))
    ])
  ]
})
export class GradientCardComponent {
  @Input() gradient: 'orange' | 'gray' | 'purple' | 'green' = 'gray';
  @Input() badgeText!: string;
  @Input() badgeColor!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() ctaText!: string;
  @Input() ctaHref: string = '#';
  @Input() imageUrl!: string;

  hoverState: 'rest' | 'hover' = 'rest';

  get cardClasses() {
    return cardVariants({ gradient: this.gradient });
  }
}
