import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  inputData:string;
  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
  }

  search() {
    if(this.inputData.length>=3) {
      this.userService.shoHideLoader(true);
      this.router.navigate(['/detail/', this.inputData]);
    } else {
      //show error messages
    }
  }

}
