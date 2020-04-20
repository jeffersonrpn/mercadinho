import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { EstabelecimentosComponent } from './estabelecimentos/estabelecimentos.component';
import { DepoimentosComponent } from './depoimentos/depoimentos.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';
import { PrecisaDeUmSiteComponent } from './precisa-de-um-site/precisa-de-um-site.component';
import { QueroFazerParteDaEquipeComponent } from './quero-fazer-parte-da-equipe/quero-fazer-parte-da-equipe.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'lojas',
    component: EstabelecimentosComponent
  },
  {
    path: 'depoimentos',
    component: DepoimentosComponent
  },
  {
    path: 'voluntarios',
    component: VoluntariosComponent
  },
  {
    path: 'precisa-de-um-site',
    component: PrecisaDeUmSiteComponent
  },
  {
    path: 'quero-fazer-parte-da-equipe',
    component: QueroFazerParteDaEquipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
