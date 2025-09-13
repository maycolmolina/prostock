import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Realtime } from '../../services/realtime';

@Component({
  selector: 'app-marketplace',
  imports: [FormsModule],
  templateUrl: './marketplace.html',
  styleUrl: './marketplace.css',
})
export class Marketplace implements OnInit{
  placeholder = 'https://via.placeholder.com/600x400?text=No+image';
  q = '';
  categoriaFiltro = '';
  productoSeleccionado: any | null = null;
  productos: any[] = [];
  get categorias() {
    const s = new Set<string>();
    this.productos.forEach((p) => s.add(p.categoria));
    return Array.from(s);
  }
  productosFiltrados() {
    const q = this.q.trim().toLowerCase();
    return this.productos.filter((p) => {
      const matchQ =
        !q || p.nombre.toLowerCase().includes(q) || (p.proveedor || '').toLowerCase().includes(q);
      const matchCat = !this.categoriaFiltro || p.categoria === this.categoriaFiltro;
      return matchQ && matchCat;
    });
  }

  verProducto(p: any) {
    this.productoSeleccionado = p;
  }


  comprarAhora(p: any) {
    alert(`Comprar ahora: ${p.nombre}`);
  }
  ngOnInit(): void {
    this.obtenerpro();
  }
  constructor(
    private global:Realtime
  ){}
  async obtenerpro() {
    const snapshot = await this.global.getProductos();
    if (snapshot.exists()) {
      this.productos = [];
      snapshot.forEach((dato) => {
        const item = dato.val();
        item.id = dato.key;
        this.productos.push(item);
      });
    }
  }
}
