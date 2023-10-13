import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSelectChange } from '@angular/material/select';
import { TicketHaveUsers } from '../../models/ticketHaveUsers';
import { animate, style, transition, trigger } from '@angular/animations';

interface TicketFilter {
  status: {
    to_do: boolean;
    doing: boolean;
    done: boolean;
  };
  priority: {
    low: boolean;
    medium: boolean;
    high: boolean;
  };
  [key: string]: any; // Ajout de la signature d'index
}



interface SortOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
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
export class TicketsListComponent implements OnInit {
  tickets: Ticket[] | undefined;
  ticketsClient: Ticket[] | undefined;
  originalTickets: Ticket[] | undefined;
  isUpdatingTickets: boolean = false;

  role: string = this.authService.userRole;
 

  currentSortBy: string = '';
  states: string[] = [
    'Date de création (asc)',
    'Date de création (desc)',
    'Numéro de ticket (asc)',
    'Numéro de ticket (desc)',
    'Nom (A-Z)',
    'Nom (Z-A)',
    'Prénom (A-Z)',
    'Prénom (Z-A)',
  ];
  filters: TicketFilter = {
    status: {
      to_do: false,
      doing: false,
      done: false,
    },
    priority: {
      low: false,
      medium: false,
      high: false,
    },
  };


  constructor(
    private ticketService: TicketService,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.checkRole();
    this.getTicketList();
    this.initializeStates();
    this.updateTicketList();
  }

  private initializeStates() {
      this.states = [
        'Date de création (asc)',
        'Date de création (desc)',
        'Numéro de ticket (asc)',
        'Numéro de ticket (desc)',
        'Nom (A-Z)',
        'Nom (Z-A)',
        'Prénom (A-Z)',
        'Prénom (Z-A)',
      ];
  }

  checkRole() {
    this.authService.getUserProfile();
    console.log(this.authService.userRole);
    return this.authService.userRole;
  }

  getTicketList() {
    this.ticketService.getTicketList().subscribe((data) => {
      this.originalTickets = [...data]; // Copie des tickets originaux
      this.updateTicketList();
    });
  }

  private updateTicketList() {
    if (!this.originalTickets) {
      return;
    }
    this.tickets = [...this.originalTickets];
    this.applyFilters();
    this.sortTickets(this.currentSortBy, this.tickets);
}

  // FILTERS //
  onCheckboxChange(group: string, filterName: string) {
    // Inversez l'état du filtre sélectionné
    this.filters[group as keyof TicketFilter][filterName] = !this.filters[group as keyof TicketFilter][filterName];
  
    // Si le filtre est activé, désactivez tous les autres filtres dans le groupe
    if (this.filters[group as keyof TicketFilter][filterName]) {
      for (const key in this.filters[group as keyof TicketFilter]) {
        if (key !== filterName) {
          this.filters[group as keyof TicketFilter][key] = false;
        }
      }
    }
  
    // Appliquer les filtres
    this.applyFilters();
    this.updateTicketList();
  }
  
  
  
  

  applyFilters() {
    const filters: string[] = [];
  
    for (const groupKey in this.filters) {
      if (this.filters.hasOwnProperty(groupKey) && groupKey !== 'filters') {
        for (const key in this.filters[groupKey]) {
          if (this.filters[groupKey].hasOwnProperty(key) && this.filters[groupKey][key]) {
            filters.push(`${groupKey}=${key.toUpperCase()}`);
          }
        }
      }
    }
  
    // Appel au service pour construire la requête et retourner les tickets filtrés
    this.ticketService.getTicketsByFilters(filters.join('&')).subscribe((tickets) => {
      // Mettez à jour les tickets locaux avec les tickets filtrés
      this.isUpdatingTickets = true;
      const sortedTickets = [...tickets]; // Créez une copie triée
      this.sortTickets(this.currentSortBy, sortedTickets); // Triez la copie
      this.tickets = sortedTickets; // Affectez le tableau trié
      this.cdr.detectChanges();
      this.isUpdatingTickets = false;
    });
  }
  

  // TRI //
  private sortTickets(sortBy: string, tickets: Ticket[]) {
    if (!tickets) {
      return;
    }
    switch (sortBy) {
      case 'Date de création (ascendant)':
        tickets.sort((a, b) => a.creationDate.localeCompare(b.creationDate));
        break;
      case 'Date de création (descendant)':
        tickets.sort((a, b) => b.creationDate.localeCompare(a.creationDate));
        break;
      case 'Numéro de ticket (ascendant)':
        tickets.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
        break;
      case 'Numéro de ticket (descendant)':
        tickets.sort((a, b) => b.id.toString().localeCompare(a.id.toString()));
        break;
      case 'Nom (A-Z)':
        tickets.sort((a, b) => this.compareNames(a, b, 'userLastName', 'userFirstName'));
        break;
      case 'Nom (Z-A)':
        tickets.sort((a, b) => this.compareNames(b, a, 'userLastName', 'userFirstName'));
        break;
      case 'Prénom (A-Z)':
        tickets.sort((a, b) => this.compareNames(a, b, 'userFirstName', 'userLastName'));
        break;
      case 'Prénom (Z-A)':
        tickets.sort((a, b) => this.compareNames(b, a, 'userFirstName', 'userLastName'));
        break;
      // Add more cases as needed
      default:
        break;
    }
  }

  onSortChange(event: MatSelectChange) {
    this.currentSortBy = event.value;
    this.updateTicketList();
  }

  private compareNames(a: Ticket, b: Ticket, key1: keyof TicketHaveUsers, key2: keyof TicketHaveUsers): number {
    const nameA = `${a.ticketHaveUsers?.[0]?.[key1]} ${a.ticketHaveUsers?.[0]?.[key2]}`;
    const nameB = `${b.ticketHaveUsers?.[0]?.[key1]} ${b.ticketHaveUsers?.[0]?.[key2]}`;
    return nameA.localeCompare(nameB);
  }
}
