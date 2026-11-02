import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon, getPokemonImage, getPokemonNumber, makeCry } from 'src/app/interface/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.page.html',
  styleUrls: ['./pokemon-card.page.scss'],
})
export class PokemonCardPage implements OnInit {

  pokemon: Pokemon | undefined;

  constructor(private route: ActivatedRoute,private router: Router, private pokemonService:PokemonService) { }

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.pokemonService.getPokemonById(id).subscribe(result => {
      const flavorText = result.species.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
      this.pokemon = {
        id: result.id,
        name: result.name,
        image: result.sprites.front_default,
        types: result.types.map((t: {type: {name: any}}) => t.type.name),
        height: result.height,
        weight: result.weight,
        cries: result.cries?.latest || 'N/A',
        description: flavorText ? flavorText.flavor_text: 'No description'
      };
    });
  }

  goToPreviousPokemon(){
    if (this.pokemon && this.pokemon.id > 1) {
      const previousId = this.pokemon.id - 1;
      this.router.navigate(['/pokemon-card', previousId]).then(() => {
        this.loadPokemon();
      });
    }
  }

  goToNextPokemon(){
    if (this.pokemon) {
      const nextId = this.pokemon.id + 1;
      this.router.navigate(['/pokemon-card', nextId]).then(() => {
        this.loadPokemon();
      });
    }
  }


  public makeCry = makeCry;
  public getPokemonNumber = getPokemonNumber;
  public getPokemonImage = getPokemonImage;
}
