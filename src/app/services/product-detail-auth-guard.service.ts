import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../core/user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SYSTEM_CONSTANTS } from '../core/system.constants';

@Injectable()
export class ProductDetailAuthGuardComponent implements CanActivate {
    constructor(private userService: UserService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let name = route.params.name;
        return this.userService.get(`${SYSTEM_CONSTANTS.PRODUCT_DETAIL_URL}${name}`).pipe(
            map(res => {
              this.userService.detailData = res;
              this.userService.shoHideLoader(false);
                return true;
            }),
            catchError((err) => {
              return of(false);
            })
          );
    }
}

