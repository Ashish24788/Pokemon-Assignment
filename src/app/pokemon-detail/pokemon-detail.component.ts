import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { PokemonDetail } from './../models/pokemon/pokemon-detail.model';
import { SYSTEM_CONSTANTS } from 'src/app/core/system.constants';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetail: PokemonDetail;

  constructor(private userService: UserService) {}

  /**
   * @ngdoc component
   * @name ngOnInit
   * @memberof PokemonDetailComponent
   *
   * @description
   *
   * In this angular life cycle method store data in pokemonDetail variable call function to get upcoming values.
   **/

  ngOnInit(): void {
    this.pokemonDetail = this.userService.detailData;
    if (this.pokemonDetail.species && this.pokemonDetail.species.url) {
      this.getSpeciesData();
      this.getDamageData();
    }
  }

  /**
   * @ngdoc component
   * @name getSpeciesData
   * @memberof PokemonDetailComponent
   *
   * @description
   *
   * This Function receive response for species data from api call and set value into related variables.
   * This function also check evolution_chain.url value and call getEvolutionChainData function with url as input parameter.
   **/

  getSpeciesData = () => {
    this.userService.get(this.pokemonDetail.species.url).subscribe((res) => {
      this.pokemonDetail.speciesData = res;
      this.pokemonDetail.flavorObject =
        res.flavor_text_entries.find((ob) => ob.language.name === 'en') || {};
      this.pokemonDetail.generaObject =
        res.genera.find((ob) => ob.language.name === 'en') || {};
      if (
        this.pokemonDetail.speciesData.evolution_chain &&
        this.pokemonDetail.speciesData.evolution_chain.url
      ) {
        this.getEvolutionChainData(
          this.pokemonDetail.speciesData.evolution_chain.url
        );
      }
    });
  };

  /**
   * @ngdoc component
   * @name getDamageData
   * @memberof PokemonDetailComponent
   *
   * @description
   *
   * This Function receive response for damage data from api call and set value into related array and pass it to ui.
   **/

  getDamageData = () => {
    this.pokemonDetail.damageData = {};
    forkJoin(
      this.pokemonDetail.moves.map((ob) => this.userService.get(ob.move.url))
    ).subscribe((res) => {
      res.forEach((ob: any) => {
        this.pokemonDetail.damageData[ob.damage_class.name] = true;
      });
    });
  };

  /**
   * @ngdoc component
   * @name getEvolutionChainData
   * @memberof PokemonDetailComponent
   * @param {string} url to hit api and get relevent data.
   *
   * @description
   *
   * This function used to hit url and get character named response which have relevent information to hit next api.
   * By hitting one more api using evolutionData.name as parameter in api.
   * Get All data and pass them to ui for rendering.
   **/

  getEvolutionChainData = (url) => {
    this.pokemonDetail.evolutionData = undefined;
    this.userService
      .get(url)
      .pipe(
        mergeMap((character) => {
          character =
            character &&
            character.chain &&
            character.chain.evolves_to &&
            character.chain.evolves_to[0];
          if (character) {
            this.pokemonDetail.evolutionData = {
              name: character.species.name,
              level:
                character &&
                character.evolution_details &&
                character.evolution_details[0] &&
                character.evolution_details[0].min_level,
              imageURL: '',
            };
            return this.userService.get(
              SYSTEM_CONSTANTS.PRODUCT_DETAIL_URL +
                this.pokemonDetail.evolutionData.name
            );
          }
        })
      )
      .subscribe((ob) => {
        this.pokemonDetail.evolutionData.imageURL = ob.sprites.front_default;
      });
  };
}
