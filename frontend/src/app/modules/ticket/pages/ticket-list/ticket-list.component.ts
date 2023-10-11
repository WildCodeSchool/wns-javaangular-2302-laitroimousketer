import { ChangeDetectorRef, Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSelectChange } from '@angular/material/select';
import { UserHasTickets } from '../../models/userHasTickets';

interface TicketFilter {
  todo: boolean;
  doing: boolean;
  finish: boolean;
  low: boolean;
  medium: boolean;
  high: boolean;
}

interface SortOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent {
  tickets: Ticket[] | undefined;
  originalTickets: Ticket[] | undefined;
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
    todo: false,
    doing: false,
    finish: false,
    low: false,
    medium: false,
    high: false,
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

  checkRole() {
    this.authService.getUserProfile();
    return this.authService.userRole;
  }

  getTicketList() {
    this.ticketService.getTicketList().subscribe((data) => {
      this.originalTickets = data;
      this.updateTicketList();
      this.cdr.detectChanges();
    });
  }

  deleteTicket(ticketId: any) {
    if (Number.isInteger(ticketId)) {
      this.ticketService.deleteTicket(ticketId).subscribe(() => this.getTicketList());
    } else {
      console.error('Invalid ticket id:', ticketId);
    }
  }

  onSortChange(event: MatSelectChange) {
    this.currentSortBy = event.value;
    this.updateTicketList();
  }

  onCheckboxChange(filterName: string) {
    // Logique de gestion des filtres du changement de la checkbox
    console.log(`${filterName}:`, this.filters[filterName as keyof TicketFilter]);
    this.updateTicketList();
  }

  private updateTicketList() {
    if (!this.originalTickets) {
      return;
    }

    this.tickets = [...this.originalTickets];
    this.sortTickets(this.currentSortBy);
    this.applyFilters();
  }


  private applyFilters() {
    if (!this.tickets) {
      return;
    }

    const isFilterApplied =
      this.applyStatusFilter() ||
      this.applyPriorityFilter();

    if (isFilterApplied) {
      console.log('Au moins un filtre est appliqué.');
    }
  }

  private applyStatusFilter(): boolean {
    if (this.tickets && (this.filters.todo || this.filters.doing || this.filters.finish)) {
      this.tickets = (this.tickets || []).filter(ticket => {
        if (this.filters.todo && ticket.statusTitle === 'TO_DO') {
          return true;
        }
        if (this.filters.doing && ticket.statusTitle === 'DOING') {
          return true;
        }
        return this.filters.finish && ticket.statusTitle === 'DONE';
      });
      return true;
    }
    return false;
  }

  private applyPriorityFilter(): boolean {
    if (this.tickets && (this.filters.low || this.filters.medium || this.filters.high)) {
      this.tickets = (this.tickets || []).filter(ticket => {
        if (this.filters.low && ticket.priorityTitle === 'LOW') {
          return true;
        }
        if (this.filters.medium && ticket.priorityTitle === 'MEDIUM') {
          return true;
        }
        return this.filters.high && ticket.priorityTitle === 'HIGH';
      });
      return true;
    }
    return false;
  }

  private sortTickets(sortBy: string) {
    if (!this.tickets) {
      return;
    }

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

  private compareNames(a: Ticket, b: Ticket, key1: keyof UserHasTickets, key2: keyof UserHasTickets): number {
    const nameA = `${a.userHasTickets?.[0]?.[key1]} ${a.userHasTickets?.[0]?.[key2]}`;
    const nameB = `${b.userHasTickets?.[0]?.[key1]} ${b.userHasTickets?.[0]?.[key2]}`;
    return nameA.localeCompare(nameB);
  }
}
