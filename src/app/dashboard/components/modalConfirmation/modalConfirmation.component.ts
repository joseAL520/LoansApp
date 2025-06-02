import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmation',
  imports: [],
  templateUrl: './modalConfirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfirmationComponent {

  optionMenu = input()

  proceed = output<boolean>();


  confirmAction(confirm:boolean){
    console.log()
    this.proceed.emit(confirm)
  }

}
