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

  mostrarModal=false;

  usuario = { 
    nombre: '',
    tipo: '',
    numero: '',
    correo: ''
  };
   accesos = [
    { titulo: 'Ingresar Productos', link: '../ingresarpro'  ,texbtn:'publicar'  },
    { titulo: 'Mi Inventario', link: '../gestionpro'  ,texbtn:'ver Insumos'  },
    { titulo: 'Facturacion', link: '/facturacion'  ,texbtn:'reportes'  },
    { titulo: 'Bodega', link: '/ingresoMadera'   ,texbtn:'ingresar a bodega'  }
  ];
  abrirModal(){
    this.mostrarModal=true;
  }
  cerrarModal(){
    this.mostrarModal=false;
  }
  ngOnInit(): void {
    this.usuario=this.local.getItem('user');
     if(this.usuario===null){
      this.ruta.navigate(['../'])
     }
  }
  constructor (private local:StorageService,private ruta:Router){}
 

}
