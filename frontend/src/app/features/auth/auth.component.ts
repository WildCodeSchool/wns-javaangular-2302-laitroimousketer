import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})

export class AuthComponent implements OnInit, OnDestroy {
  activeTab: 'login' | 'register' = 'login';
  private activeTabSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.activeTabSubscription = this.authService.activeTab$.subscribe((tab: 'login' | 'register') => {
      this.activeTab = tab;
    });
  }
  ngAfterViewInit(): void {
    const video = this.elementRef.nativeElement.querySelector('#bgVideo');
    video.addEventListener('canplaythrough', () => {
      video.play();
    });
  }
  ngOnDestroy(): void {
    this.activeTabSubscription.unsubscribe();
  }

}