import { Component } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Alayde';

  constructor(public alertService: AlertService) {}

  onAlertClosed(event: any) {
    // Logique pour gérer la fermeture de l'alerte
  }
}
