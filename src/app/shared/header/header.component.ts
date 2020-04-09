import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../core/user.service';
import { AlertService } from './../../core/alert.service';
import { SYSTEM_CONSTANTS, VALIDATION_MSG } from 'src/app/core/system.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  inputData = '';
  showTab: boolean;
  constructor(private router: Router, private UserService: UserService, private alertService: AlertService) {
    this.showTab = UserService.isAdmin;
  }
  search = () => {
    if (this.inputData.length >= 3) {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/detail/', this.inputData]));
    } else {
      this.alertService.showAlert({text: VALIDATION_MSG.MIN_LENGTH_ERROR});
    }
  }
}
