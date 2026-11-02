export interface Pokemon {
    name: string;
    image: string;
    id: number;
    types: Type[];
    height: string;
    weight: string;
    cries: string;
    description: string;
}

export enum Type {
    grass = 'grass',
    poison = 'poison',
    ghost = 'ghost',
    flying = 'flying',
    dragon = 'dragon',
    bug = 'bug',
    fire = 'fire'   
}

export function leadingZero(str: string | number, size = 3): string {
    let s = String(str);

    while (s.length < (size || 2)) {
        s = '0' + s;
    }

    return s;

}

export function getPokemonNumber(pokemon: Pokemon): string {
    return leadingZero(pokemon.id);
}

export function getPokemonImage(pokemon: Pokemon): string {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getPokemonNumber(pokemon)}.png`;
}

export function makeCry(pokemon: Pokemon){
    let audio = new Audio();
    audio.src = pokemon.cries;
    audio.load();
    audio.play();
  }