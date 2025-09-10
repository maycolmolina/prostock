import { Injectable,inject} from '@angular/core';
import { Usuario } from '../objetos';
import { HttpClient } from '@angular/common/http';
import { loginservice } from './login.service';
import { Database, ref, query, orderByChild, equalTo, get, push, set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class Realtime {
    realtimeUrl='https://prostock2025-da706-default-rtdb.firebaseio.com/'
    token='';

    createuser(usuario:Usuario){
      this.token=this.auth.gettoken();
      return this.http.post(this.realtimeUrl+'usuarios.json?auth='+this.token,usuario);
    }

    async correoExiste(correo: string): Promise<boolean> {
    const usuariosRef = ref(this.db, 'usuarios');
    const q = query(usuariosRef, orderByChild('correo'), equalTo(correo));
    const snapshot = await get(q);
    return snapshot.exists(); 
    }




    constructor(private http:HttpClient,private auth:loginservice,private db:Database){}
    
}
