import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioCrearCuentaComponent } from './components/formulario-crear-cuenta/formulario-crear-cuenta.component';
import { ListarCitasComponent } from './components/listar-citas/listar-citas.component';
import { ListarMedicosComponent } from './components/listar-medicos/listar-medicos.component';
import { ListarPacientesComponent } from './components/listar-pacientes/listar-pacientes.component';

const routes: Routes = [
{ path:'cita/:id',component:ListarCitasComponent },
{ path: 'paciente/crear',component:FormularioCrearCuentaComponent },
{ path: 'medico', component:ListarMedicosComponent },
{ path: 'paciente', component:ListarPacientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
