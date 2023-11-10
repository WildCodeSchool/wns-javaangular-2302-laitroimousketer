import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Ticket } from 'src/app/modules/ticket/models/ticket';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  reason = '';
  events: string[] = [];
  private sidebarSubscription!: Subscription;
  private ticketSubscription!: Subscription;
  opened: boolean = false;
  mode = new FormControl('over');
  currentPage$: string = '';
  currentTicket$: Observable<Ticket>;
  ticket!: Ticket;

  constructor(
    private sharedService: SharedService,
    private elementRef: ElementRef
  ) {
    this.currentTicket$ = sharedService.currentTicket$;
  }

  ngOnInit() {
    this.sidebarSubscription = this.sharedService.sidebarOpened$.subscribe((opened) => {
      this.opened = opened;
      if (!opened) {
        // Réinitialiser le contenu lorsque la sidebar est fermée
        this.currentPage$ = '';
        // Désabonnement de currentTicket$ lorsque la sidebar est fermée
        if (this.ticketSubscription) {
          this.ticketSubscription.unsubscribe();
        }
      } else {
        // Sidebar est en train de s'ouvrir, abonnez-vous à currentContent$
        this.sharedService.currentContent$.subscribe((content) => {
          this.currentPage$ = content;
          // Abonnement à currentTicket$ lorsque la sidebar s'ouvre
          if (this.currentTicket$ && this.currentPage$ === 'ticket-details') {
            this.ticketSubscription = this.currentTicket$.subscribe((ticketData) => {
              this.ticket = ticketData;
            });
          }
        });
      }
    });
  }


  ngOnDestroy() {
    // Assurez-vous de vous désabonner de toutes les subscriptions à la destruction du composant
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
    if (this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  toggle(): void {
    this.sharedService.toggleSidebar();
    if (this.opened) {
      // Sidebar est en train de se fermer, désabonnement à currentContent$
      if (this.sidebarSubscription) {
        this.sidebarSubscription.unsubscribe();
      }
      // Désabonnement de currentTicket$ lorsque la sidebar est fermée
      if (this.ticketSubscription) {
        this.ticketSubscription.unsubscribe();
      }
      // Autres opérations lors de la fermeture de la sidebar
    } else {
      // Sidebar est en train de s'ouvrir, abonnement à sidebarOpened$
      this.sidebarSubscription = this.sharedService.sidebarOpened$.subscribe((opened) => {
        this.opened = opened;
        if (!opened) {
          // Réinitialiser le contenu lorsque la sidebar est fermée
          this.currentPage$ = '';
          // Désabonnement de currentTicket$ lorsque la sidebar est fermée
          if (this.ticketSubscription) {
            this.ticketSubscription.unsubscribe();
          }
        } else {
          // Sidebar est en train de s'ouvrir, abonnez-vous à currentContent$
          this.sharedService.currentContent$.subscribe((content) => {
            this.currentPage$ = content;
            // Abonnement à currentTicket$ lorsque la sidebar s'ouvre
            if (this.currentTicket$) {
              this.ticketSubscription = this.currentTicket$.subscribe((ticketData) => {
                this.ticket = ticketData;
              });
            }
          });
        }
      });

      // Autres opérations lors de l'ouverture de la sidebar
    }
  }
}
