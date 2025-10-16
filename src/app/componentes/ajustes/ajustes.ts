import { Component } from '@angular/core';
import { loginservice } from '../../services/login.service';
import { Switalert2Service } from '../../services/switalert2.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajustes',
  imports: [],
  templateUrl: './ajustes.html',
  styleUrl: './ajustes.css'
})
export class Ajustes {


  constructor(private login:loginservice,private alerta:Switalert2Service,private rutas:Router){}

  async cerrarsession(){
    this.login.logout()
    .then(() => {
      localStorage.clear();
      this.rutas.navigate(['../']);
    })
    .catch((error) => {
      this.alerta.alertaerror("Error al cerrar sesión");
    }).finally(()=>{
      window.location.reload();
    });

  }

}
