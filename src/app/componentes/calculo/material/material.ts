import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material',
  imports: [],
  templateUrl: './material.html',
  styleUrl: './material.css'
})
export class Material {

  constructor(private ruta:Router){}

  ir(cadena:string){
    this.ruta.navigate([cadena])
  }

}
