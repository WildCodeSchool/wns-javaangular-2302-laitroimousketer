/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserHistoricalComponent } from './user-historical.component';

describe('UserHistoricalComponentComponent', () => {
  let component: UserHistoricalComponent;
  let fixture: ComponentFixture<UserHistoricalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoricalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
