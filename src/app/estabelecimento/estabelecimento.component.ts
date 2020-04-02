import { Component, OnInit, Input } from '@angular/core';

import { Estabelecimento } from '../shared/models/estabelecimento.model';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styleUrls: ['./estabelecimento.component.scss']
})
export class EstabelecimentoComponent implements OnInit {

  @Input() estabelecimento: Estabelecimento;

  constructor() { }

  ngOnInit(): void {
  }

}
