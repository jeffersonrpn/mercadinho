import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.scss']
})
export class PesquisarComponent implements OnInit {

  public termoPesquisa: string;

  constructor(
    private modalService: NgbModal,
    private apiService: ApiService) { }

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
    this.apiService.pesquisarEstabelecimentos(this.termoPesquisa);
  }

}
