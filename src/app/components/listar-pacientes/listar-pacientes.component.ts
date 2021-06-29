import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Medico } from 'src/app/interfaces/medico';
import { ServicioExtrasService } from 'src/app/serv/extra/servicio-extras.service';
import { ServicioMedicoService } from 'src/app/serv/medico/servicio-medico.service';
import { ServicioPacienteService } from '../../serv/paciente/servicio-paciente.service';
import { ServicioCitasService } from '../../serv/cita/servicio-citas.service';
import { Cita } from 'src/app/interfaces/cita';
import { Paciente } from 'src/app/interfaces/paciente';
import { Region } from 'src/app/interfaces/region';
import { Comuna } from 'src/app/interfaces/comuna';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusquedaPorComunaPipe } from 'src/app/pipes/comunas/busqueda-por-comuna.pipe';
import { BusquedaPorNombrePipe } from 'src/app/pipes/nombres/busqueda-por-nombre.pipe';
import { BusquedaPorRegionPipe } from 'src/app/pipes/region/busqueda-por-region.pipe';
import { CentroMedico } from 'src/app/interfaces/centro-medico';


@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.scss']
})
export class ListarPacientesComponent implements OnInit, OnDestroy {
  public formFilter: FormGroup;
  public regiones: Region[];
  public regiones$: Observable<Region[]>;
  public comunas: Comuna[];
  public comunas$: Observable<Comuna[]>;
  public comunaSubscription: Subscription;
  public comunaDisabled = true;
  public idRegion: number;
  public idComuna: number;

  public centroMedico: CentroMedico[];
  public centroMedico$: Observable<CentroMedico[]>;
  public centroMedicoSubscription: Subscription;

  public id: number;
  public citas$: Observable<Cita[]>;
  public cantCitas: number;

  public medico: Medico[];
  public medico$: Observable<Medico[]>;
  public medicoSubscription: Subscription;

  public especialidad: Especialidad[];
  public especialidad$: Observable<Especialidad[]>;
  public especialidadSubscription: Subscription;

  public paciente: Paciente[];
  public paciente$: Observable<Paciente[]>;
  public pacienteSubscription: Subscription;
  public pacienteaux: Paciente[] = [];

  public radioSelected: string;
  public unstring: string;
  public displayedColumns1 = ['Nombre', 'RUT', 'Direccion', 'Correo electronico', 'Region', 'Comuna'];
  public displayedColumns2 = ['Nombre', 'RUT', 'Especialidad', 'Centro Medico'];

  public pipeNombre = new BusquedaPorNombrePipe();
  public pipeComuna = new BusquedaPorComunaPipe();
  public pipeRegion = new BusquedaPorRegionPipe();

  constructor(
    public servicioPaciente: ServicioPacienteService,
    public servicioMedicos: ServicioMedicoService,
    public servicioExtra: ServicioExtrasService,
    public servicioCitas: ServicioCitasService,
    public form: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    this.formFilter = this.form.group({
      nombre: [''],
      region: [null],
      comuna: [{ value: null, disabled: true }],
    });
    this.especialidad$ = this.servicioExtra.getEspecialidades();
    this.centroMedico$ = this.servicioExtra.getCentros();
    this.citas$ = new Observable();
    this.medico$ = this.servicioMedicos.getMedicos();
    this.paciente$ = this.servicioPaciente.getPacientes();
    this.comunas$ = this.servicioExtra.getComunas();
    this.regiones$ = new Observable();

  }

  ngOnDestroy(): void {
    this.medicoSubscription.unsubscribe();
    this.pacienteSubscription.unsubscribe();
    this.especialidadSubscription.unsubscribe();
    this.centroMedicoSubscription.unsubscribe();
    this.comunaSubscription.unsubscribe();
  }
  
  // se busca el id del paciente y deniega el paso a un usuario que no sea administrador
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametros => {
      this.id = parametros['id'];
    })
    let datos = JSON.parse(localStorage.getItem('hospitalAdmin'));
    if (!datos) {
      window.location.href = `/negado`;
    }

    this.radioSelected = "option1";
    this.comunaSubscription = this.comunas$.subscribe((comunasList: Comuna[]) => this.comunas = comunasList);
    this.regiones$ = this.servicioExtra.getRegiones();
    this.citas$ = this.servicioCitas.getCitasPaciente(this.id);

    this.medicoSubscription = this.medico$.subscribe((medicosList: Medico[]) => this.medico = medicosList);
    this.pacienteSubscription = this.paciente$.subscribe((pacientesList: Paciente[]) => this.paciente = pacientesList);
    this.especialidadSubscription = this.especialidad$.subscribe((especialidadList: Especialidad[]) => this.especialidad = especialidadList);
    this.centroMedicoSubscription = this.centroMedico$.subscribe((centroMedicoList: CentroMedico[]) => this.centroMedico = centroMedicoList);
  }
  // función busca la región y se reinicie el valor de la comuna
  onChange(valor: number) {
    this.idRegion = valor;
    this.formFilter.get('comuna').setValue(null);
    this.formFilter.get('comuna').enable();
  }
// función que cambia las comunas dependiendo de la región que esté elegida
  get comunasByRegion() {
    try {
      return this.comunas.filter(items => {
        return items.idRegion == this.idRegion;
      })
    } catch (error) {
      return null;
    }
  }
// se realizan 3 pipes diferentes, la primera, es filtrar el nombre, luego la región y finalmente la comuna
  get pacientesFilter() {
    return this.pipeComuna.transform(
      this.pipeRegion.transform(
        this.pipeNombre.transform(this.paciente, this.formFilter.value.nombre),
        this.formFilter.value.region),
      this.formFilter.value.comuna
    );
  }

}