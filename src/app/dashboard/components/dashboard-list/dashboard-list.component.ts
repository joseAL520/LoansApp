import { ChangeDetectionStrategy, Component, input, } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-list',
  imports: [RouterLink],
  templateUrl: './dashboard-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardListComponent { 

 typeRoute = input<string>()

}
