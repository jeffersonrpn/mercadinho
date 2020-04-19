import { Cidade } from './cidade.model';

export class Estabelecimento {
  public timestamp;
  public url;
  public nome;
  public contato;
  public cidade;
  public categoria;
  public img;

  constructor(timestamp, url, nome, contato, cidade, uf, categoria, img) {
    this.timestamp = timestamp;
    this.url = url;
    this.nome = nome;
    this.contato = contato;
    this.cidade = new Cidade(cidade, uf);
    this.categoria = categoria;
    this.img = img;
  }

  getImg(): string {
    return 'https://res.cloudinary.com/jeffersonrpn/image/upload/mercadinho/' + this.img;
  }

}
