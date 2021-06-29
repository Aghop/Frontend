import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { CentroMedico } from 'src/app/interfaces/centro-medico';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Medico } from 'src/app/interfaces/medico';
import { ServicioCitasService } from 'src/app/serv/cita/servicio-citas.service';
import { ServicioExtrasService } from 'src/app/serv/extra/servicio-extras.service';
import { ServicioMedicoService } from 'src/app/serv/medico/servicio-medico.service';
import { HoraYFechaComponent } from '../hora-yfecha/hora-yfecha.component';

@Component({
  selector: 'app-agendar-hora',
  templateUrl: './agendar-hora.component.html',
  styleUrls: ['./agendar-hora.component.scss']
})
export class AgendarHoraComponent implements OnInit, OnDestroy {

  public medico$: Observable<Medico[]>;

  public especialidad: Especialidad[];
  public especialidad$: Observable<Especialidad[]>;
  public especialidadSubscription: Subscription;

  public centroMedico: CentroMedico[];
  public centroMedico$: Observable<CentroMedico[]>;
  public centroMedicoSubscription: Subscription;

  public displayedColumns1 = ['Profesional', 'Especialidad', 'CentroMedico', 'AgendarHora'];

  constructor(

    public servicioCitas: ServicioCitasService,
    public activeModal: NgbActiveModal,
    private _builder: FormBuilder,
    private calendar: NgbCalendar,
    public servicioMedicos: ServicioMedicoService,
    public servicioExtra: ServicioExtrasService,
    private modalService: NgbModal
  ) {
    
    this.medico$ = new Observable();
    this.especialidad$ = this.servicioExtra.getEspecialidades();
    this.centroMedico$ = this.servicioExtra.getCentros();

  }
  ngOnDestroy(): void {
    this.especialidadSubscription.unsubscribe();
    this.centroMedicoSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.medico$ = this.servicioMedicos.getMedicos();
    this.especialidadSubscription = this.especialidad$.subscribe((especialidadList: Especialidad[]) => this.especialidad = especialidadList);
    this.centroMedicoSubscription = this.centroMedico$.subscribe((centroMedicoList: CentroMedico[]) => this.centroMedico = centroMedicoList);

  }
  // Se abre un modal que muestra los médicos y permite elegir una hora para una cita
  open(idmedico, id){
    const modalRef = this.modalService.open(HoraYFechaComponent);
    modalRef.componentInstance.idmedico = idmedico;
    modalRef.componentInstance.id = id;
  }
}
