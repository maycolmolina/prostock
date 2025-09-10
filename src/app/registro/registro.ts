import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Realtime } from '../services/realtime';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../objetos';
import { Switalert2Service } from '../services/switalert2.service';
@Component({
  selector: 'app-registro',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})

export class Registro {
  fb=inject(FormBuilder)
  form=this.fb.group({
    nombre:['',[Validators.required]],
    email:['',[Validators.required]],
    constrasenia:['',[Validators.required]],
    telefono:['',[Validators.required]],
  })
  usuario:Usuario={
    nombre:'',
    contrasenia:'',
    correo:'',
    numero:'',
    urlimg:''
}

  constructor(private realtime:Realtime,private alerta:Switalert2Service){}
  async createuser(){
    this.usuario.nombre=this.form.value.nombre ?? '';
    this.usuario.contrasenia=this.form.value.constrasenia ?? '';
    this.usuario.correo=this.form.value.email ?? '';
    this.usuario.numero=this.form.value.telefono ?? '';
    
    if(await this.realtime.correoExiste(this.usuario.correo)){
      this.alerta.info('el correo que quiere ingresar ya esta siendo utilizado')
      return;
    }
    
    this.realtime.createuser(this.usuario).subscribe(
      ()=>{
        this.alerta.alertaExito('el usuario ha sido registrado correctamente');
      }
      ,
      ()=>{
        this.alerta.alertaerror('vaya parece que ha ocirrido un error');
      }
    )
  }
  
}
