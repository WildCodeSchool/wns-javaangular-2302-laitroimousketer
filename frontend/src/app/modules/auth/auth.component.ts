import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  activeTab: 'login' | 'register' = 'login';
  private activeTabSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.activeTabSubscription = this.authService.activeTab$.subscribe((tab: 'login' | 'register') => {
      this.activeTab = tab;
    });
  }

  ngOnDestroy(): void {
    this.activeTabSubscription.unsubscribe();
  }

}
