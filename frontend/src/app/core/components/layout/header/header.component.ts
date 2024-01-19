import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  avatar: string = 'assets/images/avatar.png';
  alert: string = 'bi bi-bell-slash';
  title: string = '';
  animateTitle: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
    });
    this.updateTitle();
  }

  updateTitle() {
    const currentUrl = this.router.url;
    const newTitle = this.getTitleFromUrl(currentUrl);

    // Check if the title has changed
    if (this.title !== newTitle) {
      // Update the title and trigger the animation
      this.title = newTitle;
      this.animateTitle = true;

      // Set animateTitle back to false after the animation duration (200ms)
      setTimeout(() => {
        this.animateTitle = false;
      }, 200);
    }
  }

  getTitleFromUrl(url: string): string {
    switch (url) {
      case '/tickets/list':
        return 'Tickets';
      case '/dashboard':
        return 'Dashboard';
      case '/profil':
        return 'Profil';
      case '/users/list':
        return 'Contacts';
      default:
        return '';
    }
  }

  getAlertStatus(userRole: string) {
    this.alert = 'bi bi-bell';
    // TODO: Code pour récupérer le statut d'alerte en fonction du rôle de l'utilisateur
  }
}
