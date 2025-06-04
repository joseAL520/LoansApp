import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '../interfaces/clients.interfaces';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const basUrl = environment.api.clients
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


  //NOTA: creee varios metodo get para demostrar distintas formas manejo de api

  //PRIMERA: Manejo de parametros
  getClientsLimit(limit: number, offset: number = 0):Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${basUrl}`,{
      params:{
        _limit:limit,
        _start:offset
      }
    })  
  }

  //Segundo: Por busqueda por ID
  getClientsIdBy(id:any):Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${basUrl}?id=${id}`)
  }

  //General: Busqueda normal
  getClients():Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${basUrl}`)  
  }

  //General: Busqueda Nombre y o numero de identificion
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

  // metodo Post
  postClients(client:any):Observable<Client>{
    return this.httpClient.post<Client>(`${basUrl}`,client)
  }

  //Metodo Put
  updateClients(id: string, clientUpdate: any): Observable<Client> {
    return this.httpClient.put<Client>(`${basUrl}/${id}`, clientUpdate);
  }

  //Metodo Delete
  deleteClients(id:string):Observable<Client>{
    return this.httpClient.delete<Client>(`${basUrl}/${id}`)
  }

}
