import { Component, OnInit } from '@angular/core';
import { GlobalHistorical } from 'src/app/core/models/global-historical.model';
import { GlobalHistoricalService } from 'src/app/core/services/global-historical.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  globalHistoricals: GlobalHistorical [] = [];
  menuTitle: string = 'Activitées';
  menuIcon: string = 'bi bi-person-fill';
  constructor(
    private globalHistoricalService: GlobalHistoricalService,
  ) { }

  ngOnInit() {
    this.getHistoricals();
  }
  getHistoricals() {
    this.globalHistoricalService.getAll().subscribe((data: any) => {
      this.globalHistoricals = data;
      // sorting the historicals by id to get the last historicals first
      this.globalHistoricals.sort((a, b) => b.id - a.id);
      console.log(this.globalHistoricals);
    });
  }
  
}
