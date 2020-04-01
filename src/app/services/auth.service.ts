import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../core/user.service';

@Injectable()
export class AuthGuardComponent implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }
    adminRoutes: Array<any> = ['/product', '/create-product'];
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

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
