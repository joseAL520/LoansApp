import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdmBankService } from '../../../auth/services/admBank.service';

@Component({
  selector: 'app-dashboard-menu',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './dashboard-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class  DashboardMenuComponent {

  serviceUser = inject(AdmBankService)

}
