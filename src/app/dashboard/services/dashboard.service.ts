import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '../interfaces/clients.interfaces';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const basUrl = environment.baseUrlClient
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private httpClient = inject(HttpClient)


  getClients(limit: number, offset: number = 0):Observable<Client[]>{

    return this.httpClient.get<Client[]>(`${basUrl}clients`,{
      params:{
        _limit:limit,
        _start:offset
      }
    }).pipe(
      tap( (valu) => console.log(valu) )
    )
  }

}
