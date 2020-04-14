import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EstabelecimentoService } from '../shared/services/estabelecimento.service';
import { Cidade } from '../shared/models/cidade.model';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.scss']
})
export class PesquisarComponent implements OnInit {

  public termoPesquisa: string;
  public exibirBtnPesquisa: boolean;
  public cidades: Cidade[];
  private unsubscribe = new Subject();

  constructor(
    private modalService: NgbModal,
    private estabelecimentoService: EstabelecimentoService) { }

  ngOnInit(): void {
    this.exibirBtnPesquisa = true;
    this.getCidades();
  }

  getCidades() {
    this.estabelecimentoService
      .getCidades()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(cidades => {
        this.cidades = cidades;
      });
  }

  abrirModal(content) {
    if (!this.modalService.hasOpenModals()) {
      console.log('abriu');

      this.exibirBtnPesquisa = false;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result
        .then(result => {
          this.exibirBtnPesquisa = true;
        })
        .catch(err => {
          this.exibirBtnPesquisa = true;
        });
    }
  }

  fecharModal() {
    this.exibirBtnPesquisa = true;
    this.modalService.dismissAll();
  }

  pesquisar() {
    this.estabelecimentoService.pesquisar(this.termoPesquisa);
  }

}
