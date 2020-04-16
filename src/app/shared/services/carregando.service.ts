import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarregandoService {

  private carregando: boolean;

  constructor() { }

  get estaCarregando(): boolean {
    return this.carregando;
  }

  set estaCarregando(value: boolean) {
    this.carregando = value;
  }

}
