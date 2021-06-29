import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { Cita } from 'src/app/interfaces/cita';
import { ServicioCitasService } from 'src/app/serv/cita/servicio-citas.service';


@Component({
  selector: 'app-cancelar-cita',
  templateUrl: './cancelar-cita.component.html',
  styleUrls: ['./cancelar-cita.component.scss']
})
export class CancelarCitaComponent implements OnInit, OnDestroy {
  @Input() cita: Cita;
  public cancelForm: FormGroup;
  public citaSubscription: Subscription;
  constructor(

    public servicioCitas: ServicioCitasService,

    public activeModal: NgbActiveModal,
    private _builder: FormBuilder

  ) {
    this.cancelForm = this._builder.group({
      razon: ["", Validators.required],
      accept: [null, Validators.required],
    })
  }
  ngOnDestroy(): void {
    
  }
  ;

  ngOnInit(): void {
  }
 // se cambia el estado de la cita a cancelado y se suscribe
  async onClickAccept() {

    this.cita.descripcion = this.cancelForm.value.razon;
    this.cita.idEstado = 2;

   this.servicioCitas.updateCita(this.cita).subscribe(() => {
      console.log('Content updated successfully!')
    })
    window.location.reload();
  }

}
