import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/interfaces/iresponse';
import { IUser } from 'src/app/interfaces/iuser';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass']
})
export class UsuarioComponent implements OnInit {

  oculto: boolean = true;
  oculto2: boolean = true;
  form: FormGroup;

  token: string;
  user: IUser;

  constructor(private router: Router, private fb: FormBuilder, private accountService: AccountService) {
    this.form = fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.min(4)]],
      confirm_pass: ['', [Validators.required, Validators.min(4)]]
    })
  }

  ngOnInit(): void {
    this.accountService.getToken().subscribe(token => this.token = token);
    this.accountService.getUser().subscribe(user => {
      this.user = user;
      this.form.setValue({
        nombre: user.nombre,
        email: user.email,
        pass: '',
        confirm_pass: ''
      })
    });

  }

  modificar(): void {
    if (this.form.valid) {
      const user: IUser = { ... this.user, ... this.form.value };
      this.accountService.modificar(user, this.token).subscribe(responseAccount => {
        if (responseAccount.status != 'OK') {
          if (responseAccount.respuestas && responseAccount.respuestas.length > 0) {
            alert(this.parsearRespuestas(responseAccount));
          } else {
            alert(responseAccount.respuesta);
          }
        } else {
          alert(responseAccount.respuesta);
          this.router.navigate(['lista-notas']);
        }
      });

    }
  }

  parsearRespuestas(respuesta: IResponse): string {
    let salida: string = '';
    if (respuesta.respuestas && respuesta.respuestas.length > 0) {
      for (const text of respuesta.respuestas) {
        salida += text.text + '\n';
      }
    }

    return salida;
  }

}
