import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },


      {
        path: 'home',
        loadComponent: () => import('../products/presentation/products/products').then(m => m.default),
    },

      {
        path: '**',
        redirectTo: ''
    }


];
