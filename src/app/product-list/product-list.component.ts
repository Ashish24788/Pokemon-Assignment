import { Component, OnInit } from '@angular/core';
import { BaseService } from "../core/base.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  url: string = 'https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0';
  listData: any;
  navigateToDetail: boolean = false;

  constructor(private baseService: BaseService, private router: Router) {
    this.navigateToDetail = this.router.url === '/home';
   }

  ngOnInit() {
    this.baseService.get(this.url).subscribe(
      res => {
        this.listData = res.results;
        console.log('HTTP response', res);
      },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    );
  }

}
