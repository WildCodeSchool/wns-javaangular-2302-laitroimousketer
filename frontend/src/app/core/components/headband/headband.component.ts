import { Component } from '@angular/core';

@Component({
  selector: 'app-headband',
  templateUrl: './headband.component.html',
  styleUrls: ['./headband.component.scss']
})
export class HeadbandComponent {
  logo: string = 'assets/images/Alayde.png';
  loupe: string = 'assets/images/loupe.png';
  alerte: string = 'assets/images/alerte.png';
  menuBurger: string = 'assets/images/burger.png';
  close: string = 'assets/images/croix.png';

  showSearch: boolean = false;
  showNotification: boolean = false;

  public isMenuOpen: boolean = false;

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  toggleNotification(): void {
    this.showNotification = !this.showNotification;
  }

  toggleBurger(): void {
    console.log('toggleBurger');
  }

}
