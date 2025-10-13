import { Component, OnInit } from '@angular/core';
import { Realtime } from '../../services/realtime';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reportes',
  imports: [NgClass],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  vista = 'madera';
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

  cambiarvista(cadena: string) {
    this.vista = cadena;
    if (cadena === 'madera') {
      this.cargar_compras_m();
    } else if (cadena === 'productos') {
      this.cargarmipro();
    } else if (cadena === 'cuero') {
      this.cargarmicuero();
    }
  }
  async cargar_compras_m() {
    this.compras_m = await this.realtime.obtenerventas();
  }
  async cargarmipro() {
    this.misproductosv = await this.realtime.getMiProducto();
  }
  async cargarmicuero() {
    this.compras_cuero = await this.realtime.obtenerventasCuero();
    console.log(this.compras_cuero)
  }

  constructor(private realtime: Realtime) {}
  ngOnInit(): void {
    this.cargar_compras_m();
  }
}
