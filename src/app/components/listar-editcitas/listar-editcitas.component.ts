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
import { EditarDescripcionComponent } from '../editar-descripcion/editar-descripcion.component';



@Component({
  selector: 'app-listar-editcitas',
  templateUrl: './listar-editcitas.component.html',
  styleUrls: ['./listar-editcitas.component.scss']
})
export class ListarEditcitasComponent implements OnInit {

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
  public displayedColumns1 = ['Fecha', 'Medico', 'Especialidad', 'Editar'];
  public displayedColumns2 = ['Fecha', 'Medico', 'Especialidad', 'Estado'];
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
    })
    this.radioSelected = "option1";
    this.citas$ = this.servicioCitas.getCitasPaciente(this.id);

    this.medicoSubscription = this.medico$.subscribe( (medicosList: Medico[]) => this.medico = medicosList  );

    this.especialidadSubscription = this.especialidad$.subscribe( (especialidadList: Especialidad[]) => this.especialidad = especialidadList  );;

  }


  onClickEdit(cita: Cita) {
    const modalRef = this.modalService.open(EditarDescripcionComponent);
    modalRef.componentInstance.cita = cita;
  }

}
