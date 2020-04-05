import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Voluntario } from '../models/voluntario.model';


@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {

  private url = 'https://spreadsheets.google.com/feeds/cells/1PACqUmv1LzRhw6qria8H3yj2fjkGt9MpHvdOcQhnCb0/4/public/full?alt=json';
  private qtdColunas = 1;

  private voluntarios = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    this.http
      .get<any>(this.url)
      .pipe(
        map(data => {
          const sheet = data.feed.entry;
          const voluntarios = [];
          if (sheet && sheet.length > 0) {
            for (let i = this.qtdColunas; i < sheet.length; i = i + this.qtdColunas) {
              const nome = sheet[i].gs$cell.inputValue;

              const voluntario = new Voluntario(nome);
              voluntarios.push(voluntario);
            }
          }
          return voluntarios;
        }))
      .subscribe(data => this.voluntarios.next(data));

    return this.voluntarios.asObservable();
  }

}
