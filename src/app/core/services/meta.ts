import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(
    private meta: Meta, 
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  updateTags(data: {
    title: string;
    description: string;
    image?: string;
    url?: string;
  }) {
    this.title.setTitle(data.title);
    
    this.meta.updateTag({ name: 'description', content: data.description });
    
    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    if (data.image) this.meta.updateTag({ property: 'og:image', content: data.image });
    if (data.url) this.meta.updateTag({ property: 'og:url', content: data.url });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    if (data.image) this.meta.updateTag({ name: 'twitter:image', content: data.image });
  }

  setStructuredData(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    }
  }
}
