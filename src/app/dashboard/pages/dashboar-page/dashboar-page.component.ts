import { ChangeDetectionStrategy, Component, computed, inject, resource, signal, } from '@angular/core';
import { DashboarCardsComponent } from "../../components/dashboar-cards/dashboar-cards.component";
import { DashboardListComponent } from "../../components/dashboard-list/dashboard-list.component";
import { DashboardService } from '../../services/dashboard.service';
import { filter, find, firstValueFrom, map, tap } from 'rxjs';
import { Client } from '../../interfaces/clients.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboar-page',
  imports: [DashboarCardsComponent, DashboardListComponent],
  templateUrl: './dashboar-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboarPageComponent  {

  searchedClients?: Client[]| null = null;

  clientService = inject(DashboardService)

  router = inject(Router)

  limit = 7;
  currentPage = signal(0);
  lastLoadCount = signal(0);

  totalLoans = signal<number| null>(null) 
  capital = signal<number| undefined>(undefined)

  offset = computed(() => this.currentPage() * this.limit); 
  readonly disablePrev = computed(() => this.currentPage() === 0);
  readonly disableNext = computed(() => this.lastLoadCount() < this.limit);

  // get
  clientsResource = resource({
    request: (() => this.offset()),
    loader: async ({ request: offset }) => {
      const clients = await firstValueFrom(
        this.clientService.getClientsLimit(this.limit, offset),
      );
      this.lastLoadCount.set(clients.length);
      this.calculateFinancialSummary()
      return clients;
    }
  })


  //getById
 clietnSearchBy(event: any) {
  
  if (!event) {
    this.searchedClients = null; 
    return;
  }
  this.clientService.getClientsById(event).subscribe({
    next: (clients) => {
      this.searchedClients = clients;
    },
    error: () => {
      this.searchedClients = null;
    }
  });

}

  nextPage() {
    if (this.lastLoadCount() === this.limit) {
    const nextOffset = (this.currentPage() + 1) * this.limit;
    this.clientService.getClientsLimit(this.limit, nextOffset).subscribe(nextClients => {
      if (nextClients.length > 0) {
        this.currentPage.update(p => p + 1);
      }
    });
   }
  } 
  prevPage() {
    this.currentPage.update(p => (p > 0 ? p - 1 : 0));
  } 

  calculateFinancialSummary(){
    const capital = 1000000;
    this.clientService.getClients().pipe(
      map(clients => 
        clients.reduce((total, client) => total + (client.loans || 0), 0)
      )
    ).subscribe(totalLoans => {
      this.totalLoans.set(totalLoans) ;
      const availableCapital = capital - totalLoans;
      this.capital.set(availableCapital);
    });
  }
  
  //delete
clietnDeleteBy(id: string) {
  this.clientService.deleteClients(id).subscribe({
    next: () => {
      this.calculateFinancialSummary();
      this.clientsResource.reload()
    },
    error: (err) => {
      console.error('Error al eliminar cliente', err);
    }
  });
}


}
