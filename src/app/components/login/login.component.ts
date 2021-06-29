import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/serv/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public radioSelected: string;
  public mensaje: string = "";


  constructor(public form: FormBuilder, public loginService: LoginService) {


    this.loginForm = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      option: [null]
    });
  }

  ngOnInit(): void {

    let datos = JSON.parse(localStorage.getItem('hospital'));
    if (datos && datos.username) {
      window.location.href=`/${datos.username}/cita/${datos.id}`;
    }

  }

  onSubmit() {

    if (!this.loginForm.value.option) {
    this.loginService.validarLoginPaciente(this.loginForm.value.username, this.loginForm.value.password).subscribe(datos => {

      if (datos.length == 0) {
        this.mensaje = "Login no existe";
      } else {
        console.log(datos);
        localStorage.setItem('hospital',JSON.stringify( {"username": datos[0].username, "id": datos[0].idPaciente }) );
        window.location.href=`/${datos[0].username}/cita/${datos[0].idPaciente}`;
      }

    });
  }
    if (this.loginForm.value.option) {
      this.loginService.validarLoginAdmin(this.loginForm.value.username, this.loginForm.value.password).subscribe(datos => {

      if (datos.length == 0) {
        this.mensaje = "Login no existe";
      } else {
        console.log(datos);
        localStorage.setItem('hospitalAdmin',JSON.stringify( {"username": datos[0].username, "id": datos[0].idPaciente, "admin": true }) );
        window.location.href=`/root`;
      }

    });
    }
    

  }

}
