import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Framework RXJS que já está incluso no projeto Angular 4.
import { Observable, interval, Observer, Subscription } from 'rxjs';

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  /*// Foram criadas propriedades da classe do tipo Subscription para possibilitar o unsubscribe do Observable no momento do OnDestroy.
  private tempoObservableSubscription: Subscription;
  private meuObservableTesteSubscription: Subscription;*/

  public oferta: Oferta;
  // private tempoObservableSubscription: Subscription;
  // private meuObservableTesteSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {

    // Recuperar os parâmetros enviados pela rota através do método Snapshot, este tira uma 'foto' dos parâmetros enviados.
    // console.log('ParamId:', this.route.snapshot.params['id']);

    // Recuperar os parâmetros enviados pela rota através do método Subscribe, este fica escutando as alterações dos
    // parâmetros enviados. Este é utilizado quando um determinado componente altera algum parâmetro de rota para outro componente.
    /*
    this.route.params.subscribe((parametro: any) => {
      console.log('Parâmetros Subscribe:', parametro);
    });*/

    // Uso de um subscribe para monitorar a mudança dos parâmetros e atualizar a Oferta mostrada em tela. -->
    // No caso de uso do snapshot ele não monitora a mudança do path.
    this.route.params.subscribe((parametros: Params) => {

      this.ofertasService.getOfertaPorId(parametros.id)
      .then((response: Oferta) => {
        this.oferta = response;
      });
    });

    // Inscrição em um observable são enviados 3 parâmetros (Instrução, Error e Complete)
    /**
     this.route.params.subscribe(
       (parametro: any) => { console.log(parametro); },
       (error: any) => { console.log('Error: ', error); },
       () => { console.log('Processamento foi classificado como concluído!!'); }
     );
     */

     /** Exemplo 01 de uso de Observables*//*
     // Observables - Função interval retorna um Observable que efetua o retorno de inteiros após o intervalo passado como parâmetro.
     const tempo = interval(500);
     this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
       console.log('Intervalo:', intervalo);
     });*/

     /** Exemplo 02 de uso de Observables
      * Criando um Observável (meuObservableTeste)
      *//*
     const meuObservableTeste = Observable.create((observer: Observer<string>) => {
       observer.next('Primeiro evento da stream');
       observer.next('Segundo evento da stream');

       // Instrução error interrompe a stream de eventos.
       // observer.error('Algum erro foi encontrado na stream de eventos');

       observer.next('Terceito evento da stream');

       // Instrução complete finaliza a stream de eventos.
       observer.complete();
     });

     this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado) => { console.log('Resultado:', resultado); },
      (error) => { console.log('Erro:', error); },
      () => { console.log('A Stream de eventos foi finalizada!'); }
     );*/
  }

  ngOnDestroy() {

    // Efetuando o unsubscribe nos observables no evento OnDestroy do componente, desta forma evitando os Memory Leaks.
    /*this.tempoObservableSubscription.unsubscribe();
    this.meuObservableTesteSubscription.unsubscribe();*/
  }
}
