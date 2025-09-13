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

  async createuser(usuario: Usuario) {
    if (this.token === '') {
      this.token = await this.auth.login();
    }
    return this.http.post(this.realtimeUrl + 'usuarios.json?auth=' + this.token, usuario).subscribe(
      (RES) => {
        this.alerta.alertaExito('el usuario ha sido registrado correctamente');
        this.local.setItem('user', usuario);
        this.local.setItem('key', Object.values(RES)[0]);
        this.ruta.navigate(['perfil']);
      },
      () => {
        this.alerta.alertaerror('vaya parece que ha ocirrido un error');
      }
    );
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

  async correoExiste(correo: string): Promise<boolean> {
    const usuariosRef = ref(this.db, 'usuarios');
    const q = query(usuariosRef, orderByChild('correo'), equalTo(correo));
    const snapshot = await get(q);
    return snapshot.exists();
  }

  async obtenerusuario(correo: string): Promise<any> {
    const usuariosRef = ref(this.db, 'usuarios');
    const q = query(usuariosRef, orderByChild('correo'), equalTo(correo));
    const snapshot = await get(q);
    return snapshot;
  }

  mandarPro(pro: any) {
    const productosRef = ref(this.db, 'productos');
    const newRef = push(productosRef);
    return set(newRef, pro);
  }

  constructor(
    private ruta: Router,
    private http: HttpClient,
    private auth: loginservice,
    private db: Database,
    private alerta: Switalert2Service,
    private local: StorageService
  ) {}
}
