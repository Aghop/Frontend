import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/interfaces/admin';
import { Paciente } from 'src/app/interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private servidor: String;
  constructor(private servicio:HttpClient) { 
    this.servidor= "http://127.0.0.1:3000"
  }

  validarLoginPaciente(username: string,password: string):Observable<any>{

    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');

    let paciente = this.servicio.get<Paciente>(`${this.servidor}/api/paciente/login?username=${username}&password=${password}`);
   return paciente;
  }

  validarLoginAdmin(username: string,password: string):Observable<any>{

    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');

    
    let admin = this.servicio.get<Admin>(`${this.servidor}/api/admin/login?username=${username}&password=${password}`);
   return admin;


  }

}
