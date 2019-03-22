import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { OrdemCompraService } from '../ordem-compra.service';
import { CarrinhoService } from '../carrinho.service';

import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [
    OrdemCompraService
  ]
})
export class OrdemCompraComponent implements OnInit {

  // Criado FormGroup que possui os FormControls vinculados aos elementos HTML através da 'tag' formControlName.
  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    'numero': new FormControl(null, [ Validators.required, Validators.minLength(1), Validators.maxLength(20) ]),
    'complemento': new FormControl(null, [ ]),
    'formaPagamento': new FormControl('', [ Validators.required ])
  });

  // ID do Pedido
  public idPedidoCompra: number;

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {

    console.log('Exibir Itens do Carrinho', this.carrinhoService.exibirItens());

  }

  public confirmarCompra(): void {

    console.log(this.formulario);

    if (this.formulario.status === 'INVALID') {
      console.log('Formulário está inválido.');

      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();
    } else {

      const pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento
      );

      console.log('Formulário está Válido.');

      this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((idPedido: number) => {

          this.idPedidoCompra = idPedido;
        });
    }
  }

}
