import { Component, OnInit } from '@angular/core';
import { UserService } from "../core/user.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  detailData: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.detailData = this.userService.detailData;
  }

}
