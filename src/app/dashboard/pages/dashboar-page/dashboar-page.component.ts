import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DashboarCardsComponent } from "../../components/dashboar-cards/dashboar-cards.component";
import { DashboardListComponent } from "../../components/dashboard-list/dashboard-list.component";
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboar-page',
  imports: [DashboarCardsComponent, DashboardListComponent],
  templateUrl: './dashboar-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboarPageComponent  {

 clientService = inject(DashboardService)


  ngOnInit(): void {

    this.clientService.getClients().subscribe()
    
  }

}
