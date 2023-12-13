import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../sidebar-menu/menu-items.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  menuItems: MenuItems[] = [
    { page: 'Info', icon: 'bi bi-info-square-fill' },
    { page: 'Chat', icon: 'bi bi-chat-left-dots-fill' },
    { page: 'Actions', icon: 'bi bi-pencil-square' }
  ];
  page: string = 'Info';
  menuTitle: string = 'Utilisateur';
  menuIcon: string = 'bi bi-person-fill';
  constructor() { }

  ngOnInit() {
  }
  onPageChange(page: string): void {
    this.page = page;
    // console.log('Page changed to:', this.page);
  }
}
