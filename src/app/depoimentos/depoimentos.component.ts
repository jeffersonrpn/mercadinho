import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DepoimentoService } from '../shared/services/depoimento.service';
import { CarregandoService } from '../shared/services/carregando.service';

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.scss']
})
export class DepoimentosComponent implements OnInit, OnDestroy {

  public depoimentos = [];
  private unsubscribe = new Subject();

  constructor(
    private depoimentosService: DepoimentoService,
    public carregandoService: CarregandoService) { }

  ngOnInit(): void {
    this.getDepoimentos();
  }

  getDepoimentos() {
    this.depoimentosService
      .get()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(depoimentos => {
        this.depoimentos = depoimentos;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
