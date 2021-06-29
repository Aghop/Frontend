import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cita } from 'src/app/interfaces/cita';

@Injectable({
  providedIn: 'root'
})
export class ServicioCitasService {
  private servidor: String;
  constructor(private servicio:HttpClient) { 
    this.servidor= "http://127.0.0.1:3000"
  }

  /**
   * Devuelve las citas de un paciente
   * @params id - id del paciente
   * @return citas - lista de citas del paciente
   */
  public getCitasPaciente(id: number){
   let citas = this.servicio.get<Cita[]>(`${this.servidor}/api/cita/${id}/all`);
   return citas;
  }

  public deleteCita(id: string){
    let citas = this.servicio.delete<Cita>(`${this.servidor}/api/cita/delete/${id}/`);
    return citas;
   }

   public addCita(cita: Cita){
    let citas = this.servicio.post<Cita>(`${this.servidor}/api/cita/`,cita);
    return citas;
  }

  public updateCita(cita: Cita){
    let citas = this.servicio.put<Cita>(`${this.servidor}/api/cita/update/`,cita);
    return citas;
  }
   /* ------------------------- FALTA EL POST Y UPDATE ------------------------- */
}
