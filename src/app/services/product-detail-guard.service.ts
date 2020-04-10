import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../core/user.service';
import { Observable, of } from 'rxjs';
import { SYSTEM_CONSTANTS } from '../core/system.constants';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ProductDetailGuard implements CanActivate {
  constructor(private userService: UserService) {}

  /**
   * @ngdoc service
   * @name canActivate
   * @memberof ProductDetailGuard
   * @param {object} route ActivatedRouteSnapshot data
   * @returns {boolean} return true/false.
   *
   * @description
   *
   * This function is used check the auth guard for product detail auth guard
   **/

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return Observable.create((observer) => {
      this.userService
        .get(SYSTEM_CONSTANTS.PRODUCT_DETAIL_URL + route.params.name)
        .pipe(finalize(() => {}))
        .subscribe((res) => {
          if (res != null) {
            this.userService.detailData = res;
            observer.next(true);
            observer.complete();
          }
        });
    });
  }
}
