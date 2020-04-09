/**
 * Pokemon list model have data model for pokemon list
 */
export class PokemonList {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}
