import { Component } from '@angular/core';
import { UserService } from './core/user.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-assignment';
  showLoaderImage = false;

  constructor(private userService: UserService) {
    this.userService
      .getLoader().pipe(
        delay(0)
      )
      .subscribe((res) => (this.showLoaderImage = res));
  }
}
