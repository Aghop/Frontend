import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct, NgbActiveModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Cita } from 'src/app/interfaces/cita';
import { ServicioCitasService } from 'src/app/serv/cita/servicio-citas.service';

@Component({
  selector: 'app-hora-yfecha',
  templateUrl: './hora-yfecha.component.html',
  styleUrls: ['./hora-yfecha.component.scss']
})
export class HoraYFechaComponent implements OnInit, OnDestroy {

  @Input() idmedico: number;
  @Input() id: number;

  public newCita: Cita;
  public model: NgbDateStruct;
  public date: Date;
  public timeCut: string[];
  public time: String;
  public agendarForm: FormGroup;
  public addSubscription: Subscription;

  constructor(

    public servicioCitas: ServicioCitasService,
    public activeModal: NgbActiveModal,
    private _builder: FormBuilder,
    private calendar: NgbCalendar

  ) {
    this.newCita = {
      idcita: 0,
      fechaHora: null,
      descripcion: "",
      idPaciente: 0,
      idEstado: 0,
      idMedico: 0,
    }
    this.date = new Date();
    this.agendarForm = this._builder.group({
      timeInput: ['', Validators.required],
      dateInput: ['', Validators.required]
    })

  }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
  }

  async onClickAccept() {
    this.time = this.agendarForm.value.timeInput;
    this.timeCut = this.time.split(':');
    this.date.setHours(parseInt(this.timeCut[0], 10), parseInt(this.timeCut[1], 10));

    this.newCita.fechaHora = this.date;
    this.newCita.idEstado = 1;
    this.newCita.idMedico = this.idmedico;
    this.newCita.idPaciente = this.id;
    this.newCita.descripcion = "";

    this.servicioCitas.addCita(this.newCita).subscribe(() => {
      console.log(this.newCita.fechaHora);
      console.log('Content updated successfully!')
    })
    window.location.reload();

  }

  onDateSelect(valor: NgbDateStruct) {
    this.date.setFullYear(valor.year, valor.month, valor.day);
    console.log(this.date);
  }


}
