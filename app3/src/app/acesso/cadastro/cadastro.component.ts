import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  // Expor o método EventEmitter para o componentem PAI passadno um parâmetro string.
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {

    // Método da classe FILHO dispara outro Evento para o componente Pai que irá perceber pelo EventBiding do componente Filho (TemplatePAI)
    this.exibirPainel.emit('login');
  }

}
