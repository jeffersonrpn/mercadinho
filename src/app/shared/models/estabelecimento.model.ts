export class Estabelecimento {
  public url;
  public nome;
  public contato;
  public cidade;
  public uf;
  public endereco;
  public categoria;

  constructor(url, nome, contato, cidade, uf, endereco, categoria) {
    this.url = url;
    this.nome = nome;
    this.contato = contato;
    this.cidade = cidade;
    this.uf = uf;
    this.endereco = endereco;
    this.categoria = categoria;
  }

}
