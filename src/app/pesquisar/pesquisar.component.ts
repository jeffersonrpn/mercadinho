import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  public filtros: any;
  public termoPesquisa: string;
  public cidadeSelecionada: string;
  public exibirBtnPesquisa: boolean;
  public cidades: Cidade[];
  public cidadeFiltro: Cidade;
  private unsubscribe = new Subject();

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private estabelecimentoService: EstabelecimentoService) { }

  ngOnInit(): void {
    this.exibirBtnPesquisa = true;
    this.filtros = {
      termo: '',
      cidade: new Cidade('-', '-')
    };
    this.termoPesquisa = '';
    this.cidadeSelecionada = '-,-';
    this.cidadeFiltro = new Cidade('-', '-');
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
    this.filtros = {
      termo: this.termoPesquisa,
      cidade: this.cidadeFiltro
    };
    this.estabelecimentoService.pesquisar(this.filtros);
  }

  irParaResultados() {
    this.router.navigate(['/lojas']);
    this.fecharModal();
  }

  onChangeCidade() {
    const cidade = this.cidadeSelecionada.split(',');
    this.cidadeFiltro = new Cidade(cidade[0], cidade[1]);
    this.pesquisar();
  }

}
