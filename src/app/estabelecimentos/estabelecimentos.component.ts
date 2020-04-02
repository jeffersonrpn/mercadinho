import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-estabelecimentos',
  templateUrl: './estabelecimentos.component.html',
  styleUrls: ['./estabelecimentos.component.scss']
})
export class EstabelecimentosComponent implements OnInit, OnDestroy {

  public estabelecimentos = [];
  private unsubscribe = new Subject();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getEstabelecimentos();
  }

  getEstabelecimentos() {
    this.apiService
      .getEstabelecimentos()
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
