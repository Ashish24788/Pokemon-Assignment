/**
 * Pokemon detail model have data model for pokemon Details
 */
export class PokemonDetail {
  species: {
    url: string;
  };
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  speciesData: {
    capture_rate: boolean;
    gender_rate: boolean;
    egg_groups: [];
    hatch_counter: boolean;
    evolution_chain: {
      url: '';
    };
  };
  evolutionData: {
    name: string;
    level: boolean;
    imageURL: string;
  };
  abilities: [];
  stats: [];
  id: boolean;
  name: string;
  sprites: {};
  types: [];
  height: number;
  weight: number;
  generaObject: {
    genus: string;
  };
  flavorObject: {
    flavor_text: string;
  };
  damageData: {
    string?: boolean;
  };
}
