import { inject, Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class loginservice{
tok='';
private auth=inject(Auth);
 constructor(){
    this.login();
 }

 async login(){
    const usercredential=signInWithEmailAndPassword(this.auth,"maycolmolinaarka12@gmail.com","12345678");
    const user=(await usercredential).user;
    const token=(await user.getIdToken()).toString();
    this.tok=token;
 }
 gettoken(){
    return this.tok;
 }

}