import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegadoComponent } from './negado.component';

describe('NegadoComponent', () => {
  let component: NegadoComponent;
  let fixture: ComponentFixture<NegadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
