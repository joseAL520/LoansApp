import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { DashboarCardsComponent } from "../../components/dashboar-cards/dashboar-cards.component";
import { DashboardFormComponent } from "../../components/dashboard-form/dashboard-form.component";
import { DashboardListComponent } from "../../components/dashboard-list/dashboard-list.component";
import { firstValueFrom } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { Client } from '../../interfaces/clients.interfaces';

@Component({
  selector: 'app-loans-page',
  imports: [DashboarCardsComponent, DashboardFormComponent, DashboardListComponent],
  templateUrl: './loans-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoansPageComponent {
  
  searchedClients?: Client[]| null = null;

  clientService = inject(DashboardService)
  clientsRequest = signal({});  
  limit = 5;

  //get 
  clientsResource = resource({
      request: this.clientsRequest,
      loader: async({ request: offset } ) => {
        return await firstValueFrom(
          this.clientService.getClients(this.limit)
        )
      },
  })

  //getById
  clietnSearchBy(event: any) {
    const id = Number(event);
    if (!id) {
      this.searchedClients = null; 
      return;
    }
    this.clientService.getClientsById(id).subscribe({
      next: (clients) => {
        this.searchedClients = clients;
      },
      error: () => {
        this.searchedClients = null;
      }
    });

  }

  //post
  postClient(x:any){
    this.clientService.postClients(x).subscribe({
    next: () => {
       this.clientsRequest.update(r => ({ ...r }));
    },
    error: (err) => {
      console.error('Error al enviar cliente', err);
    }
  }
    )
  }

  //update

  //delete
  clietnDeleteBy(x:string){
    this.clientService.deleteClients(x).subscribe({
    next: () => {
       this.clientsRequest.update(r => ({ ...r }));
    },
    error: (err) => {
      console.error('Error al eliminar cliente', err);
    }
  }
    )
  }
}