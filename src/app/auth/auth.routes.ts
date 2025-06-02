import { Routes } from "@angular/router";
import { AuthLayoutsComponent } from "./layouts/auth-layouts/auth-layouts.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

export const authRoutes: Routes =[
    {
        path:"",
        component:AuthLayoutsComponent,
        children:[
            {
                path:'login',
                component:LoginPageComponent
            },
            {
                path:'**',
                redirectTo:'login'
            }
        ]
    }
]


export default authRoutes