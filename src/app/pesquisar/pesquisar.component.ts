import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EstabelecimentoService } from '../shared/services/estabelecimento.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.scss']
})
export class PesquisarComponent implements OnInit {

  public termoPesquisa: string;

  constructor(
    private modalService: NgbModal,
    private estabelecimentoService: EstabelecimentoService) { }

  ngOnInit(): void {
  }

  abrirModal(content) {
    if (!this.modalService.hasOpenModals()) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }
  }

  fecharModal() {
    this.modalService.dismissAll();
  }

  pesquisar() {
    this.estabelecimentoService.pesquisar(this.termoPesquisa);
  }

}
