import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Estabelecimento } from '../shared/models/estabelecimento.model';
import { EstabelecimentoService } from '../shared/services/estabelecimento.service';
import { CarregandoService } from '../shared/services/carregando.service';

@Component({
  selector: 'app-estabelecimentos',
  templateUrl: './estabelecimentos.component.html',
  styleUrls: ['./estabelecimentos.component.scss']
})
export class EstabelecimentosComponent implements OnInit, OnDestroy {

  public estabelecimentos = [];
  public estabelecimentoSelecionado = new Estabelecimento('', '', '', '', '', '', '', '');
  private unsubscribe = new Subject();

  constructor(
    private modalService: NgbModal,
    private estabelecimentoService: EstabelecimentoService,
    public carregandoService: CarregandoService) { }

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

  open(content, estabelecimento) {
    this.estabelecimentoSelecionado = estabelecimento;
    this.modalService.open(content, {ariaLabelledBy: 'modal-estabelecimento-title'});
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
