import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstabelecimentosComponent } from './estabelecimentos/estabelecimentos.component';
import { DepoimentosComponent } from './depoimentos/depoimentos.component';

const routes: Routes = [
  {
    path: '',
    component: EstabelecimentosComponent
  },
  {
    path: 'depoimentos',
    component: DepoimentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
