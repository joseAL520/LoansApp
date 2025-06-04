import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth.interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

type AuthStatus = 'cheking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.api.adminLogin


@Injectable({
  providedIn: 'root'
})
export class AdmBankService {

  private _authStatus = signal<AuthStatus>('cheking');
  private _user = signal<User|null>(null);
  private _token = signal<string|null>(null);

  private http = inject(HttpClient);

  router = inject(Router)

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>( () =>{
    if(this._authStatus() === 'cheking') return 'cheking'
    if(this._user()) return 'authenticated'
    return "not-authenticated"
  })


  user =computed(()=> this._user());
  token = computed(this._token);

  //  json-server NO hace validaciones reales ni autenticación segura, solo filtra datos de forma simple
  // este metodo de auth es con el fin de demostrar las mis habilidades en el manejo de auth y JWT 
  // 
  login(email:string,password:string):Observable<boolean>{
    return this.http.get<AuthResponse>(`${baseUrl}?email=${email}&password=${password}`).pipe(
     map(({user,token}) => {
      //validor temporal 
        if(user.email === email,user.password === password){
          this.handleAuthSuccess({token,user})
          return true
        }
        return false
  }),
    catchError((error: any) => this.handleAuthError(error))
     
    )
  }

  checkStatus(): Observable<boolean> {
    const tokenLocal = localStorage.getItem('token');
    console.log(tokenLocal)
    if (!tokenLocal) {
      this.router.navigateByUrl('/auth/')
      this.logout();
      return of(false);
    }
    return this.http.get<AuthResponse>(`${baseUrl}`, {
      //para podr validar el token 
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .pipe(
        map(({user,token}) => {
          if(token===tokenLocal){
            this.handleAuthSuccess({token,user})
            return true
          }
          return false
        }),
        catchError((error: any) => this.handleAuthError(error))
      );
 }
  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    this.router.navigateByUrl('/auth/')
    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }

}
