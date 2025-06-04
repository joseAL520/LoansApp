import { Routes } from "@angular/router";
import { AuthLayoutsComponent } from "./layouts/auth-layouts/auth-layouts.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

export const authRoutes: Routes =[
    //Manejo de lazyload
    // angular detecta desde las ruta padre que estos componentes se cargan de foma perezosa
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