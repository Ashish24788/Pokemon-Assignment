import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  response: any = {};
  flavorObject: any = {};
  generaObject: any = {};
  speciesData: any = {};
  damageData: any = {};
  evolutionData: any = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.response = this.userService.detailData || {};
    if (this.response.species && this.response.species.url) {
      this.getSpeciesData();
      this.getDamageData();
    }
  }

  getSpeciesData() {
    this.userService.get(this.response.species.url).subscribe(res => {
      this.speciesData = res;
      this.flavorObject = res.flavor_text_entries.find(ob => ob.language.name === 'en') || {};
      this.generaObject = res.genera.find(ob => ob.language.name === 'en') || {};
      if (this.speciesData.evolution_chain && this.speciesData.evolution_chain.url) {
        this.getEvolutionChainData(this.speciesData.evolution_chain.url);
      }
    });
  }

  getDamageData() {
    this.damageData = {};
    this.response.moves.map((data) => {
      this.userService.get(data.move.url).subscribe(res => {
        this.damageData[res.damage_class.name] = true;
      });
    });
  }

  getEvolutionChainData(url) {
    this.evolutionData = {};
    this.userService
      .get(url)
      .pipe(mergeMap(character => {
        character = character && character.chain && character.chain.evolves_to && character.chain.evolves_to[0];
        if (character) {
          this.evolutionData.name = character.species.name;
          this.evolutionData.level = character &&
                                    character.evolution_details &&
                                    character.evolution_details[0] &&
                                    character.evolution_details[0].min_level;
          return this.userService.get('https://pokeapi.co/api/v2/pokemon/' + this.evolutionData.name);
        }
      })).subscribe(ob => {
        this.evolutionData.imageURL = ob.sprites.front_default;
      });
  }

}
