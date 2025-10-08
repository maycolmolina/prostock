import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Switalert2Service } from '../../services/switalert2.service';
import { Realtime } from '../../services/realtime';
import { StorageService } from '../../services/localstorage.service';
import { loginservice } from '../../services/login.service';
import { PiePagina } from '../../pie-pagina/pie-pagina';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink,PiePagina],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario = '';
  password = '';

  constructor(
    private alerta: Switalert2Service,
    private log: loginservice
  ) {}

  async logueo() {
    if (this.usuario == '' || this.password == '') {
      this.alerta.alertaerror('todoso los campos son obligatorios');
      return;
    }
    await this.log.login(this.usuario, this.password);
    
  }
}
