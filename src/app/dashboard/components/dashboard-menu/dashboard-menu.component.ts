import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard-menu',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './dashboard-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class  DashboardMenuComponent { }
