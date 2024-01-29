import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TicketService } from 'src/app/core/services/ticket.service';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Ticket } from 'src/app/core/models/ticket.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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

export class DashboardComponent implements OnInit {

  @ViewChild('priorityChart') priorityChart!: BaseChartDirective;
  @ViewChild('categoryChart') categoryChart!: BaseChartDirective;
  @ViewChild('statusChart') statusChart!: BaseChartDirective;
  tickets: Ticket[] = [];
  // COUNT TICKET //
  ticketsWithoutUser: number = 0;
  numberOfTickets: number = 0;
  billingCount: number = 0;
  featureCount: number = 0;
  technicalCount: number = 0;
  lowCount: number = 0;
  mediumCount: number = 0;
  highCount: number = 0;
  toDoCount: number = 0;
  doingCount: number = 0;
  doneCount: number = 0;

  chartIsUpdated: boolean = false;
  subscriptions = new Subscription();
  ticketsWithoutDev: Ticket[] = [];
  //chart
  dataPriority: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [this.lowCount] },
    { data: [this.mediumCount] },
    { data: [this.highCount] }
  ];
  labelsPriority: string[] = ['mineure', 'moyenne', 'élevée'];

  dataStatus: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [this.toDoCount] },
    { data: [this.doingCount] },
    { data: [this.doneCount] }
  ];
  labelsStatus: string[] = [`à faire`, 'en cours', 'terminé'];

  dataCategory: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [this.technicalCount] },
    { data: [this.featureCount] },
    { data: [this.billingCount] }
  ];
  labelsCategory: string[] = ['technique', 'fonctionnalité', 'facturation'];


  Options: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        "display": true,
        "position": "left",
        // "align": "center",
        
        labels: {
          color: 'white',
        }
        },
      },
  };
  ticketForm!: FormGroup;
  allDevelopers: User[] = [];
  filteredTickets!: Observable<string[] | [string, { name: string; code: string; }]>;
  constructor(
    private ticketService: TicketService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getAllTickets();
    this.loadDevelopers();
  }
  loadDevelopers() {
    this.userService.getUsersByRoleTitle('Développeur').subscribe((developers) => {
      this.allDevelopers = developers;
      // console.log('Developers:', this.allDevelopers);
    })
  }

  getAllTickets() {
    this.ticketService.getTickets().subscribe((data) => {
      // console.log(data, "data");
      this.tickets = data;
      this.ticketsWithoutDev = this.tickets.filter(ticket => !ticket.developers || ticket.developers.length === 0);
      this.ticketsWithoutUser = this.ticketsWithoutDev.length;
      this.processTicketData();
      this.updateAllChart();
    });
  }

  processTicketData() {
    this.numberOfTickets = this.tickets.length;
    this.billingCount = this.tickets.filter((ticket) => ticket.category?.categoryTitle === 'Facturation').length;
    this.featureCount = this.tickets.filter((ticket) => ticket.category?.categoryTitle === 'Fonctionnalité').length;
    this.technicalCount = this.tickets.filter((ticket) => ticket.category?.categoryTitle === 'Technique').length;

    this.lowCount = this.tickets.filter((ticket) => ticket.priority?.priorityTitle === 'Basse').length;
    this.mediumCount = this.tickets.filter((ticket) => ticket.priority?.priorityTitle === 'Moyenne').length;
    this.highCount = this.tickets.filter((ticket) => ticket.priority?.priorityTitle === 'Élevée').length;

    this.toDoCount = this.tickets.filter((ticket) => ticket.status?.statusTitle === 'À faire').length;
    this.doingCount = this.tickets.filter((ticket) => ticket.status?.statusTitle === 'En cours').length;
    this.doneCount = this.tickets.filter((ticket) => ticket.status?.statusTitle === 'Terminé').length;

    // Mettre à jour les labels avec le nombre de tickets
    this.labelsPriority = [
      `mineure (${this.lowCount})`,
      `moyenne (${this.mediumCount})`,
      `élevée (${this.highCount})`
    ];

    this.labelsStatus = [
      `à faire (${this.toDoCount})`,
      `en cours (${this.doingCount})`,
      `terminé (${this.doneCount})`
    ];

    this.labelsCategory = [
      `technique (${this.technicalCount})`,
      `fonctionnalité (${this.featureCount})`,
      `facturation (${this.billingCount})`
    ];
  }

  updateAllChart(): void {

    // Mettre à jour les données du graphique
    this.dataPriority[0].data = [this.lowCount, this.mediumCount, this.highCount];
    this.dataStatus[0].data = [this.toDoCount, this.doingCount, this.doneCount];
    this.dataCategory[0].data = [this.technicalCount, this.featureCount, this.billingCount];

    // s'assurer que le graphique est mis à jour pour l'affichage
    this.chartIsUpdated = true;
    // console.log("updateAllChart" , this.chartIsUpdated);
  }

}



