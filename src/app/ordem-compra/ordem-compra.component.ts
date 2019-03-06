import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

  public endereco: string;
  public numero: string;
  public complemento: string;
  public formaPagamento: string;

  constructor() { }

  ngOnInit() {
    // eyms
    this.endereco = '';
    this.numero = '';
    this.complemento = '';
    this.formaPagamento = '';
  }

  public atualizaEndereco(enderecoInput: string): void {
    this.endereco = enderecoInput;
  }

  public atualizaNumero(numeroInput: string): void {
    this.numero = numeroInput;
  }

  public atualizaComplemento(complementoInput: string): void {
    this.complemento = complementoInput;
  }

  public atualizaFormaPagamento(formaPagamentoInput: string): void {
    this.formaPagamento = formaPagamentoInput;
  }
}
