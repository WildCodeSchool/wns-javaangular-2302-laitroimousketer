import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../../../../modules/ticket/models/ticket';
import { TicketDetails } from 'src/app/modules/ticket/models/ticket-details';
import { MenuItems } from '../sidebar-menu/menu-items.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RenamingService } from 'src/app/core/services/renaming.service';
import { TicketService } from 'src/app/modules/ticket/services/ticket.service';
import { AlertService } from 'src/app/core/services/alert.service';
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
  animations: [
    trigger('opacity', [
      transition('void => active', [
        style({ opacity: '0' }),
        animate('0.4s', style({ opacity: '1' }))
      ]),
      transition('* => void', [
        animate(40, style({ opacity: '0' }))
      ])
    ])
  ]
})
export class TicketDetailsComponent implements OnInit {
  @Input() ticket!: Ticket;

  ticketDetails: TicketDetails = {
    number: 0,
    name: '',
    userFirstName: '',
    userLastName: '',
    description: '',
    priority: '',
    creationDate: '',
    updateDate: '',
    archiveDate: '',
    status: '',
    authorId: 0,
    authorFirstname: '',
    authorLastname: '',
    authorEmail: '',
    developers: [] = [],
    fullnameAuthor: '',
    category: '',
  };

  menuItems: MenuItems[] = [
    { page: 'Info', icon: 'bi bi-info-square-fill' },
    { page: 'Chat', icon: 'bi bi-chat-left-dots-fill' },
    { page: 'Actions', icon: 'bi bi-pencil-square' }
  ];
  menuTitle: string = 'Ticket';
  menuIcon: string = 'bi bi-tag-fill';

  canClose: boolean = false;
  page: string = 'Info';
  statutSpan: string = '';
  prioritySpan: string = '';

  constructor(
    private ticketService: TicketService,
    private renamingService: RenamingService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.loadTicket();
    console.log('ticket details:', this.ticketDetails)
  }
  // pour le reset des

  onPageChange(page: string): void {
    this.page = page;
    // console.log('Page changed to:', this.page);
  }

  loadTicket() {
    if (this.ticket !== undefined && this.ticket !== null) {
      console.log('ticket details:', this.ticket);

      this.ticketDetails.number = this.ticket.id ? this.ticket.id : 0;
      this.ticketDetails.name = this.ticket.ticketTitle ? this.ticket.ticketTitle : '';
      this.ticketDetails.description = this.ticket.description ? this.ticket.description : '';
      this.ticketDetails.priority = this.ticket.priorityTitle ? this.ticket.priorityTitle : '';
      this.ticketDetails.category = this.ticket.categoryTitle ? this.ticket.categoryTitle : '';
      this.ticketDetails.creationDate = this.ticket.creationDate ? this.ticket.creationDate : '';
      this.ticketDetails.updateDate = this.ticket.updateDate ? this.ticket.updateDate : '';
      this.ticketDetails.archiveDate = this.ticket.archiveDate ? this.ticket.archiveDate : '';
      this.ticketDetails.status = this.ticket.statusTitle ? this.ticket.statusTitle : '';
      this.ticketDetails.authorId = this.ticket.authorId ? this.ticket.authorId : 0;
      this.ticketDetails.authorFirstname = this.ticket.authorFirstname ? this.ticket.authorFirstname : '';
      this.ticketDetails.authorLastname = this.ticket.authorLastname ? this.ticket.authorLastname : '';
      this.ticketDetails.fullnameAuthor = this.ticket.authorLastname + ' ' + this.ticket.authorFirstname || '';
      this.ticketDetails.authorEmail = this.ticket.authorEmail ? this.ticket.authorEmail : '';
      this.ticketDetails.developers = this.ticket.ticketHaveUsers ? this.ticket.ticketHaveUsers : [];
      this.checkStatus();
      this.checkPriority();
      this.rename();
    }
  }


