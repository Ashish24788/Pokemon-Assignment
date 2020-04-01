import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  inputData = '';
  constructor(private router: Router) { }

  search() {
    if (this.inputData.length >= 3) {
      this.router.navigate(['/detail/', this.inputData]);
    }
  }
}
