import { ChangeDetectionStrategy, Component, computed, inject, resource, signal, } from '@angular/core';
import { DashboarCardsComponent } from "../../components/dashboar-cards/dashboar-cards.component";
import { DashboardListComponent } from "../../components/dashboard-list/dashboard-list.component";
import { DashboardService } from '../../services/dashboard.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboar-page',
  imports: [DashboarCardsComponent, DashboardListComponent],
  templateUrl: './dashboar-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboarPageComponent  {

  clientService = inject(DashboardService)


  limit = 7;
  currentPage = signal(0);
  lastLoadCount = signal(0);

  offset = computed(() => this.currentPage() * this.limit); 
  readonly disablePrev = computed(() => this.currentPage() === 0);
  readonly disableNext = computed(() => this.lastLoadCount() < this.limit);

 clietnsResource = resource({
  request: () => this.offset(),
  loader: async ({ request: offset }) => {
    const clients = await firstValueFrom(
      this.clientService.getClients(this.limit, offset)
    );
    this.lastLoadCount.set(clients.length);
    return clients;
  }
})

  

  nextPage() {
    if (this.lastLoadCount() === this.limit) {
    this.currentPage.update(p => p + 1);
  }
  } 
  prevPage() {
    this.currentPage.update(p => (p > 0 ? p - 1 : 0));
  } 


}
