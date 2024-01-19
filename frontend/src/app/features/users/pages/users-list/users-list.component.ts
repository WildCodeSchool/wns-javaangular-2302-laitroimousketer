import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { tileLayer, latLng, marker, icon, Layer, featureGroup, FeatureGroup, Map } from 'leaflet';

import { User } from 'src/app/core/models/user.model';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as userAction from 'src/app/store/actions/user.action';
import { takeUntil } from 'rxjs';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';


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
export class UsersListComponent extends UnsubcribeComponent implements OnInit { 
  map!: Map;
  zoom!: number;
  mapOptions  = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '',
      })
    ],
    zoom: 6,
    center: latLng(46.983930, 2.719502),

  };

  usersMarkers: FeatureGroup[] = [];
  users: User[] = [];
  user!: User;
  states: string[] = [
    'Nom (A-Z)',
    'Nom (Z-A)',
    'Prénom (A-Z)',
    'Prénom (Z-A)',
    'Mail (A-Z)',
    'Mail (Z-A)',
  ];
  currentSortBy: string = '';
  placeholderSearchbar: string = "Rechercher un utilisateur par son nom, prénom, mail...";

  constructor(
    private store: Store<Reducer.StateDataStore>,
    private sharedService: SharedService,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit() {
    this.loadUsers();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.attributionControl.setPrefix(false);
  }

  loadUsers(searchQuery?: { searchTerm: string }): void {
    if (searchQuery) {
      const query = searchQuery.searchTerm;
      this.userService.getWithQuery(`query=${query}`)
        .subscribe((users: User[]) => {
          this.users = users;
          this.usersMarkers = this.initializeMarkersData(this.users); // Populate markersData
          this.updateMapMarkers(); // Update map markers
        });
    } else {
    this.store.dispatch(userAction.getUsers());
    this.store.select(Reducer.getUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: User[]) => {
        if (data) {
          this.users = data;
          this.usersMarkers = this.initializeMarkersData(this.users); // Populate markersData
          this.updateMapMarkers(); // Update map markers
        }
      });
    }
  }
  updateMapMarkers() {
    this.usersMarkers = [featureGroup(this.users
      .map(user => {
        const m = marker([user.address?.latitude || 0, user.address?.longitude || 0], {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          })
        });
        m.bindPopup(user.lastname +' '+ user.firstname);
        m.on('click', () => {
          m.openPopup();  // Call openPopup on the marker
        });
        return m;
      }))
    ];
    if (!this.map && this.users.length === 0) {
      this.usersMarkers = [];
    }
  }
  


  initializeMarkersData(users: User[]): any[] {
    return users.map(user => {
      const latitude = user.address?.latitude; 
      const longitude = user.address?.longitude;
  
      return {
        latLng: latLng(latitude, longitude),
        title: user.firstname + ' ' + user.lastname,
        description: user.email
      };
    });
  }
  
  


  isEven(index: number): boolean {
    return index % 2 === 0;
  }

  // TRI //

  sortUsers(sortBy: string, users: User[]) {
    if (!this.users) {
      return;
    }
  
    // Create a copy of the users array
    const sortedUsers = [...this.users];
  
    switch (sortBy) {
      case 'Mail (A-Z)':
        sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'Mail (Z-A)':
        sortedUsers.sort((a, b) => b.email.localeCompare(a.email));
        break;
      case 'Nom (A-Z)':
        sortedUsers.sort((a, b) => a.firstname.localeCompare(b.firstname));
        break;
      case 'Nom (Z-A)':
        sortedUsers.sort((a, b) => b.firstname.localeCompare(a.firstname));
        break;
      case 'Prénom (A-Z)':
        sortedUsers.sort((a, b) => a.lastname.localeCompare(b.lastname));
        break;
      case 'Prénom (Z-A)':
        sortedUsers.sort((a, b) => b.lastname.localeCompare(a.lastname));
        break;
      // Add more cases as needed
      default:
        break;
    }
  
    // Update the users array with the sorted copy
    this.users = sortedUsers;
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
