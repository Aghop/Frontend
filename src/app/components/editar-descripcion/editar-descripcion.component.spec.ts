import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDescripcionComponent } from './editar-descripcion.component';

describe('EditarDescripcionComponent', () => {
  let component: EditarDescripcionComponent;
  let fixture: ComponentFixture<EditarDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDescripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
