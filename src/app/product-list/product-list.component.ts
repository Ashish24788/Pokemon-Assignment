import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  listData: any;
  constructor() {}

  ngOnInit() {
    this.listData = JSON.parse(localStorage.getItem('addProductForm'));
  }
}
