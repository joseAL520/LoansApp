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
  
  proceed = output<boolean>();

  confirmAction(confirm:boolean){
    this.proceed.emit(confirm)
  }

  openModal() {
    const id = 'modal_' + this.detalleClient()?.id;
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) modal.showModal();
 }

}
