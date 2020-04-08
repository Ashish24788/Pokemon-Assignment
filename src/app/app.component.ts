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
  @ViewChild('alert', { static: true }) alert: ElementRef;
  constructor(private userService: UserService, private alertService: AlertService) {
    this.alertService.getAlert().pipe(
      delay(SYSTEM_CONSTANTS.DELAY_TIME)
    ).subscribe(data => {
      this.alertMessage = data;
      setTimeout(() => {
        this.closeAlert();
      }, SYSTEM_CONSTANTS.ALERT_FADE_OUT_TIME);

    });
    this.userService
      .getLoader().pipe(
        delay(SYSTEM_CONSTANTS.DELAY_TIME)
      )
      .subscribe((res) => (this.showLoaderImage = res));
  }

  closeAlert() {
      // this.alert.nativeElement.classList.remove(SYSTEM_CONSTANTS.FADE_IN_CLASS);
  }
}
