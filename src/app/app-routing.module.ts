import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstabelecimentosComponent } from './estabelecimentos/estabelecimentos.component';

const routes: Routes = [
  {
    path: '',
    component: EstabelecimentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
