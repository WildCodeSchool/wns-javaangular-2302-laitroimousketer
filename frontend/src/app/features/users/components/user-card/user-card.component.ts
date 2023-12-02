import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
@Input()user!: User;
fullname : string = '';
  constructor (
  private userService: UserService,
  private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.fullname = this.user.lastname + ' ' + this.user.firstname || '';
  }


    
  


}
