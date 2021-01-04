import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INota } from 'src/app/interfaces/inota';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.sass']
})
export class ListaProductosComponent implements OnInit {

  lista: INota[];

  constructor(private router: Router, private productoService: ProductoService) {
    this.lista = [
      { _id: '1', titulo: 'producto 1', descripcion: "XXX", idUsuario: "moipin", enlace: 'https://www.amazon.es', puntuacion: 5 },
      { _id: '1', titulo: 'producto 2', descripcion: "XXX", idUsuario: "moipin", enlace: 'https://www.amazon.es', puntuacion: 1 },
      { _id: '1', titulo: 'producto 3', descripcion: "XXX", idUsuario: "moipin", enlace: 'https://www.amazon.es', puntuacion: 10 },
      { _id: '1', titulo: 'producto 4', descripcion: "XXX", idUsuario: "moipin", enlace: 'https://www.amazon.es', puntuacion: 10 },
      { _id: '1', titulo: 'producto 5', descripcion: "XXX", idUsuario: "moipin", enlace: 'https://www.amazon.es', puntuacion: 1 },
      { _id: '1', titulo: 'producto 6', descripcion: "XXX", idUsuario: "moipin", enlace: 'https://www.amazon.es', puntuacion: 5 },
      { _id: '1', titulo: 'producto 7', descripcion: "XXX", idUsuario: "moipin", enlace: 'https://www.amazon.es', puntuacion: 5 },
    ]

    productoService.getProductos().subscribe(notas => this.lista = notas);
  }

  ngOnInit(): void {
  }

  addProducto(): void {
    this.router.navigate(['anadir-producto']);
  }

  editarProducto(identificador: string): void {

  }

  deleteProducto(identificador: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta entrada?')) {
      this.productoService.deleteProducto(identificador).subscribe(t => this.deleteFromLista(identificador));
    }
  }

  private deleteFromLista(identificador: string): void {
    this.lista = this.lista.filter((v, i, a) => v._id != identificador);
  }

}
