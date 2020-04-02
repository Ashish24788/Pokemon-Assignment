import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  response: any = {};
  flavorObject: any = {};
  generaObject: any = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.response = this.userService.detailData || {};
    if (this.response.species && this.response.species.url) {
      this.getSpeciesData();
    }
  }

  getSpeciesData() {
    this.userService.get(this.response.species.url).subscribe(res => {
      // this.speciesData = res;
      this.flavorObject = res.flavor_text_entries.find(ob => ob.language.name === 'en') || {};
      this.generaObject = res.genera.find(ob => ob.language.name === 'en') || {};
    });
  }

}
