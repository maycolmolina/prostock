import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Realtime } from '../../services/realtime';
import { GlobalbaseService } from '../../services/storage.service';
import { StorageService } from '../../services/localstorage.service';
import { Switalert2Service } from '../../services/switalert2.service';

@Component({
  selector: 'app-ingreso-cuero',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ingreso-cuero.html',
  styleUrl: './ingreso-cuero.css',
})
export class IngresoCuero {
  tipos = ['Cuero vacuno', 'Cuero caprino', 'Cuero porcino', 'Cuero sintético'];
  calidades = ['Alta', 'Media', 'Baja'];
  unidades = ['kilogramo', 'metro cuadrado', 'pieza'];

  fechaHoy = '';
  Cuero = {
    tipo: '',
    calidad: '',
    unidad_medida: '',
    precio_unidad: null as number | null,
    proveedor: '',
    cantidad: null as number | null,
    id_usuario: '',
  };

  constructor(
    private router: Router,
    private realtime: Realtime,
    private global: GlobalbaseService,
    private local: StorageService,
    private alerta: Switalert2Service
  ) {}

  ngOnInit(): void {
    this.Cuero.id_usuario = this.local.getItem('key');
  }

  async onSubmit() {
    try {
      const id = await this.realtime.bodega(this.Cuero, 'Cuero');
      await this.realtime.bodega(
        {
          id_usuario: this.local.getItem('key'),
          id_pro: id,
          cantidad: this.Cuero.cantidad,
          precio_total:
            (this.Cuero.cantidad ?? 0) * (this.Cuero.precio_unidad ?? 0),
          fecha: this.fechaHoy,
        },
        'compra_Cuero'
      );
      this.alerta.alertaExito('Se ingresó la compra de cuero correctamente.');
      this.resetForm();
    } catch (error) {
      console.error('Error al guardar cuero:', error);
      this.alerta.alertaerror('Hubo un problema al guardar la compra.');
    }
  }

  resetForm(form?: any) {
    if (form) form.resetForm();
    this.Cuero = {
      tipo: '',
      calidad: '',
      unidad_medida: '',
      precio_unidad: null,
      proveedor: '',
      cantidad: null,
      id_usuario: this.local.getItem('key'),
    };
    this.fechaHoy = '';
  }
}
