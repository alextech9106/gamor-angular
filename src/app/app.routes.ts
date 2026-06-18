import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('@pages/sign-in/sign-in.component').then((m) => m.SignInComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('@pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'streams',
    loadComponent: () => import('@pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'party',
    loadComponent: () => import('@pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'premium',
    loadComponent: () => import('@pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
