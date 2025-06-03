import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardMenuComponent } from "../../components/dashboard-menu/dashboard-menu.component";
import { DasboardFooterComponent } from "../../components/dasboard-footer/dasboard-footer.component";

@Component({
  selector: 'app-layout-dasboard',
  imports: [RouterOutlet, DashboardMenuComponent, DasboardFooterComponent],
  templateUrl: './layoutDasboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDasboardComponent { }
