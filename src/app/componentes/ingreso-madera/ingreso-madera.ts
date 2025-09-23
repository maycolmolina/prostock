import { Component } from '@angular/core';
import { Realtime } from '../../services/realtime';
import { Router } from '@angular/router';
import { GlobalbaseService } from '../../services/storage.service';
import { StorageService } from '../../services/localstorage.service';
import { Switalert2Service } from '../../services/switalert2.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingreso-madera',
  imports: [FormsModule],
  templateUrl: './ingreso-madera.html',
  styleUrl: './ingreso-madera.css'
})
export class IngresoMadera {
  presentaciones = ['2x2', '2x4', 'tablones','viga'];
  tipos = ['cedro', 'Caoba', 'Pino','wanacaste'];
  unidades = ['metro', 'pie', 'pulgada'];
  fechahoy=''
  imag: File | undefined;
  Madera = {
    tipo: '',
    presentacion: '',
    unidad_medida: '',
    precio_unidad_medida: null as number | null,
    proveedor:'',
    cantidad_u_m: null as number | null,
    id_usuario:'',
  };

  // funciones de la clase

  async onSubmit() {
    try{
      const id=await this.realtime.bodega(this.Madera,'Madera');
      await this.realtime.bodega(
        {
          id_usuario:this.local.getItem('key'),
          id_pro:id,
          cantidad:this.Madera.cantidad_u_m,
          precio_total:(this.Madera.cantidad_u_m ?? 0) * (this.Madera.precio_unidad_medida ?? 0),
          fecha:this.fechahoy
        },
        'compra_Madera'
      )
      this.alerta.alertaExito('se ingreso tu compra a bodega correctamente');

    }catch{
      
    }
    
  }

  resetForm(form: any) {
    form.resetForm();
    this.Madera = {
    tipo: '',
    presentacion: '',
    unidad_medida: '',
    precio_unidad_medida: null as number | null,
    proveedor:'',
    cantidad_u_m: null as number | null,
    id_usuario:this.local.getItem('key')
    }
  }
 

  ngOnInit(): void {
    this.Madera = {
    tipo: '',
    presentacion: '',
    unidad_medida: '',
    precio_unidad_medida: null as number | null,
    proveedor:'',
    cantidad_u_m: null as number | null,
    id_usuario:this.local.getItem('key')
    }
  }
  constructor(private ruta:Router, private realtime:Realtime, private global:GlobalbaseService,private local:StorageService,private alerta:Switalert2Service){}

}
