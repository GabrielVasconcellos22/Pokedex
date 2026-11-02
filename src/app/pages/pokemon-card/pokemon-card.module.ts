import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonCardPageRoutingModule } from './pokemon-card-routing.module';

import { PokemonCardPage } from './pokemon-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonCardPageRoutingModule
  ],
  declarations: [PokemonCardPage]
})
export class PokemonCardPageModule {}
