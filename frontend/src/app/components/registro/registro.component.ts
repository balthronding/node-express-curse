import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass']
})
export class RegistroComponent implements OnInit {

  oculto: boolean = true;
  oculto2: boolean = true;

  form: FormGroup;


  constructor(private router: Router, private fb: FormBuilder, private accountService: AccountService) {
    this.form = fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.min(4)]],
      confirm_pass: ['', [Validators.required, Validators.min(4)]]
    })
  }

  ngOnInit(): void {
  }

  registro(): void {
    if (this.form.valid) {
      this.accountService.registro(this.form.value).subscribe(responseAccount => {
        if (responseAccount.status != 'OK') {
          alert(responseAccount.respuesta);
        } else {
          alert(responseAccount.respuesta);
          this.router.navigate(['login']);
        }
      });

    }
  }
}
