import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotasService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-anadir-producto',
  templateUrl: './anadir-producto.component.html',
  styleUrls: ['./anadir-producto.component.sass']
})
export class AnadirNotaComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private notasService: NotasService) {
    this.form = fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      enlace: ['', Validators.required],
      precio: [''],
      puntuacion: ['']
    })
  }

  ngOnInit(): void {

  }

  altaNota(): void {
    if (this.form.valid) {
      this.notasService.altaNota(this.form.value);
      alert('Nota creada');
    }
  }

}
