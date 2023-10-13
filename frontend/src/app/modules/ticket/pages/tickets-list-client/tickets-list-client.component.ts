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
  selector: 'app-tickets-list-client',
  templateUrl: './tickets-list-client.component.html',
  styleUrls: ['./tickets-list-client.component.scss'],
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
export class TicketListClientComponent implements OnInit {
  tickets: Ticket[] | undefined;
  ticketsClient: Ticket[] | undefined;
  originalTickets: Ticket[] | undefined;
  isUpdatingTickets: boolean = false;

  role: string = this.authService.userRole;
  userId: number = this.authService.userId;

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
    this.initializeStates();
    this.getTicketList();
    this.updateTicketList();
  }

  private initializeStates() {
    this.states = [
      'Date de création (asc)',
      'Date de création (desc)',
      'Numéro de ticket (asc)',
      'Numéro de ticket (desc)',
    ];
  }

  checkRole() {
    this.authService.getUserProfile();
    console.log(this.authService.userRole);
    return this.authService.userRole;
  }

  getTicketList() {
    this.ticketService.getTicketList().subscribe((data) => {
      // Filtrer les tickets pour l'utilisateur actuel
      this.tickets = data!.filter(ticket => ticket.authorId === this.userId);
      
      // Utiliser la liste filtrée comme base pour les futurs filtrages
      this.originalTickets = [...this.tickets];
      this.updateTicketList();
    });
  }

  private updateTicketList() {
    if (!this.originalTickets) {
      return;
    }
    
    // Copie des tickets originaux
    this.tickets = [...this.originalTickets];
    console.log('this.tickets before filter', this.tickets);
    this.applyFilters();
    console.log('this.tickets after filter', this.tickets);
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

  }
  applyFilters() {
    if (!this.originalTickets) {
      return;
    }
  
    console.log('Filters:', this.filters);
    console.log('Original Tickets before filter:', this.originalTickets);
  
    // Filtrez les tickets en fonction des états et priorités sélectionnés
    const filteredTickets = this.originalTickets.filter(ticket => {
      // Fonction de filtre pour le statut
      const statusFilter = (t: Ticket) => {
        return (
          (!this.filters.status.to_do || t.statusTitle === 'TO_DO') &&
          (!this.filters.status.doing || t.statusTitle === 'DOING') &&
          (!this.filters.status.done || t.statusTitle === 'DONE')
        );
      };
  
      // Fonction de filtre pour la priorité
      const priorityFilter = (t: Ticket) => {
        return (
          (!this.filters.priority.low || t.priorityTitle === 'LOW') &&
          (!this.filters.priority.medium || t.priorityTitle === 'MEDIUM') &&
          (!this.filters.priority.high || t.priorityTitle === 'HIGH')
        );
      };
  
      // Appliquer les filtres en fonction des filtres actifs
      const result = statusFilter(ticket) && priorityFilter(ticket) && ticket.authorId === this.userId;
  
      console.log('Result:', result);
  
      return result;
    });
  
    // Mettez à jour la liste des tickets
    this.tickets = filteredTickets;
  
    // Tri des tickets
    this.sortTickets(this.currentSortBy, this.tickets);
  
    console.log('Filtered Tickets:', this.tickets);
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
