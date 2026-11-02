import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Pokemon } from 'src/app/interface/Pokemon';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  user: any;
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  limit: number = 20;
  offset: number = 0;
  searchTerm$ = new Subject<string>();
  audio = new Audio();
  volLev = 0.2;

  constructor(
    public pokemonService: PokemonService, 
    private router: Router, 
    public authService: AuthService) {
      this.user = authService.getProfile();
      console.log(this.user);
    }

    async logout(){
      this.pauseSong();
      this.authService.signOut().then(()=>{
        this.router.navigate(['/login'])
  
      }).catch((error)=>{
        console.log(error);
      })
    }

  playSong(){
    this.audio.src = "/assets/music.mp3";
    this.audio.volume = this.volLev;
    this.audio.load;
    this.audio.play();
  }

  pauseSong(){
    this.audio.pause();
  }

  toggleSong() {
    if (this.audio.paused) {
      this.playSong();
    } else {
      this.pauseSong();
    }
  }

  ngOnInit() {
    this.loadPokemon();
    this.playSong();
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchPokemon(term);
    });
  }

  loadPokemon(event?: InfiniteScrollCustomEvent) {
    this.pokemonService
      .getPokemon(this.limit, this.offset)
      .subscribe((results: any[]) => {
        results.forEach((result: any) => {
          const pokemon: Pokemon = {
            id: result.id,
            name: result.name,
            image:
              result.sprites.versions['generation-iv']['heartgold-soulsilver']
                .front_default,
            types: result.types.map(
              (t: { type: { name: any } }) => t.type.name
            ),
            height: result.height,
            weight: result.weight,
            cries: result.cries.latest,
            description: ''
          };

          this.pokemons.push(pokemon);
        });

        this.filteredPokemons = [...this.pokemons];

        if (event) {
          event.target.complete();
        }

        this.offset += this.limit;
      });
  }

  loadData(event: any) {
    this.loadPokemon(event);
  }

  goToPokemonCard(id: number) {
    this.router.navigate(['/pokemon-card', id]);
  }

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();
    this.searchTerm$.next(searchTerm)
  }

  searchPokemon(term: string) {
    if (term){
      this.pokemonService.searchPokemon(term).subscribe(result => {
        this.filteredPokemons = [{
          id: result.id,
          name: result.name,
          image: result.sprites.versions['generation-iv']['heartgold-soulsilver']
          .front_default,
        types: result.types.map(
          (t: { type: { name: any } }) => t.type.name
        ),
        height: result.height,
        weight: result.weight,
        cries: result.cries.latest,
        description: ''
        }];
      }, error => {
        this.filteredPokemons = [];
        console.error('Pokemon não encontrado', error);
      });
    } else {
      this.filteredPokemons = [...this.pokemons];
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase().trim();
      this.searchPokemon(searchTerm);
    }
  }
}
