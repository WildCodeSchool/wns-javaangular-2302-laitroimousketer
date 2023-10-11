import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alerts: { type: string, msg: SafeHtml | null }[] = [];

  constructor(private sanitizer: DomSanitizer, private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.successMsg$.subscribe((successMsg: string | null) => {
      if (successMsg) {
        const sanitizedMsg = this.sanitizer.sanitize(SecurityContext.HTML, successMsg);
        if (sanitizedMsg) {
          this.alerts.push({ type: 'success', msg: sanitizedMsg });
          setTimeout(() => {
            this.removeAlert(sanitizedMsg);
          }, 5000);
        }
      }
    });

    this.alertService.errorMsg$.subscribe((errorMsg: string | null) => {
      if (errorMsg) {
        const sanitizedMsg = this.sanitizer.sanitize(SecurityContext.HTML, errorMsg);
        if (sanitizedMsg) {
          this.alerts.push({ type: 'danger', msg: sanitizedMsg });
          setTimeout(() => {
            this.removeAlert(sanitizedMsg);
          }, 5000);
        }
      }
    });
  }
 // Méthode pour obtenir les classes CSS spécifiques pour chaque icône Bootstrap en fonction du type d'alerte
 getIconForType(type: string): string {
  if (type === 'success') {
    return 'bi bi-check-circle-fill';
  } else if (type === 'danger') {
    return 'bi bi-exclamation-circle-fill';
  } else {
    return ''; // Retourne une chaîne vide si aucun type d'alerte correspondant n'est trouvé
  }
}
  removeAlert(message: SafeHtml | null): void {
    this.alerts = this.alerts.filter((alert) => alert.msg !== message);
  }
}
