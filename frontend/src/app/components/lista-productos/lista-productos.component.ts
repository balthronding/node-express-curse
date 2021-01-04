import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProducto } from 'src/app/interfaces/iproducto';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.sass']
})
export class ListaProductosComponent implements OnInit {

  lista: IProducto[];

  constructor(private router:Router) {
    this.lista = [
      {titulo:'producto 1', descripcion:"XXX", idUsuario:"moipin", enlace:'https://www.amazon.es',puntuacion:5},
      {titulo:'producto 2', descripcion:"XXX", idUsuario:"moipin", enlace:'https://www.amazon.es',puntuacion:1},
      {titulo:'producto 3', descripcion:"XXX", idUsuario:"moipin", enlace:'https://www.amazon.es',puntuacion:10},
      {titulo:'producto 4', descripcion:"XXX", idUsuario:"moipin", enlace:'https://www.amazon.es',puntuacion:10},
      {titulo:'producto 5', descripcion:"XXX", idUsuario:"moipin", enlace:'https://www.amazon.es',puntuacion:1},
      {titulo:'producto 6', descripcion:"XXX", idUsuario:"moipin", enlace:'https://www.amazon.es',puntuacion:5},
      {titulo:'producto 7', descripcion:"XXX", idUsuario:"moipin", enlace:'https://www.amazon.es',puntuacion:5},
    ]
  }

  ngOnInit(): void {
  }

  addProducto(): void{
    this.router.navigate(['anadir-producto'])
  }
}
