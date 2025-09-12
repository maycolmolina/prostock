import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    { titulo: 'Mis Productos', link: '/productos' },
    { titulo: 'Facturación', link: '/facturacion' },
    { titulo: 'ganacia pro dia', link: '/configuracion' }
  ];
  
  ngOnInit(): void {
    this.usuario=this.local.getItem('user');
  }
  constructor (private local:StorageService){}
 

}
