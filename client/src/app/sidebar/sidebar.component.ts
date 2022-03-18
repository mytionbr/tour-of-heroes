import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RefreshService } from '../refresh.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  isAuth: boolean = false;
  private updateSubscription: Subscription;

  constructor(private authService: AuthService, private refreshService: RefreshService) { 
    this.updateSubscription = this.refreshService.getUpdate().subscribe(
      result => {
        if (result) this.ngOnInit()
      }
    )
  }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated();
  }

  ngOnDestroy(): void {
      this.updateSubscription.unsubscribe()
  }

}
