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
  filtro: string = '';
  productounico: any;
  productos: any[] = [];
  vistapro: boolean = false;
  ngOnInit(): void {
    this.obtenerpro();
  }

  async obtenerpro() {
    const cadena = this.local.getItem('key');
    const snapshot = await this.global.getMiPro(cadena);
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
  async eliminarProducto(e: any, url: any) {
    if (confirm(`¿Deseas eliminar el producto definitivamente?`)) {
      console.log(url);
      await this.storage.eliminarImg(url);
      await this.global.remove(e, 'productos');
      this.productos = this.productos?.filter((p) => p.id !== e) || [];
    }
  }

  constructor(
    private alerta: Switalert2Service,
    private global: Realtime,
    private local: StorageService,
    private storage: GlobalbaseService
  ) {}
}
