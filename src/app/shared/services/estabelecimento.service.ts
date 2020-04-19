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
import { Cidade } from '../models/cidade.model';
import { CarregandoService } from './carregando.service';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  private url = 'https://spreadsheets.google.com/feeds/cells/1PACqUmv1LzRhw6qria8H3yj2fjkGt9MpHvdOcQhnCb0/2/public/full?alt=json';
  private qtdColunas = 14;
  private valorVazio = '-'; // Importante para filtrar células vazias

  private estabelecimentos = new BehaviorSubject<any>([]);
  private estabelecimentosFiltrados = new BehaviorSubject<any>([]);
  private cidades = new BehaviorSubject<any>([]);

  private filtros = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private carregandoService: CarregandoService) {
    this.estabelecimentos
      .pipe(
        switchMap(estabelecimentos =>
          this.filtros.pipe(
            debounceTime(400),
            map(filtros => this.filtrar(estabelecimentos, filtros))
          )),
        tap(estabelecimentos => {
          return estabelecimentos.sort((a, b) => this.ordenar(a, b));
        })
      ).subscribe(data => {
        this.carregandoService.estaCarregando = false;
        this.estabelecimentosFiltrados.next(data);
      });
  }

  get(): Observable<any> {
    this.carregandoService.estaCarregando = true;
    this.http
      .get<any>(this.url)
      .pipe(
        map(data => {
          const sheet = data.feed.entry;
          const estabelecimentos = [];
          let cidades = [];
          if (sheet && sheet.length > 0) {
            for (let i = this.qtdColunas; i < sheet.length; i = i + this.qtdColunas) {
              const timestamp = sheet[i].gs$cell.inputValue;
              const url = sheet[i + 1].gs$cell.inputValue;
              const nome = sheet[i + 2].gs$cell.inputValue;
              const contato = sheet[i + 5].gs$cell.inputValue;
              const cidade = sheet[i + 10].gs$cell.inputValue;
              const uf = sheet[i + 11].gs$cell.inputValue;
              const categoria = sheet[i + 12].gs$cell.inputValue;
              const img = sheet[i + 13].gs$cell.inputValue;

              estabelecimentos.push(new Estabelecimento(timestamp, url, nome, contato, cidade, uf, categoria, img));
              if (cidade !== this.valorVazio) {
                cidades.push(new Cidade(cidade, uf));
              }
            }
          }
          // Remove cidades duplicadas
          cidades = cidades
            .filter((item, i, arr) => arr
              .findIndex(t => (t.nome === item.nome && t.uf === item.uf)) === i);
          // Ordena estabelicimentos
          return { estabelecimentos, cidades };
        }),
        tap(data => {
          return data.estabelecimentos.sort((a, b) => {
            // if (a.uf === b.uf) {
            //   return a.cidade - b.cidade;
            // }
            return b.nome - a.nome;
          });
        }))
      .subscribe(data => {
        this.carregandoService.estaCarregando = false;
        this.estabelecimentos.next(data.estabelecimentos);
        this.cidades.next(data.cidades);
      });

    return this.estabelecimentosFiltrados.asObservable();
  }

  getCidades() {
    return this.cidades.asObservable();
  }

  filtrar(estabelecimentos: any[], filtros: any): Array<any> {
    const termo = filtros.termo;
    const cidade = filtros.cidade;

    return estabelecimentos.filter(e => {
      let filtrado: boolean;

      filtrado = cidade && cidade.nome !== '-'
        ? (e.cidade.nome.toLowerCase() === cidade.nome.toLowerCase() && e.cidade.uf.toLowerCase() === cidade.uf.toLowerCase())
        : true;

      filtrado = termo && filtrado
        ? (e.nome.toLowerCase().includes(termo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()))
        : filtrado;

      return filtrado;
    });
  }

  pesquisar(filtros: any): void {
    this.carregandoService.estaCarregando = true;
    this.filtros.next(filtros);
  }

  ordenar(a: Estabelecimento, b: Estabelecimento) {
    if (a.cidade.uf === b.cidade.uf) {
      if (a.cidade < b.cidade) {
        return -1;
      }
      if (b.cidade < a.cidade) {
        return 1;
      }
      return 0;
    } else {
      if (a.cidade.uf < b.cidade.uf) {
        return -1;
      }
      if (b.cidade.uf < a.cidade.uf) {
        return 1;
      }
      return 0;
    }
  }

}
