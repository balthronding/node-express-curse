import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { IResponse } from "../interfaces/iresponse";

export abstract class AbstractRequestServiceService {
  readonly BASE_URL: string = 'http://balthronding.myds.me:3000';

  constructor() { }

  protected tratarError<T>(obsService: Subject<IResponse>): (err: any, caught: Observable<T>) => Observable<never> {
    return e => {
      const responseBody: IResponse = {
        status: '',
        respuesta: ''
      };
      if (e.error instanceof ErrorEvent) {
        responseBody.status = (e.error as ErrorEvent).type;
        responseBody.respuesta = (e.error as ErrorEvent).message;
        obsService.next(responseBody);
      } else if (e.error.status) {
        obsService.next((e.error as IResponse));
      } else {
        responseBody.status = (e as HttpErrorResponse).statusText;
        responseBody.respuesta = (e as HttpErrorResponse).message;
        obsService.next(responseBody);
      }
      return throwError('Error');
    };
  }

  protected getBaseURL(): string {
    return this.BASE_URL;
  }

  protected getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Bearer ' + token });
  }
}
