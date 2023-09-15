import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent {
  tickets: Ticket[] | undefined;
  role: string = this.authService.userRole;
  states: string[] = [
    'Date de création (ascendant)',
    'Date de création (descendant)',
    'Nom (A-Z)',
    'Nom (Z-A)',
    'Prénom(A-Z)',
    'Prénom(Z-A)',
    'Numéro de ticket',
    'Catégorie',
    'Statut',
  ];
  constructor(
    private ticketService: TicketService,
    private router: Router,
    private authService: AuthService
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
      console.log(data);
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
    document.getElementById('deleteModal' + ticketId)?.classList.remove('d-none');
    document.getElementById('deleteModal' + ticketId)?.classList.add('d-block');
  }
  closeDeleteModal(ticketId: any) {
    document.getElementById('deleteModal' + ticketId)?.classList.remove('d-block');
    document.getElementById('deleteModal' + ticketId)?.classList.add('d-none');
  }
}