  checkStatus() {
    if (this.ticketDetails.status === 'TO_DO') {
      this.statutSpan = 'todo';

    } if (this.ticketDetails.status === 'DOING') {
      this.statutSpan = 'done';
    }
    if (this.ticketDetails.status === 'DONE') {
      this.statutSpan = 'done';
      this.canClose = true;
    }
  }

  checkPriority() {
    if (this.ticketDetails.priority === 'LOW') {
      this.prioritySpan = 'low';
    }
    if (this.ticketDetails.priority === 'MEDIUM') {
      this.prioritySpan = 'medium';
    }
    if (this.ticketDetails.priority === 'HIGH') {
      this.prioritySpan = 'high';
    }
  }
  rename() {
    this.ticketDetails.category = this.renamingService.renameCategory(this.ticketDetails.category);
    this.ticketDetails.status = this.renamingService.renameStatus(this.ticketDetails.status);
    this.ticketDetails.priority = this.renamingService.renamePriority(this.ticketDetails.priority);
  }

  archiveTicket(ticketId: number): void {
    if (this.ticketDetails.archiveDate === '') {
      this.ticketService.archiveTicket(ticketId)
        .subscribe(response => {
          if (response.status === 200) {
            this.alertService.showSuccessAlert('Ticket archivé avec succès');
            this.ticketService.getTicket(this.ticket.id).subscribe((ticketData) => {
              this.ticket = ticketData;
              this.loadTicket();
            });
            // Faire quelque chose ici, par exemple, mettre à jour la liste des tickets archivés
          } else {
            this.alertService.showErrorAlert("Erreur lors de l'archivage du ticket");
            // Gérer l'erreur ici, par exemple, afficher un message d'erreur à l'utilisateur
          }
        });
    } else {
      this.alertService.showErrorAlert("Le ticket est déjà archivé");
    }
  }

  unarchiveTicket(ticketId: number): void {
    if (this.ticketDetails.archiveDate !== '') {
      this.ticketService.unarchiveTicket(ticketId)
        .subscribe(response => {
          if (response.status === 200) {
            this.ticketService.getTicket(this.ticket.id).subscribe((ticketData) => {
              this.ticket = ticketData;
              this.loadTicket();
            });
            this.alertService.showSuccessAlert('Ticket désarchivé avec succès');
            // Faire quelque chose ici, par exemple, mettre à jour la liste des tickets archivés
          } else {
            this.alertService.showErrorAlert("Erreur lors du désarchivage du ticket");
            // Gérer l'erreur ici, par exemple, afficher un message d'erreur à l'utilisateur
          }
        });
    } else {
      this.alertService.showErrorAlert("Le ticket n'est pas archivé");
    }
  }

  closeTicket() {
    if (this.ticketDetails.status === 'En cours') {
      let updatedTicket: Ticket = this.ticket;
      updatedTicket.statusId = 96;
  
      this.ticketService.updateAndFetchTicket(this.ticket.id, updatedTicket).subscribe(
        (updatedTicket) => {
          this.ticket = updatedTicket;
          console.log('ticket updated:', this.ticket);
          this.loadTicket();
          this.alertService.showSuccessAlert('Ticket fermé avec succès');
        },
        (error) => {
          this.alertService.showErrorAlert("Erreur lors de la clôture du ticket");
        }
      );
    } else {
      this.alertService.showErrorAlert("Le ticket n'a pas été encore traité");
    }
  }
  
  reopenTicket() {
    if (this.ticketDetails.status === 'Terminé') {
      let updatedTicket: Ticket = this.ticket;
      updatedTicket.statusId = 94;
  
      this.ticketService.updateAndFetchTicket(this.ticket.id, updatedTicket).subscribe(
        (updatedTicket) => {
          this.ticket = updatedTicket;
          this.loadTicket();
          this.alertService.showSuccessAlert('Ticket réouvert avec succès');
        },
        (error) => {
          this.alertService.showErrorAlert("Erreur lors de la tentative de réouverture du ticket");
        }
      );
    }
  }
  

}
