import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model';
import { Frases } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public instrucao = 'Traduza a frase:';
  public frases: Frase[] = Frases;
  public resposta = '';
  public rodada = 0;
  public rodadaFrase: Frase;

  public progresso = 0;
  public tentativas = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {

    this.atualizaRodada();
  }

  ngOnInit() { }

  ngOnDestroy() { }

  public atualizaResposta(resposta: Event): void {

    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {

    if (this.rodadaFrase.frasePtBr === this.resposta) {

      // Controla o Progresso
      this.progresso = this.progresso + (100 / this.frases.length);

      // Troca a frase da rodada
      this.rodada++;

      if (this.rodada === this.frases.length) {
        this.encerrarJogo.emit('vitoria');
      }

      this.atualizaRodada();

    } else {

      // Diminuir as tentativas
      this.tentativas--;

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota');
      }
    }
  }

  private atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
  }
}
