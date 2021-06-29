import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cita } from 'src/app/interfaces/cita';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ServicioCitasService } from 'src/app/serv/cita/servicio-citas.service';

@Component({
  selector: 'app-editar-descripcion',
  templateUrl: './editar-descripcion.component.html',
  styleUrls: ['./editar-descripcion.component.scss']
})
export class EditarDescripcionComponent implements OnInit {
  @Input() cita: Cita;
  public editForm: FormGroup;
  public citaSubscription: Subscription;
  public estado = [
    {
      id: '1',
      name: 'Abierta'
    },
    {
      id: '2',
      name: 'Cancelada'
    },
    {
      id: '3',
      name: 'Concluida'
    }
  ]
  constructor(
    public activeModal: NgbActiveModal,
    public _builder: FormBuilder,
    public servicioCitas: ServicioCitasService) {
    this.editForm = this._builder.group({
      razon: ["", Validators.required],
      accept: [null, Validators.required],
      estado: [null, Validators.required]
    })

  }
  ngOnDestroy(): void {
    this.citaSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }
  // se cambia el estado de la cita y se suscribe
  async onClickAccept() {

    this.cita.descripcion = this.editForm.value.razon;
    this.cita.idEstado = this.editForm.value.estado;

    this.citaSubscription = this.servicioCitas.updateCita(this.cita).subscribe(() => {
      console.log('Content updated successfully!')
    })
    window.location.reload();
  }

}
