import { Component, Input, OnInit } from '@angular/core';
import { UserHistorical } from 'src/app/core/models/user-historical.model';
import { User } from 'src/app/core/models/user.model';
import { UserHistoricalService } from 'src/app/core/services/user-historical.service';

@Component({
  selector: 'app-user-historical',
  templateUrl: './user-historical.component.html',
  styleUrls: ['./user-historical.component.scss']
})
export class UserHistoricalComponent implements OnInit {
  @Input() user?: User;
 userHistoricals: UserHistorical [] = [];
  constructor(
    private userHistoricalService: UserHistoricalService,
  ) { }

  ngOnInit() {
    this.getuserHistorical();
  }
getuserHistorical() {
  this.userHistoricalService.getWithQuery(`userId=${this.user?.id}`).subscribe((userHistoricals: any) => {
    this.userHistoricals = userHistoricals;
    // console.log(userHistoricals);
  })
}
}
