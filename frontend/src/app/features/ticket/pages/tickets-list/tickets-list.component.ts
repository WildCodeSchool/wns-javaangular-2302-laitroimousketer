import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';

import { AuthService } from 'src/app/core/services/auth.service';
import { MatSelectChange } from '@angular/material/select';
import { TicketHaveUsers } from '../../models/ticketHaveUsers';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject, Subscription, forkJoin, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as ticketAction from 'src/app/store/actions/ticket.action';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';

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
  category: {
    billing: boolean;
    feature: boolean;
    technical: boolean
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
export class TicketsListComponent extends UnsubcribeComponent implements OnInit {

  tickets!: Ticket[];
  ticketsClient: Ticket[] | undefined;
  originalTickets: Ticket[] | undefined;
  isUpdatingTickets: boolean = false;

  role: string = this.authService.userRole;

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

  showArchivedTickets : boolean = false;
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
    category: {
      billing: false,
      feature: false,
      technical: false,
    },
  };
  subscriptions = new Subscription();

ticketsFromStore: Ticket[] = [];

  constructor(
    private store: Store<Reducer.StateDataStore>,
    private ticketService: TicketService,
    private authService: AuthService,
  ) {
    super();
  }

  ngOnInit() {
    this.getCounts();
    this.checkRole();
    this.getTicketList();
    this.initializeStates();
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
    // console.log(this.authService.userRole);
    return this.authService.userRole;
  }

  getTicketList() {
    this.store.dispatch(ticketAction.getTickets());
    this.store.select(Reducer.selectAllTickets)
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
  onCheckboxChange(group: string, filterName: string) {
    // Inversez l'état du groupe de filtre sélectionné
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
    // Mettre à jour la liste des tickets
    this.updateTicketList();
  }


  // TRI //
  sortTickets(sortBy: string, tickets: Ticket[]) {
    if (!this.tickets) {
      return;
    }
    // console.log('sortBy', sortBy);
    switch (sortBy) {
      case 'Date de création (asc)':
        this.tickets.sort((a, b) => a.creationDate.localeCompare(b.creationDate));
        break;
      case 'Date de création (desc)':
        this.tickets.sort((a, b) => b.creationDate.localeCompare(a.creationDate));
        break;
      case 'Numéro de ticket (asc)':
        this.tickets.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
        break;
      case 'Numéro de ticket (desc)':
        this.tickets.sort((a, b) => b.id.toString().localeCompare(a.id.toString()));
        break;
      case 'Nom (A-Z)':
        this.tickets.sort((a, b) => a.authorFirstname.localeCompare(b.authorFirstname));
        break;
      case 'Nom (Z-A)':
        this.tickets.sort((a, b) => b.authorFirstname.localeCompare(a.authorFirstname));
        break;
      case 'Prénom (A-Z)':
        this.tickets.sort((a, b) => a.authorLastname.localeCompare(b.authorLastname));
        break;
      case 'Prénom (Z-A)':
        this.tickets.sort((a, b) => b.authorLastname.localeCompare(a.authorLastname));
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
  


  applyFilters() {
    const filters: string[] = [];

    for (const groupKey in this.filters) {
      if (this.filters.hasOwnProperty(groupKey) && groupKey !== 'filters') {
        for (const key in this.filters[groupKey]) {
          if (this.filters[groupKey].hasOwnProperty(key) && this.filters[groupKey][key]) {
            filters.push(`${groupKey}=${key.toUpperCase()}`);
            // console.log('filters', filters);
          }
        }
      }
    }

    // Appel au service pour construire la requête et retourner les tickets filtrés
    this.ticketService.getTicketsByFilters(filters.join('&')).subscribe((tickets) => {
    // Mettez à jour les tickets locaux avec les tickets filtrés
    if (!this.showArchivedTickets) {
      tickets = tickets.filter((ticket) => ticket.archiveDate === null);
    }
    this.tickets = tickets; // Affectez le tableau filtré
    this.sortTickets(this.currentSortBy, this.tickets);
    });
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }

  getCounts(): void {
    const subscriptions = new Subscription();
    const toDoCount$ = this.ticketService.getCountTicketsByStatusToDo().pipe(take(1));
    const doingCount$ = this.ticketService.getCountTicketsByStatusDoing().pipe(take(1));
    const doneCount$ = this.ticketService.getCountTicketsByStatusDone().pipe(take(1));
    const lowCount$ = this.ticketService.getCountTicketsByPriorityLow().pipe(take(1));
    const mediumCount$ = this.ticketService.getCountTicketsByPriorityMedium().pipe(take(1));
    const highCount$ = this.ticketService.getCountTicketsByPriorityHigh().pipe(take(1));
    const billingCount$ = this.ticketService.getCountTicketsByCategoryBilling().pipe(take(1));
    const featureCount$ = this.ticketService.getCountTicketsByCategoryFeature().pipe(take(1));
    const technicalCount$ = this.ticketService.getCountTicketsByCategoryTechnical().pipe(take(1));

    subscriptions.add(
      forkJoin({
        toDoCount: toDoCount$,
        doingCount: doingCount$,
        doneCount: doneCount$,
        lowCount: lowCount$,
        mediumCount: mediumCount$,
        highCount: highCount$,
        billingCount: billingCount$,
        featureCount: featureCount$,
        technicalCount: technicalCount$,
      }).subscribe({
        next: counts => {
          // Mettez à jour les variables après avoir obtenu toutes les valeurs
          this.toDoCount = counts.toDoCount;
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
