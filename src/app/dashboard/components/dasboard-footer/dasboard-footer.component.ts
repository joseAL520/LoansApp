import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dasboard-footer',
  imports: [DatePipe],
  templateUrl: './dasboard-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DasboardFooterComponent {
date  =  Date();

}
