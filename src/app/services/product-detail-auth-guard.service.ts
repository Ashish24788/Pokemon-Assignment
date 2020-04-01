import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../core/user.service';
import { Observable, of } from 'rxjs';
import { SYSTEM_CONSTANTS } from '../core/system.constants';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ProductDetailAuthGuardComponent implements CanActivate {
  constructor(private userService: UserService) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return Observable.create(observer => {
      this.userService.showLoader(true);
      this.userService.get(SYSTEM_CONSTANTS.PRODUCT_DETAIL_URL + route.params.name)
        .pipe(finalize(() => {
          this.userService.showLoader(false);
        })).subscribe(res => {
          if (res != null) {
            this.userService.detailData = res;
            observer.next(true);
            observer.complete();
          }
        });
    });
  }
}
