import { Routes } from '@angular/router';

export const routes: Routes = [
    //Manejo de lazyload
    {
        path:'auth',
        loadChildren: () => import('./auth/auth.routes'),
    },
    {
        path:'',
        loadChildren: () => import('./dashboard/dashboard.routes'),
    },
];
