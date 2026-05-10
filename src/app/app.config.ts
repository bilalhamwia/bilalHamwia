import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { LucideAngularModule, ArrowRight, Coffee, Database, Server, GitBranch, Layers, Cpu, Globe, Code } from 'lucide-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    importProvidersFrom(LucideAngularModule.pick({ 
      ArrowRight, 
      Coffee, 
      Database, 
      Server, 
      GitBranch, 
      Layers, 
      Cpu, 
      Globe, 
      Code 
    }))
  ]
};
