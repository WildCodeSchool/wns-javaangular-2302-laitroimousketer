import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
import { User } from 'src/app/core/models/user.model';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends UnsubcribeComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  private sidebarSubscription: Subscription | undefined;

  logo: string = 'assets/images/Alayde.png';
  ticket: string = 'assets/images/tickets.png';
  avatar: string = 'assets/images/avatar.png';
  opened: boolean = false;
  positionNav: number = 0;



  items: { label?: string, iconClass: string; routerLink?: string; action?: () => void }[] = [];
  @ViewChild('liBg') liBg!: ElementRef;
  @ViewChild('navigationList') navigationList!: ElementRef;
  userConnected!: User
  constructor(
    private store: Store<Reducer.StateDataStore>,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private renderer: Renderer2,
  ) {
    super();
  }
  
  handleItemClick(item: any): void {
    if (item.action) {
      item.action();
    }
  }
  
  moveDivToPosition(positionMenu: number, event: Event) {
    const liElements = this.navigationList.nativeElement.querySelectorAll('li');

    // Supprimez la classe active de tous les éléments li
    liElements.forEach((li: { classList: { remove: (arg0: string) => any; }; }) => li.classList.remove('active'));

    // Ajoutez la classe active uniquement à l'élément li parent cliqué
    liElements[positionMenu].classList.add('active');

    const liElement = liElements[positionMenu] as HTMLElement;
    const liRect = liElement.getBoundingClientRect();
    const ulRect = this.navigationList.nativeElement.getBoundingClientRect();

    const liTop = liRect.top - ulRect.top;
    const liHeight = liRect.height;

    const liCenter = liTop + liHeight / 2;
    const liBgHeight = 140;
    const liBgTranslateY = liCenter - liBgHeight / 2;

    // Utilisez Renderer2 pour définir le transform
    if (this.liBg) {
      // Vérifiez si liBg existe avant de tenter de le manipuler
      this.renderer.setStyle(
        this.liBg.nativeElement,
        'transform',
        `translateY(${liBgTranslateY}px)`
      );
    }

    setTimeout(() => {
      this.updateIcon();
    }, 100);

    // Empêcher la propagation de l'événement pour éviter de déclencher le clic deux fois
    event.stopPropagation();
  }


  ngAfterViewInit(): void {
    this.renderer.setStyle(
      this.liBg.nativeElement,
      'transform',
      `translateY(-48px)`
    );
  }

  updateIcon() {
  }
  ngOnInit(): void {
    // Appelle getUserProfile() pour récupérer les données de l'utilisateur
    this.loadUserConnected();
    this.iniItems();
   
  }
  iniItems() {
    this.items.push({ iconClass: 'bi bi-bookmarks-fill', routerLink: '/tickets/list' });

    if (this.userConnected.role?.roleTitle === 'Client') {
      this.items.push({ iconClass: 'bi bi-bookmark-plus-fill', action: () => this.toggleSidebarNewTicket() });
    }

    this.items.push({ iconClass: 'bi bi-people', routerLink: 'users/list' });

    if (this.userConnected.role?.roleTitle !== 'Client') {
      this.items.push({ iconClass: 'bi bi-speedometer', routerLink: 'dashboard' });
      this.items.push({ iconClass: 'bi bi-activity', action: () => this.toggleSidebarActivity() });
    }
  }
  
  initMenuMobileItems() {
    this.items.push({ iconClass: 'bi bi-bookmarks-fill', routerLink: '/tickets/list' });

    if (this.userConnected.role?.roleTitle === 'Client') {
      this.items.push({ iconClass: 'bi bi-bookmark-plus-fill', action: () => this.toggleSidebarNewTicket() });
    }

    this.items.push({ iconClass: 'bi bi-people', routerLink: 'users/list' });

    if (this.userConnected.role?.roleTitle !== 'Client') {
      this.items.push({ iconClass: 'bi bi-speedometer', routerLink: 'dashboard' });
      this.items.push({ iconClass: 'bi bi-activity', action: () => this.toggleSidebarActivity() });
    }
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  toggleSidebarActivity(): void {
    this.store.dispatch(sidebarAction.displayActivity());
  }

  toggleSidebarNewTicket(): void {
    this.store.dispatch(sidebarAction.displayTicketCreate());
  }

  toggleSidebarUserProfil(): void {
    this.store.dispatch(sidebarAction.displayUserProfil());
  }

  openMenu() {
    this.trigger.openMenu();
  }

  loadUserConnected() {
    if (!this.userConnected) {
      this.store.select(Reducer.getUserConnected)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (user: User) => {
            this.userConnected = user;
            // console.log('userConnected:', this.userConnected);
          },
          error: (error: any) => {
            console.error('Erreur lors de la récupération du profil utilisateur :', error);
          }
        });
    }
  }


}


