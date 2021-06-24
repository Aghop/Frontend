import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEditcitasComponent } from './listar-editcitas.component';

describe('ListarEditcitasComponent', () => {
  let component: ListarEditcitasComponent;
  let fixture: ComponentFixture<ListarEditcitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEditcitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEditcitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
