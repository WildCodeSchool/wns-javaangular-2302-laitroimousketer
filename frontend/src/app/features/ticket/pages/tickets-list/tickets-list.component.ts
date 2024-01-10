import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../../core/services/ticket.service';
import { Ticket } from '../../../../core/models/ticket';

import { AuthService } from 'src/app/core/services/auth.service';
import { MatSelectChange } from '@angular/material/select';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription, forkJoin, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as ticketAction from 'src/app/store/actions/ticket.action';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { Role } from 'src/app/core/models/role.model';
import { MediaService } from 'src/app/core/services/media.service';
import { FormBuilder, FormGroup } from '@angular/forms';



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

export class TicketsListComponent extends UnsubcribeComponent implements OnInit {
  tickets!: Ticket[];
  ticketsClient: Ticket[] | undefined;
  originalTickets: Ticket[] | undefined;
  isUpdatingTickets: boolean = false;

  role?: Role;

  // COUNT TICKET //
  billingCount: number = 0;
  featureCount: number = 0;
  technicalCount: number = 0;
  lowCount: number = 0;
  mediumCount: number = 0;
  highCount: number = 0;
  toDoCount: number = 0;
  doingCount: number = 0;
  doneCount: number = 0;

  showArchivedTickets: boolean = false;
  currentSortBy: string = '';

  firstNameDown: boolean;
  numeroDown: boolean;
  titleDown: boolean;
  categoryDown: boolean;
  statusDown: boolean;
  priorityDown: boolean;
  dateDown: boolean;
  filters: any = {
    status: { 'À faire': false, 'En cours': false, 'Terminé': false },
    priority: { 'Basse': false, 'Moyenne': false, 'Élevée': false },
    category: { 'Facturation': false, 'Fonctionnalité': false, 'Technique': false },
  };

  subscriptions = new Subscription();

  constructor(
    private store: Store<Reducer.StateDataStore>,
    private ticketService: TicketService,
    private authService: AuthService,
    private mediaService: MediaService,
    private formBuilder: FormBuilder,
  ) {
    super();
    this.dateDown = false;
    this.numeroDown = false;
    this.titleDown = false;
    this.firstNameDown = false;
    this.categoryDown = false;
    this.statusDown = false;
    this.priorityDown = false;
  }



  
  ngOnInit() {
   
  
    this.getCounts();
    this.checkRole();
    this.getTicketList();
  }


