import { Injectable } from '@angular/core';
import { Usuario } from '../objetos';
import { Switalert2Service } from '../services/switalert2.service';
import { StorageService } from '../services/localstorage.service';
import {
  remove,
  Database,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  push,
  set,
} from '@angular/fire/database';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class Realtime {
  token = '';

  async remove(key: string, nodo: string) {
    const referencia = ref(this.db, nodo + '/' + key);
    await remove(referencia)
      .then(() => {
        this.alerta.alertaExito('Producto eliminado correctamente');
      })
      .catch((error) => {
        this.alerta.alertaerror('Error al eliminar el producto:');
      });
  }
  mandarPro(pro: any) {
    const productosRef = ref(this.db, 'productos');
    const newRef = push(productosRef);
    return set(newRef, pro);
  }
  async bodega(pro: any, nodo: string) {
    try {
      const productosRef = ref(this.db, nodo);
      const newRef = push(productosRef);
      await set(newRef, pro);
      return newRef.key;
    } catch (error) {
      console.error('Error al guardar producto:', error);
      return '';
    }
  }
  // __________________________________funcion para obtener la plantillas__________________

  plantillas: Array<any> = [];
  async getPlantillas() {
    if (this.plantillas.length != 0) {
      return this.plantillas;
    }
    const referencia = ref(this.db, 'plantillas');
    const consulta = query(referencia);
    const snap = await get(consulta);
    if (snap.exists()) {
      snap.forEach((shild) => {
        const plantilla = shild.val();
        plantilla.id = shild.key;
        this.plantillas.push(plantilla);
      });
    }
    return this.plantillas;
  }

  // __________________________________funcion para obtener la plantillas__________________

  async createuser(usuario: Usuario) {
    try {
      const userc = await createUserWithEmailAndPassword(
        this.auth,
        usuario.correo,
        usuario.contrasenia
      );

      const uid = userc.user.uid;
      const usuarioref = ref(this.db, 'usuarios/' + uid);

      await set(usuarioref, usuario);

      this.alerta.alertaExito('El usuario ha sido registrado correctamente');
      usuario.contrasenia = '';
      this.local.setItem('user', usuario);
      this.local.setItem('key', uid);
      this.ruta.navigate(['perfil']);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.alerta.alertaerror('El correo ya está registrado, intenta iniciar sesión.');
          break;
        case 'auth/invalid-email':
          this.alerta.alertaerror('Por favor ingresa un correo válido.');
          break;
        case 'auth/weak-password':
          this.alerta.alertaerror('La contraseña debe tener al menos 6 caracteres.');
          break;
        default:
          this.alerta.alertaerror('Ocurrió un error: ' + error.message);
          break;
      }
    }
  }
  getMiPro(idavisitar: string, nodo: string) {
    const referencia = ref(this.db, nodo);
    const consulta = query(referencia, orderByChild('idUsuario'), equalTo(idavisitar));
    return get(consulta);
  }
  // obtener mis productos de realtima de ser necesario__________________
  Misproductos: Array<any> = [];
  async getMiProducto() {
    if (this.Misproductos.length != 0) {
      return this.Misproductos;
    }
    const mikey = this.local.getItem('key');
    const referencia = ref(this.db, 'productos');
    const consulta = query(referencia, orderByChild('idUsuario'), equalTo(mikey));
    const snap = await get(consulta);

    if (snap.exists()) {
      snap.forEach((shild) => {
        const pro = shild.val();
        pro.id = shild.key;
        this.Misproductos.push(pro);
      });
    }
    return this.Misproductos;
  }

  // obtenr madera que esta en mi bodega_________________________
  maderas: Array<any> = [];
  cueros: Array<any> = [];

  async getMiBod(nodo: string) {
    if (nodo === 'Madera') {
      if (this.maderas.length != 0) {
        return this.maderas;
      }
    } else if (nodo === 'Cuero') {
      if (this.cueros.length != 0) {
        return this.cueros;
      }
    }
    const mikey = this.local.getItem('key');
    const referencia = ref(this.db, nodo);
    const consulta = query(referencia, orderByChild('id_usuario'), equalTo(mikey));
    const snap = await get(consulta);

    if (snap.exists()) {
      snap.forEach((shild) => {
        if (nodo === 'Madera') {
          const madera = shild.val();
          madera.id = shild.key;
          this.maderas.push(madera);
        } else if (nodo === 'Cuero') {
          const cuero = shild.val();
          cuero.id = shild.key;
          this.cueros.push(cuero);
        }
      });
    }
    if (nodo === 'Madera') {
      return this.maderas;
    } else if (nodo === 'Cuero') {
      return this.cueros;
    } else {
      return [];
    }
  }
  // obtener unicamente mis plantillas publicadas_________________________
  Misplantillas: Array<any> = [];

  setPlantilla(plantill: any) {
    this.Misplantillas = [];
    this.Misplantillas = plantill;
  }
  async getMiplantilla() {
    if (this.Misplantillas.length != 0) {
      return this.Misplantillas;
    }
    const mikey = this.local.getItem('key');
    const referencia = ref(this.db, 'plantillas');
    const consulta = query(referencia, orderByChild('idUsuario'), equalTo(mikey));
    const snap = await get(consulta);

    if (snap.exists()) {
      snap.forEach((shild) => {
        const plantilla = shild.val();
        plantilla.id = shild.key;
        this.Misplantillas.push(plantilla);
      });
    }
    return this.Misplantillas;
  }

  // fin de obtener el resgistro de ventas de bodega_________________________

  compras: Array<any> = [];
  async obtenerventas() {
    if (this.compras.length != 0) {
      return this.compras;
    }
    try {
      // obtengo mi id
      const mikey = this.local.getItem('key');
      const referencia = ref(this.db, 'compra_Madera');
      const consulta = query(referencia, orderByChild('id_usuario'), equalTo(mikey));
      const snap = await get(consulta);
      if (snap.exists()) {
        const ventasArray: any = [];
        snap.forEach((shildsnap) => {
          ventasArray.push(shildsnap.val());
        });
        for (const venta of ventasArray) {
          const maderaRef = ref(this.db, `Madera/${venta.id_pro}`);
          const snapMadera = await get(maderaRef);

          if (snapMadera.exists()) {
            const madera = snapMadera.val();

            const compraunica = {
              tipo: madera.tipo,
              cantidad_actual: madera.cantidad_u_m,
              proveedor: madera.proveedor,
              presentacion: madera.presentacion,
              precioTotal: venta.precio_total,
              fecha: venta.fecha,
              cantidad_comprada: venta.cantidad,
              unidad_medida: madera.unidad_medida,
            };
            this.compras.push(compraunica);
          } else {
            console.log('No se encontró la madera');
          }
        }
      }
    } finally {
      return this.compras;
    }
  }

  compras_c: Array<any> = [];
  async obtenerventasCuero() {
    if (this.compras_c.length != 0) {
      return this.compras_c;
    }
    try {
      // obtengo mi id
      const mikey = this.local.getItem('key');
      const referencia = ref(this.db, 'compra_Cuero');
      const consulta = query(referencia, orderByChild('id_usuario'), equalTo(mikey));
      const snap = await get(consulta);
      if (snap.exists()) {
        const ventasArray: any = [];
        snap.forEach((shildsnap) => {
          ventasArray.push(shildsnap.val());
        });
        for (const venta of ventasArray) {
          const cueroref = ref(this.db, `Cuero/${venta.id_pro}`);
          const snapCuero = await get(cueroref);

          if (snapCuero.exists()) {
            const Cuero = snapCuero.val();
            const compraunica = {
              tipo: Cuero.tipo,
              cantidad_actual: Cuero.cantidad,
              proveedor: Cuero.proveedor,
              calidad: Cuero.calidad,
              precioTotal: venta.precio_total,
              fecha: venta.fecha,
              cantidad_comprada: venta.cantidad,
              unidad_medida: Cuero.unidad_medida,
            };
            this.compras_c.push(compraunica);
          } else {
            console.log('No se encontró la madera');
          }
        }
      }
    } finally {
      return this.compras_c;
    }
  }

  // __________________________________________________________________

  getProductos(nodo: string) {
    const referencia = ref(this.db, nodo);
    return get(referencia);
  }
  async obtenerusuario(correo: string): Promise<any> {
    const usuariosRef = ref(this.db, 'usuarios');
    const q = query(usuariosRef, orderByChild('correo'), equalTo(correo));
    const snapshot = await get(q);
    return snapshot;
  }

  async getUsuarioPorId(idUsuario: string) {
    const referencia = ref(this.db, 'usuarios/' + idUsuario);
    const snapshot = await get(referencia);
    return snapshot;
  }

  constructor(
    private ruta: Router,
    private db: Database,
    private alerta: Switalert2Service,
    private local: StorageService,
    private auth: Auth
  ) {}
}
