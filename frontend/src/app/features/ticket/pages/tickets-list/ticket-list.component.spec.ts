import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TicketsListComponent } from './tickets-list.component';
import { TicketService } from '../../../../core/services/ticket.service';
import { AuthService } from '../../../../../app/core/services/auth.service';
import { MediaService } from '../../../../../app/core/services/media.service';
import { FormBuilder } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';  // Import EffectsModule
import { EntityDataModule, EntityDataService } from '@ngrx/data';
import {  NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

let entityMetaData = {
  users: {},    // Configuration pour l'entité "users"
  tickets: {},  // Configuration pour l'entité "tickets"
  media:{}, // Configuration pour l'entité "media"

};
 

describe('TicketsListComponent', () => {
  let component: TicketsListComponent;
  let fixture: ComponentFixture<TicketsListComponent>;
  let ticketService: TicketService;
  let authService: AuthService;
  let mediaService: MediaService;
  let formBuilder: FormBuilder;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketService, EntityDataService, AuthService, MediaService, FormBuilder],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        NoopAnimationsModule, //  !!Utilisez NoopAnimationsModule pour désactiver les animations pendant les tests
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot({
          entityMetadata: entityMetaData,
        }),
      ],
    });

    // Utilisez TestBed.createComponent pour obtenir une instance de votre composant
    fixture = TestBed.createComponent(TicketsListComponent);
    component = fixture.componentInstance;

    // Injectez les services nécessaires
    ticketService = TestBed.inject(TicketService);
    authService = TestBed.inject(AuthService);
    mediaService = TestBed.inject(MediaService);
    formBuilder = TestBed.inject(FormBuilder);
    store = TestBed.inject(Store);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sort tickets by title in ascending order', () => {
    // Arrange
    const mockTickets = [
      { id: 1, ticketTitle: 'C' },
      { id: 2, ticketTitle: 'A' },
      { id: 3, ticketTitle: 'B' },
    ];
    component.originalTickets = [...mockTickets] as any;
    component.tickets = [...mockTickets] as any;

    // Act
    component.sortTickets('Titre');

    // Assert
    expect(component.tickets).toEqual([
      { id: 2, ticketTitle: 'A' },
      { id: 3, ticketTitle: 'B' },
      { id: 1, ticketTitle: 'C' },
    ]);
  });
});
