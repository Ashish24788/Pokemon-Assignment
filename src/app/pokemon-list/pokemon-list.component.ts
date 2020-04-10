import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { PokemonList } from './../models/pokemon/pokemon-list.model';
import { SYSTEM_CONSTANTS } from 'src/app/core/system.constants';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  url = SYSTEM_CONSTANTS.POKEMON_LIST_URL + '30&offset=0';
  nextLoading = false;
  previousLoading = false;
  pokemonList: PokemonList;

  constructor(private userService: UserService) {}

  /**
   * @ngdoc component
   * @name ngOnInit
   * @memberof PokemonListComponent
   *
   * @description
   *
   * This function calls getPokemonData method and pass url in parameter.
   **/

  ngOnInit() {
    this.getPokemonData(this.url);
  }

  /**
   * @ngdoc component
   * @name getPokemonData
   * @memberof PokemonListComponent
   * @param {string} url to get pokemon list data
   *
   * @description
   *
   * This function is used to get pokemon list data from api call and get response with name and url and render it to ui.
   **/

  getPokemonData = (url) => {
    this.userService
      .get(url)
      .pipe(
        finalize(() => {
          this.nextLoading = false;
          this.previousLoading = false;
        })
      )
      .subscribe((res: PokemonList) => {
        this.pokemonList = res;
      });
  };
}
