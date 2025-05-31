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


  getClients():Observable<Client>{

    return this.httpClient.get<Client>(`${basUrl}clients`,{
      params:{
        _page:2,
        _limit:3
      }
    }).pipe(
      tap( (valu) => console.log(valu) )
    )
  }

}
