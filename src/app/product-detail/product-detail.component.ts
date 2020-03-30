import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from "../core/base.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  url: string = "https://pokeapi.co/api/v2/pokemon/";
  detailData: any;
  

  constructor(private route: ActivatedRoute,
    private baseService: BaseService, private router: Router) {
    
  }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name');
    this.baseService.get(`${this.url}${name}`).subscribe(
      res => {
        this.detailData = res;
        console.log('HTTP response', res);
      },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    );
    console.log('detailData', this.detailData)
  }

}
