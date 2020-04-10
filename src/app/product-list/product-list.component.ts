import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  listData: { name: string }[];
  constructor() {}

  /**
   * @ngdoc component
   * @name ngOnInit
   * @memberof ProductListComponent
   *
   * @description
   *
   * This angular life cycle hook used to fetch data from localstorage and render it.
   **/

  ngOnInit() {
    this.listData = JSON.parse(localStorage.getItem('addProductForm'));
  }
}
