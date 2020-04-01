import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  url = 'https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0';
  respose: {
    count: number;
    next: string;
    previous: string;
    results: {
      name: string;
      url: string
    }[]
  };
  nextLoading = false;
  previousLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getPokemonData(this.url);
  }

  getPokemonData(url) {
    this.userService.get(url).subscribe(
      res => this.respose = res,
      err => console.log('HTTP Error', err),
      () => {
        this.nextLoading = false;
        this.previousLoading = false;
        console.log('HTTP request completed.');
      }
    );
  }
}
