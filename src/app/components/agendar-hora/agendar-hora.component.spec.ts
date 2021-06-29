import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarHoraComponent } from './agendar-hora.component';

describe('AgendarHoraComponent', () => {
  let component: AgendarHoraComponent;
  let fixture: ComponentFixture<AgendarHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendarHoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
