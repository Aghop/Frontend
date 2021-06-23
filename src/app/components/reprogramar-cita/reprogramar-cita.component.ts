import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Cita } from 'src/app/interfaces/cita';
import { ServicioCitasService } from 'src/app/serv/cita/servicio-citas.service';

@Component({
  selector: 'app-reprogramar-cita',
  templateUrl: './reprogramar-cita.component.html',
  styleUrls: ['./reprogramar-cita.component.scss']
})
export class ReprogramarCitaComponent implements OnInit {
  @Input() cita: Cita;
  public reproForm: FormGroup;
  public model: NgbDateStruct;
  public date: Date;
  public timeCut: string[];
  public time: String;

  constructor(

    public servicioCitas: ServicioCitasService,
    public activeModal: NgbActiveModal,
    private _builder: FormBuilder,
    private calendar: NgbCalendar

  ) {
    this.date = new Date();

    this.reproForm = this._builder.group({
      timeInput: ['', Validators.required],
      accept: [null,Validators.required],
    })
  }
  ngOnInit(): void {
  }

  async onClickAccept() {
    console.log(this.reproForm.value.timeInput);
   
    this.time = this.reproForm.value.timeInput;
    this.timeCut = this.time.split(':');
 console.log( parseInt(this.timeCut[0],10) , parseInt(this.timeCut[1],10) );
    this.date.setHours( parseInt(this.timeCut[0],10) , parseInt(this.timeCut[1],10) );

    this.cita.fechaHora = this.date;


    this.servicioCitas.updateCita(this.cita).subscribe(() => {
      console.log('Content updated successfully!')
    })
    window.location.reload();
  }


  onDateSelect(valor: NgbDateStruct) {
    this.date.setFullYear(valor.year, valor.month, valor.day);
  }


}
