import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-menu-navegacion',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './menu-navegacion.html',
  styleUrl: './menu-navegacion.css'
})
export class MenuNavegacion {


  constructor(private local:StorageService){}

  islogin(){
    if(this.local.getItem('user')!== null){
      return true
    }else{
      return false
    }
  }

}
