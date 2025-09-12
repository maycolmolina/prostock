import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Switalert2Service } from '../../services/switalert2.service';
import { Realtime } from '../../services/realtime';
import { StorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario='';
  password='';

  constructor(private ruta:Router,private local:StorageService,private realtime:Realtime, private alerta:Switalert2Service){
  }

  async logueo(){
    if(this.usuario=='' || this.password==''){
      this.alerta.alertaerror('todoso los campos son obligatorios')
      return
    }

    const user=await this.realtime.obtenerusuario(this.usuario)
    if(!user.exists()){
      this.alerta.info('no existe ningun usuario con esas credenciales')
      return;
    }
    const data = user.val();
    if (data) {
      const [key, user] = Object.entries(data)[0]; // tomamos el primero si es único

      if((user as any).contrasenia==this.password){
        this.local.setItem('user',user);
        this.local.setItem('key',key);
        this.ruta.navigate(['perfil'])
      }
      else{
      this.alerta.info('no existe ningun usuario con esas credenciales')
      return;
      }

    }
  }

}
