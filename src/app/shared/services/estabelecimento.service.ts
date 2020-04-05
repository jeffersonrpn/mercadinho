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
export class EstabelecimentoService {

  private url = 'https://spreadsheets.google.com/feeds/cells/1PACqUmv1LzRhw6qria8H3yj2fjkGt9MpHvdOcQhnCb0/2/public/full?alt=json';
  private qtdColunas = 13;

  private estabelecimentos = new BehaviorSubject<any>([]);
  private estabelecimentosFiltrados = new BehaviorSubject<any>([]);

  private filtros = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.estabelecimentos
      .pipe(
        switchMap(estabelecimentos => this.filtros.pipe(
          debounceTime(400),
          map(filtros => this.filtrar(estabelecimentos, filtros))
        ))
        // tap(estabelecimentos => {
        //   return estabelecimentos.sort((a, b) => 1);
        // })
      ).subscribe(data => this.estabelecimentosFiltrados.next(data));
  }

  get(): Observable<any> {
    this.http
      .get<any>(this.url)
      .pipe(
        map(data => {
          const sheet = data.feed.entry;
          const estabelecimentos = [];
          if (sheet && sheet.length > 0) {
            for (let i = this.qtdColunas; i < sheet.length; i = i + this.qtdColunas) {
              const timestamp = sheet[i].gs$cell.inputValue;
              const url = sheet[i + 1].gs$cell.inputValue;
              const nome = sheet[i + 2].gs$cell.inputValue;
              const contato = sheet[i + 5].gs$cell.inputValue;
              const cidade = sheet[i + 10].gs$cell.inputValue;
              const uf = sheet[i + 11].gs$cell.inputValue;
              const categoria = sheet[i + 12].gs$cell.inputValue;

              const estabelecimento = new Estabelecimento(timestamp, url, nome, contato, cidade, uf, categoria);
              estabelecimentos.push(estabelecimento);
            }
          }
          return estabelecimentos;
        }))
      .subscribe(data => this.estabelecimentos.next(data));

    return this.estabelecimentosFiltrados.asObservable();
  }

  filtrar(estabelecimentos: any[], filtro: string): Array<any> {
    return estabelecimentos.filter(e => {
      return (e.nome.toLowerCase().includes(filtro.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()));
    });
  }

  pesquisar(termoPesquisa: string): void {
    this.filtros.next(termoPesquisa);
  }

}
