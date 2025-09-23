import { Component, OnInit } from '@angular/core';
import { Realtime } from '../../services/realtime';

@Component({
  selector: 'app-reportes',
  imports: [],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  vista = 'madera';
  compras_m = [
    {
      tipo: '',
      cantidad_actual: '',
      proveedor:'',
      presentacion:'',
      precioTotal:'',
      fecha:'',
      cantidad_comprada:'',
      unidad_medida:''
    },
  ];

  cambiarvista(cadena: string) {
    this.vista = cadena;
    if (cadena === 'madera') {
      this.cargar_compras_m();
    }
  }
  async cargar_compras_m() {
    this.compras_m=await this.realtime.obtenerventas();
  }

  constructor(private realtime: Realtime) {}
  ngOnInit(): void {
    this.cargar_compras_m();
  }
}
