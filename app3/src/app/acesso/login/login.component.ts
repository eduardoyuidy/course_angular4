import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Expor o método EventEmitter para o componentem PAI passadno um parâmetro string.
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {

    // Método da classe FILHO dispara outro Evento para o componente Pai que irá perceber pelo EventBiding do componente Filho (TemplatePAI)
    this.exibirPainel.emit('cadastro');
  }

}
