import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;
  fullname: string = '';
  constructor(

  ) { }

  ngOnInit() {
    this.fullname = this.user.lastname + ' ' + this.user.firstname || '';
  }




}
