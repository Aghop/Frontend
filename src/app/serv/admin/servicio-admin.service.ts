import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class ServicioAdminService {
  private servidor: String;
  constructor(private servicio:HttpClient) { 
    this.servidor= "http://127.0.0.1:3000"
  }
  public getAdmins(){
    let admins = this.servicio.get<Admin[]>(`${this.servidor}/api/admin/all`);
    return admins;
   }
}
