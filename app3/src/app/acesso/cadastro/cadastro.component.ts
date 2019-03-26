import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from '../usuario.model';

import { AutenticacaoService } from '../../autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  // Expor o método EventEmitter para o componentem PAI passadno um parâmetro string.
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  // Inserir aqui no FormControl os Validators desejados para cada input do ReactiveForm
  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [ Validators.required, Validators.email ]),
    nome_completo: new FormControl(null, [ Validators.required, Validators.minLength(6), Validators.maxLength(120) ]),
    nome_usuario: new FormControl(null, [ Validators.required, Validators.minLength(6), Validators.maxLength(30) ]),
    senha: new FormControl(null, [ Validators.required, Validators.minLength(6) ])
  });

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {

    // Método da classe FILHO dispara outro Evento para o componente Pai que irá perceber pelo EventBiding do componente Filho (TemplatePAI)
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {

    const usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    );

    console.log(usuario);

    this.autenticacaoService.cadastrarUsuario(usuario);
  }

}
