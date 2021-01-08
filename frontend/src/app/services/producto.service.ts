import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { INota } from '../interfaces/inota';
import { IResponse } from '../interfaces/iresponse';
import { IUser } from '../interfaces/iuser';
import { AbstractRequestServiceService } from './abstract-request-service.service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService extends AbstractRequestServiceService {

  private user: IUser;
  private token: string;

  constructor(private httpClient: HttpClient, private accountService: AccountService) {
    super();
    this.accountService.getUser().subscribe(user =>
      this.user = user);
    this.accountService.getToken().subscribe(token =>
      this.token = token);
  }

  deleteNota(identificador: string): Observable<any> {
    const url = this.getBaseURL() + "/api/nota/" + identificador;
    return this.httpClient.delete(url, {
      headers: this.getHeaders(this.token)
    });
  }

  getNotas(): Observable<INota[]> {
    const idUsuario = this.getIdUser();
    const url = this.getBaseURL() + "/api/nota/" + idUsuario;
    return this.httpClient.get<INota[]>(url, {
      headers: this.getHeaders(this.token)
    });
  }

  altaNota(nota: INota): Observable<IResponse> {
    nota.idUsuario = this.getIdUser();
    const url = this.getBaseURL() + "/api/nota/";
    return this.httpClient.post<IResponse>(url, nota, {
      headers: this.getHeaders(this.token)
    });
  }

  modificarNota(nota: INota): Observable<IResponse> {
    nota.idUsuario = this.getIdUser();
    const url = this.getBaseURL() + "/api/nota/" + nota._id;
    return this.httpClient.put<IResponse>(url, nota, {
      headers: this.getHeaders(this.token)
    });
  }

  private getIdUser(): string {
    if(!this.user){
      this.accountService.getUser();
      this.accountService.getToken();
    }
    return this.user.idUsuario;
  }
}
