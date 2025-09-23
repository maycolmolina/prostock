import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit{

  usuario = {
    nombre: '',
    tipo: '',
    numero: '',
    correo: ''
  };
   accesos = [
    { titulo: 'Ingresar Productos', link: '../ingresarpro' },
    { titulo: 'Mi Inventario', link: '../gestionpro' },
    { titulo: 'facturacion', link: '/facturacion' },
    { titulo: 'Bodega', link: '/ingresoMadera' }
  ];
  
  ngOnInit(): void {
    this.usuario=this.local.getItem('user');
     if(this.usuario===null){
      this.ruta.navigate(['../'])
     }
  }
  constructor (private local:StorageService,private ruta:Router){}
 

}
