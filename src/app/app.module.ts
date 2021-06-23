import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavVarComponent } from './components/nav-var/nav-var.component';
import { ListarCitasComponent } from './components/listar-citas/listar-citas.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EstadoPipe } from './pipes/estados/estado.pipe';
import { MedicoPipe } from './pipes/medicos/medico.pipe';
import { EspecialidadIdPipe } from './pipes/especialidad/especialidad-id.pipe';
import { IdToNamePipeEspecialidad } from './pipes/especialidad/id-to-name.pipe';
import { CountCitaPipe } from './pipes/cita/count-cita.pipe';
import { FiltroEstadoPipe } from './pipes/estados/filtro-estado.pipe';
import { CancelarCitaComponent } from './components/cancelar-cita/cancelar-cita.component';
import { ReprogramarCitaComponent } from './components/reprogramar-cita/reprogramar-cita.component';
import { FormularioCrearCuentaComponent } from './components/formulario-crear-cuenta/formulario-crear-cuenta.component';
import { ComunasByRegionPipe } from './pipes/comunas/comunas-by-region.pipe';
import { ListarMedicosComponent } from './components/listar-medicos/listar-medicos.component';
import { FiltrarMedicosComponent } from './components/filtrar-medicos/filtrar-medicos.component';
import { IdToNameCentroPipe } from './pipes/centrosMedicos/id-to-name-centro.pipe';
import { ListarPacientesComponent } from './components/listar-pacientes/listar-pacientes.component';
import { IdToNameComunaPipe } from './pipes/comunas/id-to-name-comuna.pipe';
import { IdToNameRegionPipe } from './pipes/region/id-to-name-region.pipe';
import { BusquedaPorNombrePipe } from './pipes/nombres/busqueda-por-nombre.pipe';
import { BusquedaPorRegionPipe } from './pipes/region/busqueda-por-region.pipe';
import { BusquedaPorComunaPipe } from './pipes/comunas/busqueda-por-comuna.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavVarComponent,
    ListarCitasComponent,
    EstadoPipe,
    MedicoPipe,
    EspecialidadIdPipe,
    IdToNamePipeEspecialidad,
    CountCitaPipe,
    FiltroEstadoPipe,
    CancelarCitaComponent,
    ReprogramarCitaComponent,
    FormularioCrearCuentaComponent,
    ComunasByRegionPipe,
    ListarMedicosComponent,
    FiltrarMedicosComponent,
    IdToNameCentroPipe,
    ListarPacientesComponent,
    IdToNameComunaPipe,
    IdToNameRegionPipe,
    BusquedaPorNombrePipe,
    BusquedaPorRegionPipe,
    BusquedaPorComunaPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
