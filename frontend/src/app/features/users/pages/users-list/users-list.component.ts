import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { latLng, tileLayer, Map } from 'leaflet';
import { MarkerData } from 'src/app/core/components/common/map/marker-data.model';
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
map!: Map;
zoom!: number;
mapOptions = {
  layers: [
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
  ],
  zoom: 5,
  center: latLng(48.864716, 2.349014)
};
markersData: MarkerData[] = [];

users: User[] = [];  
user!: User
states: string[] = [
  'Mail (A-Z)',
  'Mail (Z-A)',
  'Nom (A-Z)',
  'Nom (Z-A)',
  'Prénom (A-Z)',
  'Prénom (Z-A)',
];
currentSortBy: string = '';
placeholderSearchbar :string = "Rechercher un utilisateur par son nom, prénom, mail..."
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
      console.log('users',this.users);
      this.markersData = this.initializeMarkersData(users);
    });
  }
  initializeMarkersData(users: User[]): MarkerData[] {
    return users.map(user => {
      return {
        latLng: latLng(user.address!.latitude, user.address!.longitude),
        title: user.firstname + ' ' + user.lastname,
        description: user.email
      };
    });
  }
  isEven(index: number): boolean {
    return index % 2 === 0;
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
 
  sortUsers(sortBy: string, users: User[]) {
    if (!this.users) {
      return;
    }
    // console.log('sortBy', sortBy);
    switch (sortBy) {
      case 'Mail (A-Z)':
        this.users.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'Mail (Z-A)':
        this.users.sort((a, b) => b.email.localeCompare(a.email));
        break;
      case 'Nom (A-Z)':
        this.users.sort((a, b) => a.firstname.localeCompare(b.firstname));
        break;
      case 'Nom (Z-A)':
        this.users.sort((a, b) => b.firstname.localeCompare(a.firstname));
        break;
      case 'Prénom (A-Z)':
        this.users.sort((a, b) => a.lastname.localeCompare(b.lastname));
        break;
      case 'Prénom (Z-A)':
        this.users.sort((a, b) => b.lastname.localeCompare(a.lastname));
        break;
      // Add more cases as needed
      default:
        break;
    }
  }
  onSortChange(event: MatSelectChange) {
    this.currentSortBy = event.value;
    this.sortUsers(this.currentSortBy, this.users);
  }


  receiveMap(map: Map) {
    this.map = map;
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }
}
