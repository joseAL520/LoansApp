import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth.interfaces';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'cheking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrlAdmBank


@Injectable({
  providedIn: 'root'
})
export class AdmBankService {

  private _authStatus = signal<AuthStatus>('cheking');
  private _user = signal<User|null>(null);
  private _token = signal<string|null>(null);

  private http = inject(HttpClient);

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

  login(email:string,password:string):Observable<boolean>{
    return this.http.get<AuthResponse>(`${baseUrl}?email=${email}&password=${password}`).pipe(
     map(resp => this.handleAuthSuccess(resp)),
    catchError((error: any) => this.handleAuthError(error))
     
    )
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    console.log('token de check',token)
    return this.http.get<AuthResponse>(`${baseUrl}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      );
 }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

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
