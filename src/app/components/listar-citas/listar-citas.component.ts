import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Cita } from 'src/app/interfaces/cita';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Medico } from 'src/app/interfaces/medico';
import { ServicioCitasService } from 'src/app/serv/cita/servicio-citas.service';
import { ServicioExtrasService } from 'src/app/serv/extra/servicio-extras.service';
import { ServicioMedicoService } from 'src/app/serv/medico/servicio-medico.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CancelarCitaComponent } from '../cancelar-cita/cancelar-cita.component';
import { ReprogramarCitaComponent } from '../reprogramar-cita/reprogramar-cita.component';
import { AgendarHoraComponent } from '../agendar-hora/agendar-hora.component';



@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListarCitasComponent implements OnInit, OnDestroy{
  public id: number;
  public citas$: Observable<Cita[]>;
  public cantCitas: number;

  public medico: Medico[];
  public medico$: Observable<Medico[]>;
  public medicoSubscription: Subscription;

  public especialidad: Especialidad[];
  public especialidad$: Observable<Especialidad[]>;
  public especialidadSubscription: Subscription;



  public radioSelected: string;
  public displayedColumns1 = ['Fecha', 'Medico', 'Especialidad', 'Reprogramar', 'Cancelar'];
  public displayedColumns2 = ['Fecha', 'Medico', 'Especialidad', 'Descripcion', 'Estado'];
  constructor(
    public servicioCitas: ServicioCitasService, 
    public servicioMedicos: ServicioMedicoService, 
    public servicioExtra: ServicioExtrasService, 
    public form: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
    ){

    this.citas$ = new Observable();
    this.medico$ = this.servicioMedicos.getMedicos();;
    this.especialidad$ = this.servicioExtra.getEspecialidades();
  }
  ngOnDestroy(): void {
    this.medicoSubscription.unsubscribe();
    this.especialidadSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametros => {
      this.id = parametros['id'];
    });

    let datos = JSON.parse(localStorage.getItem('hospital'));
    if (!datos || datos.id != this.id) {
      window.location.href="/login";
    };
    
    this.radioSelected = "option1";
    this.citas$ = this.servicioCitas.getCitasPaciente(this.id);

    this.medicoSubscription = this.medico$.subscribe( (medicosList: Medico[]) => this.medico = medicosList  );

    this.especialidadSubscription = this.especialidad$.subscribe( (especialidadList: Especialidad[]) => this.especialidad = especialidadList  );;

  }

  onClickCancel(cita: Cita) {
    const modalRef = this.modalService.open(CancelarCitaComponent);
    modalRef.componentInstance.cita = cita;
  }

  onClickRepro(cita: Cita) {
    const modalRef = this.modalService.open(ReprogramarCitaComponent);
    modalRef.componentInstance.cita = cita;
  }

  onClickAgendar(){
    const modalRef = this.modalService.open(AgendarHoraComponent);
    modalRef.componentInstance.id = this.id;
  }

}
