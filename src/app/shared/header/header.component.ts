import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../core/user.service';
import { AlertService } from './../../core/alert.service';
import {
  STATIC_CONSTANTS,
  VALIDATION_MSG,
} from 'src/app/core/system.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  inputData = '';
  showTab: boolean;
  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.showTab = userService.isAdmin;
  }

  /**
   * @ngdoc component
   * @name search
   * @memberof HeaderComponent
   *
   * @description
   *
   * This function is used to search the value entered in search box.
   * firstly it check the input value
   * If value is greater then given constant redirect page to searched product detail
   * otherwise error message comes for min length
   * if we enter any wrong character then not found error comes from api.
   **/

  search = () => {
    if (this.inputData.length >= STATIC_CONSTANTS.MIN_LENGTH_FOR_SEARCH) {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/detail/', this.inputData]));
    } else {
      this.alertService.showAlert({ text: VALIDATION_MSG.MIN_LENGTH_ERROR });
    }
  };
}
