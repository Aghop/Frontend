import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Paciente } from './../../interfaces/paciente';
import { Router } from '@angular/router';
import { ServicioPacienteService } from '../../serv/paciente/servicio-paciente.service';
import { ServicioExtrasService } from 'src/app/serv/extra/servicio-extras.service';
import { Observable, Subscription } from 'rxjs';
import { Region } from 'src/app/interfaces/region';
import { Comuna } from 'src/app/interfaces/comuna';

@Component({
  selector: 'app-formulario-crear-cuenta',
  templateUrl: './formulario-crear-cuenta.component.html',
  styleUrls: ['./formulario-crear-cuenta.component.scss'],
})
export class FormularioCrearCuentaComponent implements OnInit, OnDestroy {
  public digVer = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
    { name: '6' },
    { name: '7' },
    { name: '8' },
    { name: '9' },
    { name: 'k' }
  ];
  public pac: Paciente;
  public regiones$: Observable<Region[]>;
  public comunas: Comuna[];
  public comunas$: Observable<Comuna[]>;
  public comunaSubscription: Subscription;
  public comunaDisabled = true;
  public pacienteForm: FormGroup;
  public idRegion: number;

  
  constructor(
    public form: FormBuilder,
    private router: Router,
    public pacienteService: ServicioPacienteService,
    public servicioExtra: ServicioExtrasService,
  ) {
    this.comunas$ = this.servicioExtra.getComunas();
    this.regiones$ = new Observable();

    this.pacienteForm = this.form.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      rut: ['', [Validators.required,Validators.pattern('^[0-9]+$') ]],
      digVerr: [null, Validators.required],
      direccion: ['', Validators.required],
      region: [null, Validators.required],
      comuna: [{ value: null, disabled: true }, Validators.required],
      email: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      confirmacion: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    this.comunaSubscription = this.comunas$.subscribe( (comunasList: Comuna[]) => this.comunas = comunasList );
    this.regiones$ = this.servicioExtra.getRegiones();

  }
  ngOnDestroy(): void {
    this.comunaSubscription.unsubscribe();
  }
  onChange(valor: number) {
    this.idRegion = valor;
    this.pacienteForm.get('comuna').setValue('');
    this.pacienteForm.get('comuna').enable();
  }

  get comunasByRegion() {
    try {
      return this.comunas.filter(items => {
        return items.idRegion == this.idRegion;
      })
    } catch (error) {
      return null;
    }
  }
  
  submit() {
    this.pac = {
      idPaciente: 0,
      nombre: this.pacienteForm.value.nombre,
      apellidos: this.pacienteForm.value.apellidos,
      rut: this.pacienteForm.value.rut,
      digVer: this.pacienteForm.value.digVer,
      direccion: this.pacienteForm.value.direccion,
      idRegion: this.pacienteForm.value.region,
      idComuna: this.pacienteForm.value.comuna,
      email: this.pacienteForm.value.email,
      username: this.pacienteForm.value.user,
      password: this.pacienteForm.value.password,
    }

    this.pacienteService.addPaciente(this.pac)
      .subscribe(() => {
        //console.log(res)
        //this.pacienteForm.reset();
      })

      window.location.href="/";
  }


}