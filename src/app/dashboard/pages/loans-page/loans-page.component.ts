import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboarCardsComponent } from "../../components/dashboar-cards/dashboar-cards.component";
import { DashboardFormComponent } from "../../components/dashboard-form/dashboard-form.component";
import { DashboardListComponent } from "../../components/dashboard-list/dashboard-list.component";

@Component({
  selector: 'app-loans-page',
  imports: [DashboarCardsComponent, DashboardFormComponent, DashboardListComponent],
  templateUrl: './loans-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoansPageComponent { }
