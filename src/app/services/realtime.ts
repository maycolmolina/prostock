import { Injectable, inject } from '@angular/core';
import { Usuario } from '../objetos';
import { HttpClient } from '@angular/common/http';
import { loginservice } from './login.service';
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
  realtimeUrl = 'https://prostock2025-da706-default-rtdb.firebaseio.com/';
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
    usuario.contrasenia='';
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
