import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

export class ProductListGuard implements CanActivate {
  constructor() {}

  /**
   * @ngdoc service
   * @name canActivate
   * @memberof ProductListGuard
   * @param {object} route ActivatedRouteSnapshot data
   * @returns {boolean} return true/false
   *
   * @description
   *
   * This function is used check the auth guard if any data exist in localstorage it will open otherwise not
   **/

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      localStorage.getItem('addProductForm') &&
      localStorage.getItem('addProductForm').length
    ) {
      return true;
    }
    return false;
  }
}
