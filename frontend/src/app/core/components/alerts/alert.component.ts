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

  removeAlert(message: SafeHtml | null): void {
    this.alerts = this.alerts.filter((alert) => alert.msg !== message);
  }
}
