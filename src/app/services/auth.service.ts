import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../core/user.service';

@Injectable()
export class AuthGuardComponent implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }
    adminRoutes: Array<any> = ['home', 'pokemon', 'detail'];
    userRoutes: Array<any> = ['product', 'create-product'];
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

        if (this.userService.isAdmin) {
            if (this.adminRoutes.includes(this.router.url)) {
                return true;
            } else {
                this.router.navigate(['home']);
                return false;
            }
        } else {
            if (this.userRoutes.includes(this.router.url)) {
                return true;
            } else {
                this.router.navigate(['product']);
                return false;
            }
        }
    }

}