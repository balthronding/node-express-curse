import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass']
})
export class RegistroComponent implements OnInit {

  oculto:boolean = true;
  oculto2:boolean = true;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  registro(): void {
    this.router.navigate(['login']);
  }
}
