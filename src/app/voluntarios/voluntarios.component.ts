import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VoluntarioService } from '../shared/services/voluntario.service';
import { CarregandoService } from '../shared/services/carregando.service';

@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.component.html',
  styleUrls: ['./voluntarios.component.scss']
})
export class VoluntariosComponent implements OnInit, OnDestroy {

  public voluntarios = [];
  private unsubscribe = new Subject();

  constructor(
    private voluntarioService: VoluntarioService,
    public carregandoService: CarregandoService) { }

  ngOnInit(): void {
    this.getVoluntarios();
  }

  getVoluntarios() {
    this.voluntarioService
      .get()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(voluntarios => {
        this.voluntarios = voluntarios;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
