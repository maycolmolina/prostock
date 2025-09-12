import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Realtime } from '../services/realtime';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../objetos';
import { Switalert2Service } from '../services/switalert2.service';
import { Router } from '@angular/router';
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
    tipoUsuario:['cliente',[Validators.required]]
  })
  usuario:Usuario={
    nombre:'',
    contrasenia:'',
    correo:'',
    numero:'',
    urlimg:'',
    tipo:''
}

  constructor(private rutas:Router,private realtime:Realtime,private alerta:Switalert2Service){}
  async createuser(){
    this.usuario.nombre=this.form.value.nombre ?? '';
    this.usuario.contrasenia=this.form.value.constrasenia ?? '';
    this.usuario.correo=this.form.value.email ?? '';
    this.usuario.numero=this.form.value.telefono ?? '';
    this.usuario.tipo=this.form.value.tipoUsuario ?? '';
    
    if(await this.realtime.correoExiste(this.usuario.correo)){
      this.alerta.info('el correo que quiere ingresar ya esta siendo utilizado')
      return;
    }
    
    await this.realtime.createuser(this.usuario);
  }
  
}
