import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interfaces';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboar-cards',
  imports: [CurrencyPipe],
  templateUrl: './dashboar-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboarCardsComponent { 


  capital = input<number>()
  loans = input<number | null>()

  
}
