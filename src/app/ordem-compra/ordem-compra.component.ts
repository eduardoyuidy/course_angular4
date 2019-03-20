import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  // Pedido
  public pedido: Pedido = new Pedido('', '', '', '');

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

  // Controlar botão confirmar compra
  public formEstado = 'disabled';

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {

    // Inicializando campos do componente
    this.endereco = '';
    this.numero = '';
    this.complemento = '';
    this.formaPagamento = '';

    // this.ordemCompraService.efetivarCompra();
  }

  public atualizaEndereco(enderecoInput: string): void {
    this.endereco = enderecoInput;
    this.enderecoEstadoPrimitivo = false;

    this.enderecoValido = this.endereco.trim().length > 3 ? true : false;
    this.habilitaForm();
  }

  public atualizaNumero(numeroInput: string): void {
    this.numero = numeroInput;
    this.numeroEstadoPrimitivo = false;

    this.numeroValido = this.numero.trim() !== '' ? true : false;
    this.habilitaForm();
  }

  public atualizaComplemento(complementoInput: string): void {
    this.complemento = complementoInput;
    this.complementoEstadoPrimitivo = false;

    this.complementoValido = this.complemento.trim() !== '' ? true : false;
    this.habilitaForm();
  }

  public atualizaFormaPagamento(formaPagamentoInput: string): void {
    this.formaPagamento = formaPagamentoInput;
    this.formaPagamentoEstadoPrimitivo = false;

    this.formaPagamentoValido = this.formaPagamento.trim() !== '' ? true : false;
    this.habilitaForm();
  }

  public habilitaForm(): void {
    if (this.enderecoValido === true && this.numeroValido === true && this.formaPagamentoValido === true) {
      this.formEstado = '';
    } else {
      this.formEstado = 'disabled';
    }
  }

  public confirmarCompra(): void {

    this.pedido.endereco = this.endereco;
    this.pedido.numero = this.numero;
    this.pedido.complemento = this.complemento;
    this.pedido.formaPagamento = this.formaPagamento;

    this.ordemCompraService.efetivarCompra(this.pedido)
      .subscribe();
  }
}
