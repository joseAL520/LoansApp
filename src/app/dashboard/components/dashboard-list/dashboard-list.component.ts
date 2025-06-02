import { ChangeDetectionStrategy, Component, EventEmitter, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Client } from '../../interfaces/clients.interfaces';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './dashboard-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardListComponent {


  typeRoute = input<string>()

  clients = input<Client[]>()
  isLoading = input<boolean>(false)
  ismessangerError = input<string | undefined | unknown>()
  
  searchOutput = output<void>();
  deleteOutput = output<string>();

  onSearch(x:any) {
    this.searchOutput.emit(x.target.value)
  }

  onDelete(x:string) {
   this.deleteOutput.emit(x)
  }

}
