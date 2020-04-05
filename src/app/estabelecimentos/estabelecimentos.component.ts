import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EstabelecimentoService } from '../shared/services/estabelecimento.service';

@Component({
  selector: 'app-estabelecimentos',
  templateUrl: './estabelecimentos.component.html',
  styleUrls: ['./estabelecimentos.component.scss']
})
export class EstabelecimentosComponent implements OnInit, OnDestroy {

  public estabelecimentos = [];
  private unsubscribe = new Subject();

  constructor(private estabelecimentoService: EstabelecimentoService) { }

  ngOnInit(): void {
    this.getEstabelecimentos();
  }

  getEstabelecimentos() {
    this.estabelecimentoService
      .get()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(estabelecimentos => {
        this.estabelecimentos = estabelecimentos;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
