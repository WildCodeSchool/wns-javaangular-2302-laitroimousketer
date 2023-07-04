import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadbandComponent } from './headband.component';

describe('HeadbandComponent', () => {
  let component: HeadbandComponent;
  let fixture: ComponentFixture<HeadbandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadbandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadbandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
