import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/refresh.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,  private refreshService: RefreshService) { }

  ngOnInit(): void {
    this.authService.signout();
    this.refreshService.sendUpdate(true);
    this.router.navigate(['/dashboard']);
  }

}
