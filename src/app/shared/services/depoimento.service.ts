import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Depoimento } from '../models/depoimento.model';

@Injectable({
  providedIn: 'root'
})
export class DepoimentoService {

  private url = 'https://spreadsheets.google.com/feeds/cells/1PACqUmv1LzRhw6qria8H3yj2fjkGt9MpHvdOcQhnCb0/3/public/full?alt=json';
  private qtdColunas = 3;

  private depoimentos = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    this.http
      .get<any>(this.url)
      .pipe(
        map(data => {
          const sheet = data.feed.entry;
          const depoimentos = [];
          if (sheet && sheet.length > 0) {
            for (let i = this.qtdColunas; i < sheet.length; i = i + this.qtdColunas) {
              const autor = sheet[i + 1].gs$cell.inputValue;
              const texto = sheet[i + 2].gs$cell.inputValue;

              const depoimento = new Depoimento(autor, texto);
              depoimentos.push(depoimento);
            }
          }
          return depoimentos;
        }))
      .subscribe(data => this.depoimentos.next(data));

    return this.depoimentos.asObservable();
  }

}
