import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as userAction from 'src/app/store/actions/user.action';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
import { takeUntil } from 'rxjs';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent extends UnsubcribeComponent  implements OnInit {
  @Input() user!: User;
  fullname: string = '';
  userConnected!: User;
  constructor(
    private store: Store<Reducer.StateDataStore>,
  ) {
    super();
   }

  ngOnInit() {
    this.loadUserConnected();
    this.fullname = this.user.firstname + ' ' + this.user.lastname || '';
  }
  loadUserConnected() {
    this.store.select(Reducer.getUserConnected)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        this.userConnected = user;
      });
  }
 
  openUserDetails() {
    this.store.dispatch(userAction.getUser({ payload: this.user.id, displayInSidebar: true }));
  }

}
