import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstabelecimentosComponent } from './estabelecimentos/estabelecimentos.component';
import { DepoimentosComponent } from './depoimentos/depoimentos.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';

const routes: Routes = [
  {
    path: '',
    component: EstabelecimentosComponent
  },
  {
    path: 'depoimentos',
    component: DepoimentosComponent
  },
  {
    path: 'voluntarios',
    component: VoluntariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
