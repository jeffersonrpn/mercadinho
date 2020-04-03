import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import {
  switchMap,
  map,
  tap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

import { Estabelecimento } from '../models/estabelecimento.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://spreadsheets.google.com/feeds/cells/1EccD5ZVHONpymm_ZtGv7RFxdMAHumcBRnn5NfFunOUo/1/public/full?alt=json';
  private qtdColunas = 7;

  private estabelecimentos = new BehaviorSubject<any>([]);
  private estabelecimentosFiltrados = new BehaviorSubject<any>([]);

  private filtros = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.estabelecimentos
      .pipe(
        switchMap(estabelecimentos => this.filtros.pipe(
          debounceTime(400),
          map(filtros => this.filtrarEstabelecimentos(estabelecimentos, filtros))
        ))
        // tap(estabelecimentos => {
        //   return estabelecimentos.sort((a, b) => 1);
        // })
      ).subscribe(data => this.estabelecimentosFiltrados.next(data));
  }

  getEstabelecimentos(): Observable<any> {
    this.http
      .get<any>(this.url)
      .pipe(
        map(data => {
          const sheet = data.feed.entry;
          const estabelecimentos = [];
          if (sheet && sheet.length > 0) {
            for (let i = this.qtdColunas; i < sheet.length; i = i + this.qtdColunas) {
                const url = sheet[i].gs$cell.inputValue;
                const nome = sheet[i + 1].gs$cell.inputValue;
                const contato = sheet[i + 2].gs$cell.inputValue;
                const cidade = sheet[i + 3].gs$cell.inputValue;
                const uf = sheet[i + 4].gs$cell.inputValue;
                const endereco = sheet[i + 5].gs$cell.inputValue;
                const categoria = sheet[i + 6].gs$cell.inputValue;

                const estabelecimento = new Estabelecimento(url, nome, contato, cidade, uf, endereco, categoria);
                estabelecimentos.push(estabelecimento);
            }
          }
          return estabelecimentos;
        }))
      .subscribe(data => this.estabelecimentos.next(data));

    return this.estabelecimentosFiltrados.asObservable();
  }

  filtrarEstabelecimentos(estabelecimentos: any[], filtro: string): Array<any> {
    return estabelecimentos.filter(e => {
      return (e.nome.toLowerCase().includes(filtro.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()));
    });
  }

  pesquisarEstabelecimentos(termoPesquisa: string): void {
    this.filtros.next(termoPesquisa);
  }

}
