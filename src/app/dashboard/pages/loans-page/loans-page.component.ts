import { ChangeDetectionStrategy, Component, computed, inject, resource, signal } from '@angular/core';
import { DashboarCardsComponent } from "../../components/dashboar-cards/dashboar-cards.component";
import { DashboardFormComponent } from "../../components/dashboard-form/dashboard-form.component";
import { DashboardListComponent } from "../../components/dashboard-list/dashboard-list.component";
import { firstValueFrom, map } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { Client } from '../../interfaces/clients.interfaces';
import { environment } from '../../../../environments/environment.development';

const bankCapita = environment.BANK_INITIAL_CAPITAL


@Component({
  selector: 'app-loans-page',
  imports: [DashboarCardsComponent, DashboardFormComponent, DashboardListComponent],
  templateUrl: './loans-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoansPageComponent {
  
  searchedClients?: Client[]| null = null;

  clientService = inject(DashboardService)

  
  totalLoans = signal<number| null>(null) 
  capital = signal<number| undefined>(undefined)


  currentPage = signal(0);
  offset = computed(() => this.currentPage() * 3); 

  //get 
 clientsResource = resource({
    request: (() => this.offset()),
    loader: async ({ request: offset }) => {
      const clients = await firstValueFrom(
        this.clientService.getClients().pipe(
          map( clients =>  clients.slice(1).reverse())
        ),
      );
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

  //post
  postClient(x:any){
    this.clientService.postClients(x).subscribe({
    next: () => {
       this.clientsResource.reload()
    },
    error: (err) => {
      console.error('Error al enviar cliente', err);
    }
  }
    )
  }

  calculateFinancialSummary(){
    const capital = bankCapita;
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
      this.clientsResource.reload()

    },
    error: (err) => {
      console.error('Error al eliminar cliente', err);
    }
  }
    )
  }

  ngOnInit(): void {
    this.clientsResource.reload()
  }
}