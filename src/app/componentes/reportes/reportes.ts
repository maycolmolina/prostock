import { Component, OnInit } from '@angular/core';
import { Realtime } from '../../services/realtime';
import { NgClass } from '@angular/common';
import { ComponenteCarga } from '../componente-carga/componente-carga';

@Component({
  selector: 'app-reportes',
  imports: [NgClass,ComponenteCarga],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  vista = 'madera';
  cargando=false;
  compras_m = [
    {
      tipo: '',
      cantidad_actual: '',
      proveedor: '',
      presentacion: '',
      precioTotal: '',
      fecha: '',
      cantidad_comprada: '',
      unidad_medida: '',
    },
  ];
  misproductosv: any[] = [];
  compras_cuero: any[] = [];
  RegistroVenta:any=[]

  cambiarvista(cadena: string) {
    this.cargando=true;
    this.vista = cadena;
    if (cadena === 'madera') {
      this.cargar_compras_m();
    } else if (cadena === 'productos') {
      this.cargarmipro();
    } else if (cadena === 'cuero') {
      this.cargarmicuero();
    }else if(cadena==='ventasRealizadas'){
      this.obtenerVentapro();
    }
  }
  async cargar_compras_m() {
    this.compras_m = await this.realtime.obtenerventas();
    this.cargando=false;
  }
  async obtenerVentapro() {
    this.RegistroVenta= await this.realtime.obtenerventasPro();
    console.log(this.RegistroVenta);
    this.cargando=false;
  }
  async cargarmipro() {
    this.misproductosv = await this.realtime.getMiProducto();
    this.cargando=false;
  }
  async cargarmicuero() {
    this.compras_cuero = await this.realtime.obtenerventasCuero();
    console.log(this.compras_cuero)
    this.cargando=false;
  }

  constructor(private realtime: Realtime) {}
  ngOnInit(): void {
    this.cargar_compras_m();
  }
}
