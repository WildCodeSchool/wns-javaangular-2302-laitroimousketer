import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 accueil: string = 'assets/images/accueil.png';
 tickets: string = 'assets/images/tickets.png';
 vue: string = 'assets/images/vue.png';
 profil: string = 'assets/images/profil.png';

}
