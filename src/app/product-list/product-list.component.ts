import { Component, OnInit } from '@angular/core';
// import { BaseService } from "../core/base.service";
// import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  listData: any;
  constructor() {}

  ngOnInit() {
    this.listData = JSON.parse(localStorage.getItem('addProductForm'));
  }
}
