import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { Observable, Subscription, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Ticket } from 'src/app/features/ticket/models/ticket';
import { Store } from '@ngrx/store';
import * as sidebarReducer from 'src/app/store/reducers/index';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { PanelSideBar } from 'src/app/store/models/sidebar';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends UnsubcribeComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  events: string[] = [];
  panel!: PanelSideBar;
  opened: boolean = false;
  ticket!: Ticket;

  constructor(
    private sidebarStore: Store<sidebarReducer.StateDataStore>,
    private sharedService: SharedService,
    private elementRef: ElementRef
  ) {
    super();
    this.sidebarStore.select(sidebarReducer.getPanelState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((panel: PanelSideBar) => {
        // Assurez-vous de créer une copie profonde de l'objet panel
        this.panel = { ...panel };
      });
  }
  

  ngOnInit() {
    
  }

  toggle(): void {
    this.sidebarStore.dispatch(sidebarAction.resetSideBar());
  }
  
}
