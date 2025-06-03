import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdmBankService } from '../../../auth/services/admBank.service';

@Component({
  selector: 'app-dashboard-menu',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './dashboard-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class  DashboardMenuComponent {

  serviceUser = inject(AdmBankService)

  sidebarOpen = false;

  ngOnInit() {
    this.sidebarOpen = window.innerWidth >= 1024; // visible en desktop
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebarOnMobile() {
    if (window.innerWidth < 1024) {
      this.sidebarOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    if (width >= 1024) {
      this.sidebarOpen = true;
    } else {
      this.sidebarOpen = false;
    }
  }

}
