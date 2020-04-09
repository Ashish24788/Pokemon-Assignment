import { Component } from '@angular/core';
import { UserService } from './core/user.service';
import { delay } from 'rxjs/operators';
import { AlertService } from './core/alert.service';
import { SYSTEM_CONSTANTS } from './core/system.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-assignment';
  showLoaderImage = false;
  alertMessage: any = {};
  private sampleNotification: any = {
    type: 'danger',
  };
  notificationConfig: any = {};
  notificationTimeOut: any;
  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.alertService.message
      .pipe(delay(SYSTEM_CONSTANTS.DELAY_TIME))
      .subscribe((data) => {
        this.alertMessage = data;
        this.notificationConfig = {
          ...this.sampleNotification,
          ...data,
          ...{ show: true },
        };
        clearTimeout(this.notificationTimeOut);
        this.notificationTimeOut = setTimeout(() => {
          this.closeAlert();
        }, SYSTEM_CONSTANTS.ALERT_FADE_OUT_TIME);
      });
    this.userService
      .getLoader()
      .pipe(delay(SYSTEM_CONSTANTS.DELAY_TIME))
      .subscribe((res) => (this.showLoaderImage = res));
  }

  /**
   * @ngdoc component
   * @name closeAlert
   * @memberof AppComponent
   *
   * @description
   *
   * It use to close the bootstrap alert by setting value to false.
   **/

  closeAlert = () => {
    this.notificationConfig.show = false;
  };
}
