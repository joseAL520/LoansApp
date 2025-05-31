import { ChangeDetectionStrategy, Component, EventEmitter, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Client } from '../../interfaces/clients.interfaces';

@Component({
  selector: 'app-dashboard-list',
  imports: [RouterLink],
  templateUrl: './dashboard-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardListComponent {


  typeRoute = input<string>()

  clients = input<Client[]>()
  isLoading = input<boolean>(false)
  ismessangerError = input<string | undefined | unknown>()
  
  

}
