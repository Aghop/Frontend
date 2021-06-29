import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraYFechaComponent } from './hora-yfecha.component';

describe('HoraYFechaComponent', () => {
  let component: HoraYFechaComponent;
  let fixture: ComponentFixture<HoraYFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoraYFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraYFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
