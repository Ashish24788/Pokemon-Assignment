import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  limit = 30;
  totalCount = 0;
  totalPage = 1;
  currentPage = 1;
  url = 'https://pokeapi.co/api/v2/pokemon/?limit=' + this.limit + '&offset=';
  listData: {
    name: string;
    url: string
  }[] = [];
  jsonData: any = {};

  constructor(private userService: UserService, private router: Router) {
   }

  ngOnInit() {
    this.getPokemonData();
  }

  getPokemonData() {
    if (this.jsonData[this.currentPage]) {
      this.listData = this.jsonData[this.currentPage];
      return;
    }
    this.userService.get(this.url + (this.currentPage - 1)).subscribe(
      res => {
        this.totalCount = res.count;
        this.totalPage = Math.ceil(this.totalCount / this.limit);
        this.jsonData[this.currentPage] = res.results;
        this.listData = res.results;
      },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    );
  }

  back() {
    --this.currentPage;
    this.getPokemonData();
  }

  next() {
    ++this.currentPage;
    this.getPokemonData();
  }

}
