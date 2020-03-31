import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    public isAdmin: boolean = true;
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }
    get(url): Observable<any> {
        return this.http.get<any>(url)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }
    post(url, data): Observable<any> {
        return this.http.post<any>(url, data)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}



