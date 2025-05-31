import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { DashboarCardsComponent } from "../../components/dashboar-cards/dashboar-cards.component";
import { DashboardFormComponent } from "../../components/dashboard-form/dashboard-form.component";
import { DashboardListComponent } from "../../components/dashboard-list/dashboard-list.component";
import { firstValueFrom } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-loans-page',
  imports: [DashboarCardsComponent, DashboardFormComponent, DashboardListComponent],
  templateUrl: './loans-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoansPageComponent {
  clientService = inject(DashboardService)

  limit = 5;
  clietnsResource = resource({
      
      request:() => ({}),
      loader: async({ request: offset } ) => {
        return await firstValueFrom(
          this.clientService.getClients(this.limit)
        )
      },
  })


}
