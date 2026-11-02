import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, switchMap, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor(private httpClient: HttpClient) {}

  getPokemon(limit: number = 20, offset: number = 0): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    return this.httpClient.get<any>(this.pokemonUrl, { params }).pipe(
      map((response) => response.results),
      switchMap(results => {
        const requests = results.map((result: any) => this.httpClient.get(result.url));
        return forkJoin(requests);
      })
      );
  }

  getPokemonById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.pokemonUrl}${id}`).pipe(
      switchMap(pokemon => {
        return this.httpClient.get<any>(`${this.speciesUrl}${id}`).pipe(
          map(species => ({ ...pokemon, species}))
        );
      }),
      map((result: any) => {
        const flavorText = result.species.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
        return {
          ...result,
          description: flavorText ? flavorText.flavor_text: ' No description'
        };
      })
    );
  }

  searchPokemon(term: string): Observable<any> {
    return this.httpClient.get<any>(`${this.pokemonUrl}${term.toLowerCase()}`)
  }

}
