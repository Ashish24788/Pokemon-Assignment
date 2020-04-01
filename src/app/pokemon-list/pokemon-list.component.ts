import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { finalize } from 'rxjs/internal/operators/finalize';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  url = 'https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0';
  response: {
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
    this.userService.get(url)
    .pipe(finalize(() => {
      this.nextLoading = false;
      this.previousLoading = false;
    })).subscribe(res => this.response = res);
  }
}
