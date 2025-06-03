import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '../interfaces/clients.interfaces';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const basUrl = environment.baseUrlClient
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private httpClient = inject(HttpClient)
  private normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') 
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

  //NOTA: cree dos get para una para manejos con parametros y otros no
  getClientsLimit(limit: number, offset: number = 0):Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${basUrl}`,{
      params:{
        _limit:limit,
        _start:offset
      }
    })  
  }

  getClients():Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${basUrl}`)  
  }

  getClientsById(term: string): Observable<Client[]> {
    const isNumeric = /^\d+$/.test(term);
    if (isNumeric) {
    
      return this.httpClient.get<Client[]>(`${basUrl}?nit=${term}`);
    } else {
    
      return this.httpClient.get<Client[]>(`${basUrl}`).pipe(
        map(clients =>
          clients.filter(client =>
            this.normalize(client.fullName).includes(this.normalize(term))
          )
        )
      );
    }
  }


  postClients(client:any):Observable<Client>{
    return this.httpClient.post<Client>(`${basUrl}`,client)
  }

  getClientsIdBy(id:any):Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${basUrl}?id=${id}`)
  }

 updateClients(id: string, clientUpdate: any): Observable<Client> {
  return this.httpClient.put<Client>(`${basUrl}/${id}`, clientUpdate);
}

  deleteClients(id:string):Observable<Client>{
    return this.httpClient.delete<Client>(`${basUrl}/${id}`)
  }

}
