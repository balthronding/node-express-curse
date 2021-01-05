import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  oculto: boolean = true;

  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private accountService: AccountService) {
    this.form = fb.group({
      email: ['', [Validators.email, Validators.required]],
      pass: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.form.valid) {
      this.accountService.login(this.form.value).subscribe(responseAccount => {
        if (responseAccount.status != 'OK') {
          alert(responseAccount.respuesta);
        } else {
          this.router.navigate(['lista-notas']);
        }
      });
    }
  }

}
