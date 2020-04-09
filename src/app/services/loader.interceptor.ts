import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { UserService } from '../core/user.service';
import { AlertService } from '../core/alert.service';
import { VALIDATION_MSG, SYSTEM_CONSTANTS } from '../core/system.constants';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private userService: UserService, private alertService:AlertService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.userService.showLoader(true);
        return next.handle(req).pipe(
            finalize(() => this.userService.showLoader(false)),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    try {
                        this.alertService.showAlert({text: err.error});
                    } catch (e) {
                        this.alertService.showAlert({text: err.error});
                    }
                    //log error 
                }
                return of(err);
                // return throwError(err.error);
            }));

    }
}
