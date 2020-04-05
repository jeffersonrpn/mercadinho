import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstabelecimentosComponent } from './estabelecimentos/estabelecimentos.component';
import { EstabelecimentoComponent } from './estabelecimento/estabelecimento.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DepoimentosComponent } from './depoimentos/depoimentos.component';
import { DepoimentoComponent } from './depoimento/depoimento.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';

@NgModule({
  declarations: [
    AppComponent,
    EstabelecimentosComponent,
    EstabelecimentoComponent,
    PesquisarComponent,
    NavbarComponent,
    DepoimentosComponent,
    DepoimentoComponent,
    VoluntariosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
