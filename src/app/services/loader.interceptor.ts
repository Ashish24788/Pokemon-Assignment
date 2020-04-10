import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { UserService } from '../core/user.service';
import { AlertService } from '../core/alert.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}

  /**
   * @ngdoc service
   * @name intercept
   * @memberof LoaderInterceptor
   * @param {object} req HttpRequest Data
   * @param {object} next HttpHandler Data
   * @returns {object} return response/error
   *
   * @description
   *
   * This function is used add loader during api calls
   * This function also used to catch error during api calls such as 404 error
   **/

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.userService.showLoader(true);
    return next.handle(req).pipe(
      finalize(() => this.userService.showLoader(false)),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.alertService.showAlert({ text: err.error });
          } catch (e) {
            this.alertService.showAlert({ text: err.error });
          }
        }
        return of(err);
      })
    );
  }
}
