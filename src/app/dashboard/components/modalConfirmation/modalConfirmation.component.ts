import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { Client } from '../../interfaces/clients.interfaces';
import { DashboardService } from '../../services/dashboard.service';
import { map } from 'rxjs';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-modal-confirmation',
  imports: [CurrencyPipe,DecimalPipe],
  templateUrl: './modalConfirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfirmationComponent {

  serviceClient = inject(DashboardService)

  optionMenu = input();
  idClient = input();
  
  infoClient = signal<Client[]|null>(null)

  proceed = output<boolean>();


  confirmAction(confirm:boolean){
    this.proceed.emit(confirm)
  }

  getClient(){
    this.serviceClient.getClientsIdBy(this.idClient()).pipe(
    map(resp => this.infoClient.set(resp))
  ).subscribe()
  }

}
