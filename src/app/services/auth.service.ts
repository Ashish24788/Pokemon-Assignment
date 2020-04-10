import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../core/user.service';

@Injectable()
export class AuthGuardComponent implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  adminRoutes: Array<string> = ['/product-list', '/create-product'];

  /**
   * @ngdoc service
   * @name canActivate
   * @memberof AuthGuardComponent
   * @param {object} route ActivatedRouteSnapshot data
   * @param {object} state RouterStateSnapshot data
   * @returns {boolean} return true/false
   *
   * @description
   *
   * This function is used check the auth guard for application and check the permission
   * isAdmin flag decides which nav menu shows in header
   **/

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.isAdmin) {
      return true;
    } else if (this.adminRoutes.includes(state.url)) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}
