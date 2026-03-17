import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="py-12 bg-gray-50 dark:bg-black/40">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-200 dark:border-white/10 pb-12 mb-12">
          <div class="text-3xl font-bold gradient-text">Bilal Hamwia</div>
          <div class="flex gap-8 items-center text-sm font-bold uppercase tracking-widest">
            <a href="#home" class="hover:text-primary-start transition-colors">Home</a>
            <a href="#about" class="hover:text-primary-start transition-colors">About</a>
            <a href="#portfolio" class="hover:text-primary-start transition-colors">Portfolio</a>
            <a href="#contact" class="hover:text-primary-start transition-colors">Contact</a>
          </div>
          <div class="flex gap-4">
            <a class="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-primary-start hover:text-white transition-all cursor-pointer">🔗</a>
            <a class="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-primary-start hover:text-white transition-all cursor-pointer">🐦</a>
            <a class="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-primary-start hover:text-white transition-all cursor-pointer">💻</a>
          </div>
        </div>
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <p>© 2026 Bilal Hamwia. Built with Angular & GSAP.</p>
          <div class="flex gap-8">
            <a href="#" class="hover:underline">Privacy Policy</a>
            <a href="#" class="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
