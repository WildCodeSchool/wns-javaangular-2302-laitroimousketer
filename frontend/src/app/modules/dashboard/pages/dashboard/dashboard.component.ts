import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, mergeMap, take } from 'rxjs';
import { TicketService } from 'src/app/modules/ticket/services/ticket.service';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
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

  chartIsUpdated: boolean = false;
  subscriptions = new Subscription();
  @ViewChild('priorityChart') priorityChart!: BaseChartDirective;
  @ViewChild('categoryChart') categoryChart!: BaseChartDirective;
  @ViewChild('statusChart') statusChart!: BaseChartDirective;
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.getCounts();
  }

ngAfterViewInit(): void {

  this.addHoverListener(this.priorityChart);
  this.addHoverListener(this.categoryChart);
  this.addHoverListener(this.statusChart);
}
addHoverListener(chart: BaseChartDirective | undefined): void {
  if (chart) {
    // Obtenez l'élément du graphique
    const chartElement = chart?.chart?.ctx.canvas;

    if (chartElement) { // Vérifiez si chartElement n'est pas null
      // Ajoutez un écouteur d'événements pour gérer le survol
      chartElement.addEventListener('mouseenter', (event) => {
        if (event.target instanceof HTMLElement) { // Assurez-vous que l'élément cible est une instance d'HTMLElement
          event.target.style.cursor = 'pointer';
          console.log('Légende du graphique survolé !');
          // Ajoutez ici le code pour afficher des informations ou effectuer d'autres actions
        }
      });
    }
  }
}


  dataPriority: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [this.lowCount], label: 'Priorités' },
    { data: [this.mediumCount], label: 'Priorités' },
    { data: [this.highCount], label: 'Priorités' }
  ];
  labelsPriority: string[] = ['mineure','moyenne','élevée'];

  dataStatus: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [this.toDoCount], label: 'Statuts' },
    { data: [this.doingCount], label: 'Statuts' },
    { data: [this.doneCount], label: 'Statuts' }
  ];
  labelsStatus: string[] = ['à faire','en cours','terminé'];

  dataCategory: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [this.technicalCount], label: 'Catégories' },
    { data: [this.featureCount], label: 'Catégories' },
    { data: [this.billingCount], label: 'Catégories' }
  ];
  labelsCategory: string[] = ['technique','fonctionnalité','facturation'];


  Options: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        "display": true,
        "position": "right",
        "align": "start"
      },
    },
    interaction: {
      // Overrides the global setting
      mode: 'dataset'
    }
  };


  getCounts(): void {
    const subscriptions = new Subscription();

    const toDoCount$ = this.ticketService.getCountTicketsByStatusToDo();
    const doingCount$ = this.ticketService.getCountTicketsByStatusDoing();
    const doneCount$ = this.ticketService.getCountTicketsByStatusDone();
    const lowCount$ = this.ticketService.getCountTicketsByPriorityLow();
    const mediumCount$ = this.ticketService.getCountTicketsByPriorityMedium();
    const highCount$ = this.ticketService.getCountTicketsByPriorityHigh();
    const billingCount$ = this.ticketService.getCountTicketsByCategoryBilling();
    const featureCount$ = this.ticketService.getCountTicketsByCategoryFeature();
    const technicalCount$ = this.ticketService.getCountTicketsByCategoryTechnical();

    subscriptions.add(
      toDoCount$.pipe(take(1)).subscribe(count => {
        this.toDoCount = count;
      })
    );

    subscriptions.add(
      doingCount$.pipe(take(1)).subscribe(count => {
        this.doingCount = count;
      })
    );

    subscriptions.add(
      doneCount$.pipe(take(1)).subscribe(count => {
        this.doneCount = count;
      })
    );

    subscriptions.add(
      lowCount$.pipe(take(1)).subscribe(count => {
        this.lowCount = count;
      })
    );

    subscriptions.add(
      mediumCount$.pipe(take(1)).subscribe(count => {
        this.mediumCount = count;
      })
    );

    subscriptions.add(
      highCount$.pipe(take(1)).subscribe(count => {
        this.highCount = count;
      })
    );

    subscriptions.add(
      billingCount$.pipe(take(1)).subscribe(count => {
        this.billingCount = count;
      })
    );

    subscriptions.add(
      featureCount$.pipe(take(1)).subscribe(count => {
        this.featureCount = count;
      })
    );

    subscriptions.add(
      technicalCount$.pipe(take(1)).subscribe(count => {
        this.technicalCount = count;
      })
    );

    // Une fois que toutes les valeurs sont récupérées, mettez à jour les tableaux
    subscriptions.add(
      toDoCount$.pipe(
        take(1),
        mergeMap(() => doingCount$),
        mergeMap(() => doneCount$),
        mergeMap(() => lowCount$),
        mergeMap(() => mediumCount$),
        mergeMap(() => highCount$),
        mergeMap(() => billingCount$),
        mergeMap(() => featureCount$),
        mergeMap(() => technicalCount$)
      ).subscribe(() => {
        this.updateAllChart(); // Mettez à jour tous les tableaux
      })
    );

    this.subscriptions.add(subscriptions);
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



