import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { loginservice } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private auntenticar:loginservice){
    auntenticar.login();
  }

}
