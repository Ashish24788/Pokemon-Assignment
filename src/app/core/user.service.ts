import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PokemonDetail } from '../models/pokemon/pokemon-detail.model';

@Injectable()
export class UserService {
  private dataSource = new BehaviorSubject<boolean>(false);
  data = this.dataSource.asObservable();

  isAdmin = true;
  detailData: PokemonDetail;
  private loader = new Subject<boolean>();

  /**
   * @ngdoc service
   * @name getLoader
   * @memberof UserService
   * @returns {boolean} return true/false
   *
   * @description
   *
   * This function is used to get loader.
   **/

  getLoader = (): Observable<boolean> => {
    return this.loader.asObservable();
  };

  /**
   * @ngdoc service
   * @name showLoader
   * @memberof UserService
   * @param {boolean} data boolean value
   *
   * @description
   *
   * This function is used to show loader.
   **/

  showLoader = (data: boolean) => {
    this.loader.next(data);
  };

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * @ngdoc service
   * @name get
   * @memberof UserService
   * @param {string} url url to get value from api call
   * @returns {Observable} returns apiData and use it by using .subscribe method
   *
   * @description
   *
   * This function is used to hit httpRequest and get value and catch error.
   **/

  get = (url): Observable<any> => {
    return this.http.get<any>(url).pipe(retry(1), catchError(this.handleError));
  };

  /**
   * @ngdoc service
   * @name handleError
   * @memberof UserService
   * @param {error} error get error after http request
   * @returns {Function}
   *
   * @description
   *
   * This function is used to get error and show error message whether it is client side or server side.
   **/

  handleError = (error) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  };
}
