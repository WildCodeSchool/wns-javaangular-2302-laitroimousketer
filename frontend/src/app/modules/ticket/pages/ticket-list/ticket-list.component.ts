import { ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
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
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
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
export class TicketListComponent implements OnInit, DoCheck {
  tickets: Ticket[] | undefined;
  originalTickets: Ticket[] | undefined;
  isUpdatingTickets: boolean = false;
  role: string = this.authService.userRole;

  currentSortBy: string = '';
  states: string[] = [
    'Date de création (ascendant)',
    'Date de création (descendant)',
    'Numéro de ticket (ascendant)',
    'Numéro de ticket (descendant)',
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

  }
  ngDoCheck(): void {
    // Vérifiez que la mise à jour n'est pas déclenchée par la logique elle-même
    // if (!this.isUpdatingTickets && this.originalTickets?.length !== this.tickets?.length) {
    //   this.updateTicketList();
    // }
  }
  checkRole() {
    this.authService.getUserProfile();
    return this.authService.userRole;
  }

  getTicketList() {
    this.ticketService.getTicketList().subscribe((data) => {
      this.originalTickets = [...data]; // Copie des tickets originaux
      this.updateTicketList();
    });
  }


  deleteTicket(ticketId: any) {
    if (Number.isInteger(ticketId)) {
      this.ticketService.deleteTicket(ticketId).subscribe(() => this.getTicketList());
    } else {
      console.error('Invalid ticket id:', ticketId);
    }
  }


  // FILTERS //
  onCheckboxChange(group: string, filterName: string) {
    console.log(`${filterName}:`, this.filters[group as keyof TicketFilter][filterName]);

    for (const key in this.filters[group as keyof TicketFilter]) {
      if (key !== filterName) {
        // Désactiver les autres filtres dans le groupe
        this.filters[group as keyof TicketFilter][key] = false;
      }
    }
    this.applyFilters();
    this.updateTicketList();
  }


  private updateTicketList() {
    if (!this.originalTickets) {
      return;
    }
  
    this.tickets = [...this.originalTickets];
    this.applyFilters();
    this.sortTickets(this.currentSortBy, this.tickets); // Ajoutez le deuxième argument ici
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

    // console.log('Filters:', filters);

    this.ticketService.getTicketsByFilters(filters.join('&')).subscribe((tickets) => {
      // console.log('Returned data from server:', tickets);
      // console.log('Current client-side tickets:', this.tickets);

      this.isUpdatingTickets = true;
      const sortedTickets = [...tickets]; // Créez une copie triée
      this.sortTickets(this.currentSortBy, sortedTickets); // Triez la copie
      this.tickets = sortedTickets; // Affectez le tableau trié
      this.cdr.detectChanges();
      this.isUpdatingTickets = false;

      // console.log('Updated client-side tickets:', this.tickets);
    });
  }









  // TRI //
  private sortTickets(sortBy: string, tickets: Ticket[]) {
    if (!tickets) {
      return;
    }
    if (this.tickets) {
      switch (sortBy) {
        case 'Date de création (ascendant)':
          this.tickets.sort((a, b) => a.creationDate.localeCompare(b.creationDate));
          break;
        case 'Date de création (descendant)':
          this.tickets.sort((a, b) => b.creationDate.localeCompare(a.creationDate));
          break;
        case 'Numéro de ticket (ascendant)':
          this.tickets.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
          break;
        case 'Numéro de ticket (descendant)':
          this.tickets.sort((a, b) => b.id.toString().localeCompare(a.id.toString()));
          break;
        case 'Nom (A-Z)':
          this.tickets.sort((a, b) => this.compareNames(a, b, 'userLastName', 'userFirstName'));
          break;
        case 'Nom (Z-A)':
          this.tickets.sort((a, b) => this.compareNames(b, a, 'userLastName', 'userFirstName'));
          break;
        case 'Prénom (A-Z)':
          this.tickets.sort((a, b) => this.compareNames(a, b, 'userFirstName', 'userLastName'));
          break;
        case 'Prénom (Z-A)':
          this.tickets.sort((a, b) => this.compareNames(b, a, 'userFirstName', 'userLastName'));
          break;
        // Add more cases as needed
        default:
          break;
      }
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
