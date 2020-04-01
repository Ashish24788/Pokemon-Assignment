import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

    private dataSource = new BehaviorSubject<boolean>(false);
    data = this.dataSource.asObservable();

    public isAdmin = true;
    public detailData: any;
    private loader = new Subject<boolean>();
    getLoader(): Observable<boolean> {
        return this.loader.asObservable();
    }
    showLoader(data: boolean) {
        this.loader.next(data);
    }

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
        // this.shoHideLoader(false);
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

}
