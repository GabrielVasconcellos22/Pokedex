import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevsPageRoutingModule } from './devs-routing.module';

import { DevsPage } from './devs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevsPageRoutingModule
  ],
  declarations: [DevsPage]
})
export class DevsPageModule {}
