import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./routes/home/home.component')
    },
    {
        path: 'members',
        loadComponent: () => import('./routes/members/members.component')
    },
    {
        path: 'members/:region/:realm/:name',
        loadComponent: () => import('./routes/members/pages/characterPage.component')
    },
    {
        path: '**',
        redirectTo: '/'
    },

];
