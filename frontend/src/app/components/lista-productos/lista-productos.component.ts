import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INota } from 'src/app/interfaces/inota';
import { NotasService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.sass']
})
export class ListaNotasComponent implements OnInit {

  lista: INota[];

  constructor(private router: Router, private productoService: NotasService) {

  }

  ngOnInit(): void {
    this.productoService.getNotas().subscribe(notas => this.lista = notas);
  }

  addProducto(): void {
    this.router.navigate(['anadir-producto']);
  }

  editarProducto(identificador: string): void {
    this.router.navigate(['anadir-producto'], {
      queryParams: {
        identificador: identificador
      }
    });
  }

  deleteProducto(identificador: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta entrada?')) {
      this.productoService.deleteNota(identificador).subscribe(t => this.deleteFromLista(identificador));
    }
  }

  private deleteFromLista(identificador: string): void {
    this.lista = this.lista.filter((v, i, a) => v._id != identificador);
  }

}
