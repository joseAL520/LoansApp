import { Routes } from '@angular/router';
import { LayoutDasboardComponent } from './layouts/layoutDasboard/layoutDasboard.component';
import { DashboarPageComponent } from './pages/dashboar-page/dashboar-page.component';
import { LoansPageComponent } from './pages/loans-page/loans-page.component';

export const dashboarRoutes: Routes = [

    {
        path:'',
        component:  LayoutDasboardComponent,
        children:[
            {
                path:'',
                component:DashboarPageComponent
            },
            {
                path:'lonsEdit/:id',
                component:LoansPageComponent
            },
            {
                path:'lonsAgg',
                component:LoansPageComponent
            },
            
        ]
    },
    {
        path:'**',
        redirectTo:''
    }
];

export default dashboarRoutes;
