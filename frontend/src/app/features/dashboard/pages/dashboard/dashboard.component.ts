import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, mergeMap, take } from 'rxjs';
import { TicketService } from 'src/app/core/services/ticket.service';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Ticket } from 'src/app/features/ticket/models/ticket';
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

  //chart
  dataPriority: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [this.lowCount], label: 'Priorités' },
    { data: [this.mediumCount], label: 'Priorités' },
    { data: [this.highCount], label: 'Priorités' }
  ];
  labelsPriority: string[] = ['mineure', 'moyenne', 'élevée'];

  dataStatus: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [this.toDoCount], label: 'Statuts' },
    { data: [this.doingCount], label: 'Statuts' },
    { data: [this.doneCount], label: 'Statuts' }
  ];
  labelsStatus: string[] = ['à faire', 'en cours', 'terminé'];

  dataCategory: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [this.technicalCount], label: 'Catégories' },
    { data: [this.featureCount], label: 'Catégories' },
    { data: [this.billingCount], label: 'Catégories' }
  ];
  labelsCategory: string[] = ['technique', 'fonctionnalité', 'facturation'];


  Options: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        "display": true,
        "position": "left",
        "align": "start",
      },
    },
  };

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.getAllTickets();
  }

  getAllTickets() {
    this.ticketService.getTicketList().subscribe((data) => {
      // console.log(data, "data");
      this.tickets = data;
      this.processTicketData();
      this.updateAllChart();
    });
  }
  processTicketData() {
    this.numberOfTickets = this.tickets.length;
    this.ticketsWithoutUser = this.tickets.filter((ticket) => ticket.ticketHaveUsers.length === 0).length;
    this.billingCount = this.tickets.filter((ticket) => ticket.categoryTitle === 'BILLING').length;
    this.featureCount = this.tickets.filter((ticket) => ticket.categoryTitle === 'FEATURE').length;
    this.technicalCount = this.tickets.filter((ticket) => ticket.categoryTitle === 'TECHNICAL').length;

    this.lowCount = this.tickets.filter((ticket) => ticket.priorityTitle === 'LOW').length;
    this.mediumCount = this.tickets.filter((ticket) => ticket.priorityTitle === 'MEDIUM').length;
    this.highCount = this.tickets.filter((ticket) => ticket.priorityTitle === 'HIGH').length;

    this.toDoCount = this.tickets.filter((ticket) => ticket.statusTitle === 'TO_DO').length;
    this.doingCount = this.tickets.filter((ticket) => ticket.statusTitle === 'DOING').length;
    this.doneCount = this.tickets.filter((ticket) => ticket.statusTitle === 'DONE').length;
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



