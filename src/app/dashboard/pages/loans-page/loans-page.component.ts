import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { DashboarCardsComponent } from "../../components/dashboar-cards/dashboar-cards.component";
import { DashboardFormComponent } from "../../components/dashboard-form/dashboard-form.component";
import { DashboardListComponent } from "../../components/dashboard-list/dashboard-list.component";
import { firstValueFrom, map } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { Client } from '../../interfaces/clients.interfaces';
import { AdmBankService } from '../../../auth/services/admBank.service';

@Component({
  selector: 'app-loans-page',
  imports: [DashboarCardsComponent, DashboardFormComponent, DashboardListComponent],
  templateUrl: './loans-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoansPageComponent {
  
  searchedClients?: Client[]| null = null;

  clientService = inject(DashboardService)
  adminService = inject(AdmBankService)

  clientsRequest = signal({});
  
  totalLoans = signal<number| null>(null) 
  capital = signal<number| undefined>(undefined)
  
  limit = 5;

  //get 
  clientsResource = resource({
    request: this.clientsRequest,
      loader: async ({ request: offset }) => {
      const clients = await firstValueFrom(
        this.clientService.getClientsLimit(this.limit, 0),
      );
      this.calculateFinancialSummary()
      return clients;
    }
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

  calculateFinancialSummary(){
    const capital = this.adminService.user()?.Wallet.capital ?? 0;
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

  ngOnInit(): void {
   this.clientsRequest.update(r => ({ ...r }));
  }
}