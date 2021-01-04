import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INota } from '../interfaces/inota';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private httpClient:HttpClient) { }

  deleteProducto(identificador:string):Observable<any>{
    const url = "http://localhost:3000/api/nota/"+ identificador;
    return this.httpClient.delete(url);
  }

  getProductos():Observable<INota[]>{
    const idUsuario="5ff342bd2cae2e29342b4108";
    const url = "http://localhost:3000/api/nota/"+ idUsuario;
    return this.httpClient.get<INota[]>(url);
  }
}
