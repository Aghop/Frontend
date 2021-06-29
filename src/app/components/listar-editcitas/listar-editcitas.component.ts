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
export class ListarEditcitasComponent implements OnInit, OnDestroy {

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
  public displayedColumns = ['Fecha', 'Medico', 'Especialidad', 'Editar', 'Estado','Eliminar'];
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
  // se desuscriben ambas suscripciones
  ngOnDestroy(): void {
    this.medicoSubscription.unsubscribe();
    this.especialidadSubscription.unsubscribe();
  }


  ngOnInit(): void {
    //se obtiene el id para guardar las citas de ese paciente
    this.activatedRoute.params.subscribe(parametros => {
      this.id = parametros['id'];
    })
    // se obtienen las cookies para que solo lo vea un administrador
    let datos = JSON.parse(localStorage.getItem('hospitalAdmin'));
    if (!datos) {
      window.location.href=`/negado`;
    }
    // se obtienen la información del backend mediante una suscripción hacia una lista de médicos y especialidad
    this.radioSelected = "option1";
    this.citas$ = this.servicioCitas.getCitasPaciente(this.id);

    this.medicoSubscription = this.medico$.subscribe( (medicosList: Medico[]) => this.medico = medicosList  );

    this.especialidadSubscription = this.especialidad$.subscribe( (especialidadList: Especialidad[]) => this.especialidad = especialidadList  );;

  }
//se elimina una cita mediante un suscribe con el id de la cita
  onClickDelete(id: string){
    this.servicioCitas.deleteCita(id).subscribe(() => {
      console.log('Content deleted successfully!')
      window.location.reload();
    });
  }
// se abre un modal para editar la cita
  onClickEdit(cita: Cita) {
    const modalRef = this.modalService.open(EditarDescripcionComponent);
    modalRef.componentInstance.cita = cita;
  }

}
