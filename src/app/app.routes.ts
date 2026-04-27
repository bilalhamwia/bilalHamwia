import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.HomeComponent),
    title: 'Senior Angular Developer | Portfolio'
  },
  {
    path: 'games',
    loadComponent: () => import('./features/Games/games').then(m => m.GamesComponent),
    title: 'Games | Arcade'
  },
  {
    path: 'games/pong',
    loadComponent: () => import('./features/Games/pong/pong').then(m => m.PongComponent),
    title: 'Pong | Arcade'
  }
];
