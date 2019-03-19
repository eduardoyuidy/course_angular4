import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

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

  // Controle de validação dos campos
  public enderecoValido: boolean;
  public numeroValido: boolean;
  public complementoValido: boolean;
  public formaPagamentoValido: boolean;

  // Atributos para estado primitivos dos campos (pristine)
  public enderecoEstadoPrimitivo = true;
  public numeroEstadoPrimitivo = true;
  public complementoEstadoPrimitivo = true;
  public formaPagamentoEstadoPrimitivo = true;

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
    this.enderecoEstadoPrimitivo = false;

    this.enderecoValido = this.endereco.trim().length > 3 ? true : false;
  }

  public atualizaNumero(numeroInput: string): void {
    this.numero = numeroInput;
    this.numeroEstadoPrimitivo = false;

    this.numeroValido = this.numero.trim() !== '' ? true : false;
  }

  public atualizaComplemento(complementoInput: string): void {
    this.complemento = complementoInput;
    this.complementoEstadoPrimitivo = false;

    this.complementoValido = this.complemento.trim() !== '' ? true : false;
  }

  public atualizaFormaPagamento(formaPagamentoInput: string): void {
    this.formaPagamento = formaPagamentoInput;
    this.formaPagamentoEstadoPrimitivo = false;

    this.formaPagamentoValido = this.formaPagamento.trim() !== '' ? true : false;
  }
}
