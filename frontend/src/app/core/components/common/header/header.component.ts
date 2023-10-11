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
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Mettre à jour le titre en fonction de l'URL
        this.updateTitle();
      }
    });
  }
ngAfterViewInit() {
    this.updateTitle();
}
  updateTitle() {
    const currentUrl = this.router.url;
    // Logique pour déterminer le titre en fonction de l'URL
    this.title = this.getTitleFromUrl(currentUrl);
  }
  getTitleFromUrl(url: string): string {
    switch (url) {
      case '/tickets/list':
        return 'Tickets';
      case '/dashboard':
        return 'Dashboard';
      case '/profil':
        return 'Profil';
      default:
        return '';
    }
  }

  getAlertStatus(userRole: string) {
    // Utilise le UserService pour récupérer le statut d'alerte en fonction du rôle de l'utilisateur
    this.alert = 'bi bi-bell';
    // TODO: Code pour récupérer le statut d'alerte en fonction du rôle de l'utilisateur
  }
}
