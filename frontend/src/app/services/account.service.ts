import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILogin } from '../interfaces/ilogin';
import { IResponse } from '../interfaces/iresponse';
import { IResponseAccount } from '../interfaces/iresponse-account';
import { IUser } from '../interfaces/iuser';
import { AbstractRequestServiceService } from './abstract-request-service.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends AbstractRequestServiceService {

  private tokenSource: ReplaySubject<string> = new ReplaySubject<string>(1);
  private tokenObservable: Observable<string> = this.tokenSource.asObservable();

  private userSource: ReplaySubject<IUser> = new ReplaySubject<IUser>(1);
  private userObservable: Observable<IUser> = this.userSource.asObservable();

  constructor(private httpClient: HttpClient) {
    super();
  }

  login(login: ILogin): Observable<IResponse> {
    const url = this.getBaseURL()+'/api/login/';
    const obsService = new Subject<IResponse>();
    const response: Observable<IResponseAccount> = this.httpClient.post<IResponseAccount>(url, login).pipe<IResponseAccount>(catchError(this.tratarError<IResponseAccount>(obsService)));


    response.subscribe(responseAccount => {
      this.tokenSource.next(responseAccount.token);
      this.userSource.next(responseAccount.usuario);
      obsService.next(responseAccount);
    })

    return obsService.asObservable();
  }

  registro(usuario: IUser): Observable<IResponse> {
    const url = this.getBaseURL()+'/api/usuarios/';
    const obsService = new Subject<IResponse>();
    const response: Observable<IResponseAccount> = this.httpClient.post<IResponseAccount>(url, usuario).pipe<IResponseAccount>(catchError(this.tratarError<IResponseAccount>(obsService)));


    response.subscribe(responseAccount => {
      this.tokenSource.next(responseAccount.token);
      this.userSource.next(responseAccount.usuario);
      obsService.next(responseAccount);
    })

    return obsService.asObservable();
  }

  getToken(): Observable<string> {
    return this.tokenObservable;
  }

  getUser(): Observable<IUser> {
    return this.userObservable;
  }


}