  checkRole() {
    this.authService.getUserProfile().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.role = data.role;
      // console.log('role', this.role);
    });
  }

  getTicketList() {
    this.store.dispatch(ticketAction.getTickets());
    this.store.select(Reducer.getTickets)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Ticket[]) => {
        if (data) {
          // Effectuez vos opérations une fois que les tickets sont disponibles
          this.originalTickets = [...data]; // Copie des tickets originaux
          this.tickets = [...this.originalTickets]; // initialisation des tickets
          this.updateTicketList();
          // Autres opérations ici...
        }
      });
  }

  private updateTicketList() {
    if (!this.originalTickets) {
      return;
    }
    this.tickets = [...this.originalTickets];
    this.applyFilters();
    // this.sortTickets(this.currentSortBy, this.tickets);
  }

  // FILTERS //
  onCheckboxChange(group: string, value: string) {
    // Désactiver les autres checkboxes dans le groupe
    for (const key in this.filters[group]) {
      if (key !== value) {
        this.filters[group][key] = false;
      }
    }
    // Activer ou désactiver la checkbox sélectionnée
    this.filters[group][value] = !this.filters[group][value];

    this.applyFilters();
    this.updateTicketList();
  }


  applyFilters() {

    const queryStringParams: string[] = [];

    // Build the query string parameters
    for (const key in this.filters) {
      const values = Object.keys(this.filters[key]).filter(subKey => this.filters[key][subKey]);

      if (values.length > 0) {
        // Cumulez les valeurs dans la requête
        const joinedValues = values.map(val => encodeURIComponent(val)).join(',');
        queryStringParams.push(`${key}=${joinedValues}`);
      }
    }

    const queryString = queryStringParams.join('&');
    // console.log('queryString', queryString);  
    // Appel au service pour construire la requête et retourner les tickets filtrés
    this.ticketService.getTicketsByFilters(queryString).subscribe((tickets) => {
      // Mettez à jour les tickets locaux avec les tickets filtrés
      if (!this.showArchivedTickets) {
        tickets = tickets.filter((ticket) => ticket.archiveDate === null);
      }
      this.tickets = tickets; // Affectez le tableau filtré
      if (this.role?.roleTitle === 'Client') {
        this.tickets = this.tickets.filter((ticket) => ticket.author?.id === this.authService.userConnected.id);
      }
      // this.sortTickets(this.currentSortBy); // Tri des tickets
    });
  }



  // TRI //
  sortTickets(sortBy: string) {
    // Toggle sorting order
    switch (sortBy) {
      case 'Date de création':
        this.dateDown = this.currentSortBy === 'Date de création' ? !this.dateDown : true;
        this.currentSortBy = 'Date de création';
        this.tickets.sort(this.sortByDate.bind(this)); // Bind the context to the sorting functions
        break;
      case 'Numéro':
        this.numeroDown = this.currentSortBy === 'Numéro' ? !this.numeroDown : true;
        this.currentSortBy = 'Numéro';
        this.tickets.sort(this.sortByNumero.bind(this));
        break;
      case 'Titre':
        this.titleDown = this.currentSortBy === 'Titre' ? !this.titleDown : true;
        this.currentSortBy = 'Titre';
        this.tickets.sort(this.sortByTitle.bind(this));
        break;
      case 'Prénom':
        this.firstNameDown = this.currentSortBy === 'Prénom' ? !this.firstNameDown : true;
        this.currentSortBy = 'Prénom';
        this.tickets.sort(this.sortByFirstname.bind(this));
        break;
      case 'Date':
        this.dateDown = this.currentSortBy === 'Date' ? !this.dateDown : true;
        this.currentSortBy = 'Date';
        this.tickets.sort(this.sortByDate.bind(this));
        break;
      default:
        break;
    }
  }


  sortByTitle(a: Ticket, b: Ticket): number {
    console.log('Sorting by title:');
    return this.titleDown ? a.ticketTitle.localeCompare(b.ticketTitle) : b.ticketTitle.localeCompare(a.ticketTitle);
  }
  sortByNumero(a: Ticket, b: Ticket): number {
    const idA = Number(a.id);
    const idB = Number(b.id);
    return this.numeroDown ? idA - idB : idB - idA;
  }
  
  sortByFirstname(a: Ticket, b: Ticket): number {
    return this.firstNameDown ? a.author!.firstname.localeCompare(b.author!.firstname) : b.author!.firstname.localeCompare(a.author!.firstname);
  }

  sortByDate(a: Ticket, b: Ticket): number {
    return this.dateDown ? a.creationDate.localeCompare(b.creationDate) : b.creationDate.localeCompare(a.creationDate);
  }


  isEven(index: number): boolean {
    return index % 2 === 0;
  }

  getCounts(): void {
    const subscriptions = new Subscription();

    subscriptions.add(
      forkJoin({
        toDoCount: this.ticketService.getTicketCountByFilters('status=À faire&count=true').pipe(take(1)),
        doingCount: this.ticketService.getTicketCountByFilters('status=En cours&count=true').pipe(take(1)),
        doneCount: this.ticketService.getTicketCountByFilters('status=Terminé&count=true').pipe(take(1)),
        lowCount: this.ticketService.getTicketCountByFilters('priority=Basse&count=true').pipe(take(1)),
        mediumCount: this.ticketService.getTicketCountByFilters('priority=Moyenne&count=true').pipe(take(1)),
        highCount: this.ticketService.getTicketCountByFilters('priority=Élevée&count=true').pipe(take(1)),
        billingCount: this.ticketService.getTicketCountByFilters('category=Facturation&count=true').pipe(take(1)),
        featureCount: this.ticketService.getTicketCountByFilters('category=Fonctionnalité&count=true').pipe(take(1)),
        technicalCount: this.ticketService.getTicketCountByFilters('category=Technique&count=true').pipe(take(1)),
      }).subscribe({
        next: counts => {
          this.toDoCount = counts.toDoCount; // Mettez à jour les variables avec les compteurs
          this.doingCount = counts.doingCount;
          this.doneCount = counts.doneCount;
          this.lowCount = counts.lowCount;
          this.mediumCount = counts.mediumCount;
          this.highCount = counts.highCount;
          this.billingCount = counts.billingCount;
          this.featureCount = counts.featureCount;
          this.technicalCount = counts.technicalCount;
        },
        error: error => {
          // Gérez les erreurs ici
          console.error('Error getting counts:', error);
        },
        complete: () => {
          // Effectuez des actions après que l'observable est complète
          // Libérez les ressources ici si nécessaire
        },
      })
    );
    this.subscriptions.add(subscriptions);
  }

  ViewArchivedTickets() {
    this.showArchivedTickets = !this.showArchivedTickets;
    this.updateTicketList(); // Mettez à jour la liste des tickets en fonction de la nouvelle valeur
  }

}
