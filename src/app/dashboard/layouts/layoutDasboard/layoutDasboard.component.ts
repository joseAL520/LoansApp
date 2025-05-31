import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardMenuComponent } from "../../components/dashboard-menu/dashboard-menu.component";

@Component({
  selector: 'app-layout-dasboard',
  imports: [RouterOutlet, DashboardMenuComponent],
  templateUrl: './layoutDasboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDasboardComponent { }
