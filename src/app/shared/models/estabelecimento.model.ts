export class Estabelecimento {
  public timestamp;
  public url;
  public nome;
  public contato;
  public cidade;
  public uf;
  public categoria;

  constructor(timestamp, url, nome, contato, cidade, uf, categoria) {
    this.timestamp = timestamp;
    this.url = url;
    this.nome = nome;
    this.contato = contato;
    this.cidade = cidade;
    this.uf = uf;
    this.categoria = categoria;
  }

}
