import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INota } from 'src/app/interfaces/inota';
import { NotasService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-anadir-producto',
  templateUrl: './anadir-producto.component.html',
  styleUrls: ['./anadir-producto.component.sass']
})
export class AnadirNotaComponent implements OnInit {

  form: FormGroup;
  nota: INota;

  constructor(private fb: FormBuilder, private notasService: NotasService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      enlace: ['', Validators.required],
      precio: [''],
      puntuacion: ['']
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const idNota = params.identificador;
      if (idNota) {
        this.notasService.getNotas().subscribe(notas => {
          for (const nota of notas) {
            if (nota._id == idNota) {
              this.nota = nota;
              this.form.setValue({
                titulo: nota.titulo,
                descripcion: nota.descripcion,
                enlace: nota.enlace,
                precio: nota.precio,
                puntuacion: nota.puntuacion
              });
            }
          }
        });
      }
    });
  }

  grabarNota(): void {
    if (this.nota) {
      this.actualizarNota();
    } else {
      this.altaNota();
    }
  }

  actualizarNota(): void {
    if (this.form.valid) {
      const nota: INota = { ...this.nota, ...this.form.value as INota };
      this.notasService.modificarNota(nota).subscribe(notas => {
        alert('Nota actualizada');
        this.router.navigate(['lista-notas']);
      });

    }
  }

  altaNota(): void {
    if (this.form.valid) {
      this.notasService.altaNota(this.form.value).subscribe(notas => {
        alert('Nota creada');
        this.router.navigate(['lista-notas']);
      });

    }
  }

}
