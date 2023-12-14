import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Alayde';
  isOnAuthPage: boolean = false;
  currentUrl: string = '';

  constructor(private router: Router,
    public alertService: AlertService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentUrl = event.url;
        this.isOnAuthPage = this.currentUrl.includes('auth');
      }
    });
  }

  onAlertClosed(event: any) {
    // Logique pour gérer la fermeture de l'alerte
  }
}
