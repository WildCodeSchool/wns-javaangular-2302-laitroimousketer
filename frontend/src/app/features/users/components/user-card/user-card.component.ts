import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as userAction from 'src/app/store/actions/user.action';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;
  fullname: string = ''
  ;
  constructor(
    private store: Store<Reducer.StateDataStore>,
  ) { }

  ngOnInit() {
    this.fullname = this.user.firstname + ' ' + this.user.lastname || '';
  }

  openUserDetails() {
    this.store.dispatch(userAction.getUser({ payload: this.user.id, displayInSidebar: true }));
  }

}
