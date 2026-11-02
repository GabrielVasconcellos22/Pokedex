import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonCardPage } from './pokemon-card.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonCardPageRoutingModule {}
