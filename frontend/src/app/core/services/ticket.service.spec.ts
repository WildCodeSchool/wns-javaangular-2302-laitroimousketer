import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';
import { Ticket } from '../models/ticket.model';
import { environment } from '../../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule, EntityDataService } from '@ngrx/data';


let entityMetaData = {
  tickets: {} // Utilisez le même nom que dans votre service
};

describe('TicketService', () => {
  let service: TicketService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketService, EntityDataService],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot({
          entityMetadata: entityMetaData,
        }),
      ],
    });

    service = TestBed.inject(TicketService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tickets', () => {
    const mockTickets: Ticket[] = [{ id: 1, ticketTitle: 'Mock Ticket' }] as any;

    service.getTickets().subscribe((tickets) => {
      expect(tickets).toEqual(mockTickets);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tickets/`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTickets);
  });

  it('should get a specific ticket', () => {
    const ticketId = 1;
    const mockTicket: Ticket = { id: ticketId, ticketTitle: 'Mock Ticket' } as any;

    service.getTicket(ticketId).subscribe((ticket) => {
      expect(ticket).toEqual(mockTicket);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tickets/${ticketId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTicket);
  });

  it('should update a ticket', () => {
    const ticketId = 1;
    const mockTicket: Ticket = { id: ticketId, ticketTitle: 'Mock Ticket' } as any;

    service.updateTicket(ticketId, mockTicket).subscribe((updatedTicket) => {
      expect(updatedTicket).toEqual(mockTicket);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tickets/${ticketId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockTicket);
  });

  it('should delete a ticket', () => {
    const ticketId = 1;
    const mockTickets: Ticket[] = [{ id: 2, ticketTitle: 'Another Ticket' }] as any;

    service.deleteTicket(ticketId).subscribe((tickets) => {
      expect(tickets).toEqual(mockTickets);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tickets/${ticketId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockTickets);
  });

  it('should get tickets by filters', () => {
    const filter = 'status=InProgress';
    const mockFilteredTickets: Ticket[] = [{ id: 1, ticketTitle: 'Mock Ticket' }] as any;

    service.getTicketsByFilters(filter).subscribe((tickets) => {
      expect(tickets).toEqual(mockFilteredTickets);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tickets/?${filter}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockFilteredTickets);
  });

  it('should get ticket count by filters', () => {
    const filter = 'status=InProgress';
    const mockCount = 5;

    service.getTicketCountByFilters(filter).subscribe((count) => {
      expect(count).toEqual(mockCount);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tickets/?${filter}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCount);
  });
});
