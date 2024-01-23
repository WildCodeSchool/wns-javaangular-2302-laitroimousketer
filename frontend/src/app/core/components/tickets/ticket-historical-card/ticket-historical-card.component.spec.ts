/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TicketHistoricalCardComponent } from './ticket-historical-card.component';

describe('TicketHistoricalCardComponent', () => {
  let component: TicketHistoricalCardComponent;
  let fixture: ComponentFixture<TicketHistoricalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketHistoricalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketHistoricalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
