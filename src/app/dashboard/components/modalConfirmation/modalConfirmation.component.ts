import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { Client } from '../../interfaces/clients.interfaces';
import { DashboardService } from '../../services/dashboard.service';
import {  CurrencyPipe, DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-modal-confirmation',
  imports: [CurrencyPipe,DecimalPipe,TitleCasePipe],
  templateUrl: './modalConfirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfirmationComponent {

  serviceClient = inject(DashboardService)

  optionMenu = input();
  detalleClient = input<Client>();
  
  proceed = output<any>();


  openModal(type: 'mas' | 'delete'| 'pay', client: Client) {
    const modalId = `modal_${type}_${client.id}`;
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) modal.showModal();
  }

confirmAction() {
    if (this.detalleClient) {
      this.proceed.emit(this.detalleClient()?.id);
    }
    const modalId = `modal_delete_${this.detalleClient()?.id}`;
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) modal.close();
  }

}
