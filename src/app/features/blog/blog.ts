import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-24 bg-gray-50/50 dark:bg-black/20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-between items-end mb-16">
          <div>
            <h2 class="text-4xl font-bold mb-4 gradient-text inline-block">Latest Articles</h2>
            <p class="opacity-70 text-lg">Insights and thoughts on web development and design.</p>
          </div>
          <button class="hidden md:block btn-primary">View All Posts</button>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div *ngFor="let post of posts" 
               class="glass rounded-3xl overflow-hidden group cursor-pointer">
            <div class="aspect-video bg-gradient-to-br from-primary-start/20 to-primary-end/20 flex items-center justify-center text-5xl">
              ✍️
            </div>
            <div class="p-8">
              <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary-start mb-4">
                <span>{{ post.category }}</span>
                <span>•</span>
                <span>{{ post.readTime }}</span>
              </div>
              <h3 class="text-2xl font-bold mb-4 group-hover:text-primary-start transition-colors">{{ post.title }}</h3>
              <p class="opacity-70 text-sm mb-6 leading-relaxed">{{ post.excerpt }}</p>
              <a class="font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                Read More <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BlogComponent {
  posts = [
    {
      title: 'Mastering Angular Signals',
      excerpt: 'Learn how to leverage Angular Signals to build high-performance applications with granular reactivity.',
      category: 'Angular',
      readTime: '5 min read'
    },
    {
      title: 'The Future of CSS with Tailwind',
      excerpt: 'Exploring how TailwindCSS is changing the way we think about utility-first styling and modern design systems.',
      category: 'CSS',
      readTime: '4 min read'
    },
    {
      title: 'RxJS Best Practices in 2024',
      excerpt: 'A deep dive into common RxJS patterns and how to avoid memory leaks in complex Angular applications.',
      category: 'RxJS',
      readTime: '8 min read'
    }
  ];
}
