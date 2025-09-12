import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Database,  equalTo, get, getDatabase, orderByChild, query, ref,push,set } from 'firebase/database';
import { Switalert2Service } from './switalert2.service';
import { getStorage, ref as refernecia, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable()
export class GlobalbaseService {

    
  constmibase:string="https://prostock2025-da706-default-rtdb.firebaseio.com/"

  realtime:Database=getDatabase()

  async repairData (data:any) {
    try {
        var datagood :any= [];
        data.forEach((dato:any) => {
            const key = dato.key;
            let datolisto = dato.val();
            datolisto.id = key;
            datagood.push(datolisto);
        });
        return datagood;
    } catch (error) {
        throw new Error('Error procesando datos: ' + error);
    }
  };
  getMiPro(idavisitar:string){
    const referencia=ref(this.realtime,'proventa')
    const consulta=query(referencia,orderByChild('id_propietario'),equalTo(idavisitar));
    return get(consulta);
  }

  
  async uploadfile(imag:File){
    try{
      const storag = getStorage();
      const nombreimg:string=this.generarNombreAleatorio();
      const referencia =refernecia(storag, 'productosimg/' + nombreimg);
      await uploadBytes(referencia, imag);
      return await getDownloadURL(referencia);
    }catch(e){
      console.error(e);
      this.alerta.alertaerror('vaya parece que ha ocurrido un error al subir tu imagen');
      return e;
    }
  }
  generarNombreAleatorio(): string {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    let nombreAleatorio = '';
    // Genera 20 letras aleatorias
    for (let i = 0; i < 30; i++) {
      const letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));
      nombreAleatorio += letraAleatoria;
    }
    // Genera 2 números aleatorios
    for (let i = 0; i < 5; i++) {
      const numeroAleatorio = numeros.charAt(Math.floor(Math.random() * numeros.length));
      nombreAleatorio += numeroAleatorio;
    }
    return nombreAleatorio;
  }

  constructor(private ruta : Router,private Httpservice:HttpClient,private alerta:Switalert2Service){}
}



