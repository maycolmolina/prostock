import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-marketprincipal',
  imports: [RouterLink, NgClass],
  templateUrl: './marketprincipal.html',
  styleUrl: './marketprincipal.css'
})
export class Marketprincipal {
  vista='desc'
  plantillas: any[] = [
    {
      nombre: 'Plantilla Optimizada Camiseta Básica',
      descripcion: 'esta plantilla es para hacer una camiseta que te quede mas piola de lo que te imaginas',
      categoria: 'Textil',
      descargasTotales: 245,
      gratis: false,
      precio: 29.99,
      urlFile: 'https://miweb.com/plantillas/camiseta-basica.pdf',
      idUser: 1
    },
    {
      nombre: 'Guía Completa Acabados Madereros',
      descripcion: 'Técnicas profesionales de acabado, fórmulas de barnices y tiempos de secado optimizados.',
      categoria: 'Madera',
      descargasTotales: 189,
      gratis: false,
      precio: 34.99,
      urlFile: 'https://miweb.com/plantillas/guia-madera.pdf',
      idUser: 2
    },
    {
      nombre: 'Plantillas Básicas Marroquinería',
      descripcion: 'Pack inicial con patrones para carteras, cinturones y fundas. Ideal para emprendedores.',
      categoria: 'Cuero',
      descargasTotales: 512,
      gratis: true,
      precio: 0,
      urlFile: 'https://miweb.com/plantillas/marroquineria.pdf',
      idUser: 3
    }
  ];

  cambiar_vista(cadena:string){
    this.vista=cadena
  }


}
