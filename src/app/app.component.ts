import { Component, ViewChild, ElementRef } from '@angular/core';
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
  showAlertFlag = false;
  alertMessage: any = {};
  private sampleNotification: any = {
    type: 'danger'
  };
  notificationConfig: any = {};
  notificationTimeOut: any;
  // @ViewChild('alert', { static: true }) alert: ElementRef;
  constructor(private userService: UserService, private alertService: AlertService) {
    this.alertService.getAlert().pipe(
      delay(SYSTEM_CONSTANTS.DELAY_TIME)
    ).subscribe(data => {
      this.alertMessage = data;
      this.notificationConfig = {...this.sampleNotification, ...data, ...{show: true}};
      // this.alert.nativeElement.classList.add(SYSTEM_CONSTANTS.FADE_IN_CLASS);
      clearTimeout(this.notificationTimeOut);
      this.notificationTimeOut = setTimeout(() => {
        this.closeAlert();
      }, SYSTEM_CONSTANTS.ALERT_FADE_OUT_TIME);

    });
    this.userService
      .getLoader().pipe(
        delay(SYSTEM_CONSTANTS.DELAY_TIME)
      )
      .subscribe((res) => (this.showLoaderImage = res));
  }

  closeAlert = () => {
    this.notificationConfig.show = false;
    // this.alert.nativeElement.classList.remove(SYSTEM_CONSTANTS.FADE_IN_CLASS);
  }
}
