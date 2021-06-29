import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioCrearCuentaComponent } from './components/formulario-crear-cuenta/formulario-crear-cuenta.component';
import { ListarCitasComponent } from './components/listar-citas/listar-citas.component';
import { ListarPacientesComponent } from './components/listar-pacientes/listar-pacientes.component';
import { ListarEditcitasComponent } from './components/listar-editcitas/listar-editcitas.component';
import { LoginComponent } from './components/login/login.component';
import { NegadoComponent } from './components/negado/negado.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: ':username/cita/:id', component: ListarCitasComponent },
  { path: 'register', component: FormularioCrearCuentaComponent },
  { path: 'negado', component: NegadoComponent },
  { path: 'root', component: ListarPacientesComponent },
  { path: 'root/:id', component: ListarEditcitasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
