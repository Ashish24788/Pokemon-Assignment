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
  damageData: any = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.response = this.userService.detailData || {};
    console.log(this.response);
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
    this.response.moves.map((data) => {
      this.userService.get(data.move.url).subscribe(res => {
        this.damageData.push(res.damage_class.name);
        // console.log('res', res.damage_class.name);
      });
    })
  }

  getEvolutionChainData(url) {
    const newSpeciesData: any = {};
    this.userService
      .get(url)
      .pipe(mergeMap(character => {
        newSpeciesData['name'] = character.chain.evolves_to[0].species.name;
        newSpeciesData['minLevel'] = character.chain.evolves_to[0].evolution_details[0].min_level;
        return this.userService.get(`https://pokeapi.co/api/v2/pokemon/${newSpeciesData['name']}`);
      })).subscribe(ob => {
        newSpeciesData['imageURL'] = ob.sprites.front_default;
        console.log('newSpeciesData', newSpeciesData);
      });
    // this.userService
    //   .get(url)
    //   .pipe(mergeMap(character =>
    //     this.userService.get(`https://pokeapi.co/api/v2/pokemon/${character.chain.evolves_to[0].species.name}`)))
    //   .subscribe(ob => console.log('sa', ob));
  }

}
