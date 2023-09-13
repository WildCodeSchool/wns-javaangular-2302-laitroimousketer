import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  events: string[] = [];
  private sidebarSubscription: Subscription | undefined;
  opened: boolean = false;
  isBurgerActive: boolean = false;

  constructor(private sharedService: SharedService) { }
  
  ngOnInit() {
    this.sidebarSubscription = this.sharedService.sidebarOpened$.subscribe(opened => {
      this.opened = opened;
      // Mettre à jour la valeur de isBurgerActive avant le changement de sidebarOpened
      this.isBurgerActive = this.opened;
    });
  }

  toggleBurger(): void {
    this.isBurgerActive = !this.isBurgerActive;
    setTimeout(() => {
      this.sharedService.toggleSidebar();
    }, 100);
  }
  
}
