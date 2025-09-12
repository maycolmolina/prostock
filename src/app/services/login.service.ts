import { inject, Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class loginservice{
private auth=inject(Auth);
 constructor(){ }

 async login(){
    const usercredential=signInWithEmailAndPassword(this.auth,"maycolmolinaarka12@gmail.com","12345678");
    const user=(await usercredential).user;
    const token=(await user.getIdToken()).toString();
    return token ;
 }
}