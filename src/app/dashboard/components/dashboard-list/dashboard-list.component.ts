import { ChangeDetectionStrategy, Component, EventEmitter, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Client } from '../../interfaces/clients.interfaces';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ModalConfirmationComponent } from "../modalConfirmation/modalConfirmation.component";

@Component({
  selector: 'app-dashboard-list',
  imports: [RouterLink, CurrencyPipe, ModalConfirmationComponent, TitleCasePipe],
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

  onDelete(proceed:any) {
    if(!proceed) return
    this.deleteOutput.emit(proceed)
  }

}
