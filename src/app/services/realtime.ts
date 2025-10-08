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

  getMiPro(idavisitar: string) {
    const referencia = ref(this.db, 'productos');
    const consulta = query(referencia, orderByChild('idUsuario'), equalTo(idavisitar));
    return get(consulta);
  }
  maderas: Array<any> = [];
  async getMiMadera() {
    if (this.maderas.length != 0) {
      return this.maderas;
    }
    const mikey = this.local.getItem('key');
    const referencia = ref(this.db, 'Madera');
    const consulta = query(referencia, orderByChild('id_usuario'), equalTo(mikey));
    const snap = await get(consulta);
    if (snap.exists()) {
      snap.forEach((shild) => {
        const madera = shild.val();
        madera.id = shild.key;
        this.maderas.push(madera);
      });
    }
    return this.maderas;
  }

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

  getProductos() {
    const referencia = ref(this.db, 'productos');
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
