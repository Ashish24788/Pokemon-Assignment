import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../core/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  inputData = '';
  public showTab: boolean;
  constructor(private router: Router, private UserService: UserService) {
    this.showTab = UserService.isAdmin;
   }

  search() {
    if (this.inputData.length >= 3) {
      this.router.navigate(['/detail/', this.inputData]);
    }
  }
}
