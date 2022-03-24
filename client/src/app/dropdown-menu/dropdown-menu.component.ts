import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RefreshService } from '../refresh.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  isLoggedIn: boolean = false;
  isShow: boolean = false;
  private updateSubscription: Subscription;


  constructor(private authService: AuthService, private refreshService: RefreshService) {
    this.updateSubscription = this.refreshService.getUpdate().subscribe(
      result => {
        if (result) this.ngOnInit()
      }
    )
   }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated()
  }

  onShow(): void {
    this.isShow = !this.isShow
  }

}
