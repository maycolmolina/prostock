import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/localstorage.service';
import { Realtime } from '../../services/realtime';
import { GlobalbaseService } from '../../services/storage.service';
import { Switalert2Service } from '../../services/switalert2.service';

@Component({
  selector: 'app-gestion-productos',
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion-productos.html',
  styleUrl: './gestion-productos.css',
})
export class GestionProductos implements OnInit {
  vista = 'productoventa';
  filtro: string = '';
  productounico: any;
  productos: any[] = [];
  madera: any[] = [
    {
      id: '',
      id_usuario: '',
      tipo: '',
      presentacion: '',
      unidad_medida: '',
      cantidad_u_m: 0,
      precio_unidad_medida: 0,
      proveedor: '',
    },
  ];

  plantillas: any[] = [];
  descargarArchivo(enlace:string) {
  const link = document.createElement('a');
  link.href = enlace;
  link.download = 'plantilla.pdf'; // nombre sugerido
  link.target = '_blank'; // abre en nueva pestaña
  link.setAttribute('rel', 'noopener noreferrer');
  link.click();
  }

  vistapro: boolean = false;
  ngOnInit(): void {
    this.obtenerpro();
  }
  async cambiarvista(cadena: string) {
    this.vista = cadena;
    if (cadena === 'madera') {
      this.madera = await this.global.getMiMadera();
    }else if(cadena==='plantillas'){
      this.plantillas=await this.global.getMiplantilla()
    }
  }
  async obtenerpro() {
    const cadena = this.local.getItem('key');
    const snapshot = await this.global.getMiPro(cadena, 'productos');
    if (snapshot.exists()) {
      this.productos = [];
      snapshot.forEach((dato) => {
        const item = dato.val();
        item.id = dato.key;
        this.productos.push(item);
      });
    }
  }

  verProducto(producto: any) {
    this.productounico = {};
    this.productounico = this.productos.find((p) => p.id === producto.id);
    console.log(producto.id);
    this.vistapro = true;
  }
  cerra() {
    this.vistapro = false;
  }
  async eliminarProducto(e: any, url: any,nodo:string) {
    if (confirm(`¿Deseas eliminar el producto definitivamente?`)) {
      await this.storage.eliminarImg(url);
      await this.global.remove(e, nodo);
      if(nodo==='plantillas'){
        this.plantillas = this.plantillas?.filter((p) => p.id !== e) || [];
        this.global.setPlantilla(this.plantillas);
      }else{
         this.productos = this.productos?.filter((p) => p.id !== e) || [];
      }
    }
  }

  constructor(
    private alerta: Switalert2Service,
    private global: Realtime,
    private local: StorageService,
    private storage: GlobalbaseService
  ) {}
}
