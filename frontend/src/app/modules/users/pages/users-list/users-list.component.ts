import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { User } from 'src/app/core/models/user.model';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class UsersListComponent implements OnInit {
users: User[] = [];  
user!: User
states: string[] = [
  'Mail (asc)',
  'Mail (desc)',
  'Nom (A-Z)',
  'Nom (Z-A)',
  'Prénom (A-Z)',
  'Prénom (Z-A)',
];

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
  openSidebar() {
    if (this.user)
    this.sharedService.toggleSidebar();
    this.sharedService.setCurrentContent('user-details');
    this.sharedService.setCurrentUser(this.user);
   
  }
  onUserClick(user: User) {
    this.sharedService.setCurrentUser(user);
    this.sharedService.setCurrentContent('user-details');
    this.sharedService.toggleSidebar();
  }
  // TRI //
 

  onSortChange(event: MatSelectChange) {
  
  }

}
