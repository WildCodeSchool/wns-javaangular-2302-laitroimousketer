import { ChangeDetectorRef, Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent {
  tickets: Ticket[] | undefined;
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
//checkbox
doing = false;
todo = false;
finish = false;
low = false;
medium = false;
high = false;
labelPosition: 'before' | 'after' = 'after';
disabled = false;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

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
      this.tickets = data;
      // console.log(data);
      this.sortTickets(this.currentSortBy);
      this.cdr.detectChanges();
    });
  }

  deleteTicket(ticketId: any) {
    if (Number.isInteger(ticketId)) {
      this.ticketService.deleteTicket(ticketId).subscribe((data) => {
        this.getTicketList();
      });
    } else {
      console.error('Invalid ticket id:', ticketId);
    }
  }

  openDeleteModal(ticketId: any) {
    document
      .getElementById('deleteModal' + ticketId)
      ?.classList.remove('d-none');
    document.getElementById('deleteModal' + ticketId)?.classList.add('d-block');
  }

  closeDeleteModal(ticketId: any) {
    document
      .getElementById('deleteModal' + ticketId)
      ?.classList.remove('d-block');
    document.getElementById('deleteModal' + ticketId)?.classList.add('d-none');
  }
  onSortChange(event: MatSelectChange) {
    this.currentSortBy = event.value; // Mettre à jour le critère de tri actuel
    console.log(this.currentSortBy,'onsortchanges');
    this.sortTickets(this.currentSortBy);
  }
  sortTickets(sortBy: string) {
    switch (sortBy) {
      case 'Date de création (ascendant)':
        this.tickets?.sort((a, b) => a.creationDate.localeCompare(b.creationDate));
        break;
      case 'Date de création (descendant)':
        this.tickets?.sort((a, b) => b.creationDate.localeCompare(a.creationDate));
        break;
      case 'Numéro de ticket (ascendant)':
        this.tickets?.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
        break;
        case 'Numéro de ticket (descendant)':
        this.tickets?.sort((a, b) => b.id.toString().localeCompare(a.id.toString()));
        break;
        case 'Statut':
          this.tickets?.sort((a, b) => +a.status - +b.status);
          break;
        case 'Catégorie':
          this.tickets?.sort((a, b) => +a.category - +b.category);
          break;
          case 'Nom (A-Z)':
            this.tickets?.sort((a, b) => {
              const nameA = a.userHasTickets[0].userLastName + ' ' + a.userHasTickets[0].userFirstName;
              const nameB = b.userHasTickets[0].userLastName + ' ' + b.userHasTickets[0].userFirstName;
              return nameA.localeCompare(nameB);
            });
            break;
      
          case 'Nom (Z-A)':
            this.tickets?.sort((a, b) => {
              const nameA = a.userHasTickets[0].userLastName + ' ' + a.userHasTickets[0].userFirstName;
              const nameB = b.userHasTickets[0].userLastName + ' ' + b.userHasTickets[0].userFirstName;
              return nameB.localeCompare(nameA);
            });
            break;
      
          case 'Prénom (A-Z)':
            this.tickets?.sort((a, b) => {
              const nameA = a.userHasTickets[0].userFirstName + ' ' + a.userHasTickets[0].userLastName;
              const nameB = b.userHasTickets[0].userFirstName + ' ' + b.userHasTickets[0].userLastName;
              return nameA.localeCompare(nameB);
            });
            break;
      
          case 'Prénom (Z-A)':
            this.tickets?.sort((a, b) => {
              const nameA = a.userHasTickets[0].userFirstName + ' ' + a.userHasTickets[0].userLastName;
              const nameB = b.userHasTickets[0].userFirstName + ' ' + b.userHasTickets[0].userLastName;
              return nameB.localeCompare(nameA);
            });
            break;
      // Add more cases as needed
      default:
        break;
    }
  }
  

}
