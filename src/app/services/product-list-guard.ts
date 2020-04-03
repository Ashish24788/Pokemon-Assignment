import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

export class ProductListGuard implements CanActivate {
  constructor() { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (localStorage.getItem('addProductForm') && (localStorage.getItem('addProductForm').length)) {
        return true;
    }
    return false;
  }
}
