import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboarCardsComponent } from "../../components/dashboar-cards/dashboar-cards.component";
import { DashboardListComponent } from "../../components/dashboard-list/dashboard-list.component";

@Component({
  selector: 'app-dashboar-page',
  imports: [DashboarCardsComponent, DashboardListComponent],
  templateUrl: './dashboar-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboarPageComponent { }
