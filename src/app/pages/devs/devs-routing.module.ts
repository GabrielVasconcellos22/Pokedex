import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevsPage } from './devs.page';

const routes: Routes = [
  {
    path: '',
    component: DevsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevsPageRoutingModule {}
