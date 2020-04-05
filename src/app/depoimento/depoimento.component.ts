import { Component, Input } from '@angular/core';

import { Depoimento } from '../shared/models/depoimento.model';

@Component({
  selector: 'app-depoimento',
  templateUrl: './depoimento.component.html',
  styleUrls: ['./depoimento.component.scss']
})
export class DepoimentoComponent {

  @Input() depoimento: Depoimento;

  constructor() { }

}
