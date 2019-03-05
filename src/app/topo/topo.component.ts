import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit, OnDestroy {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {

    // Criado Subject para organizar os observables solicitados da pesquisa e retornar apenas o último observable disparado.
    this.ofertas = this.subjectPesquisa // Retorno Oferta[]
      .pipe(debounceTime(1000)) // Executa a ação do switchMap após 1 segundo
      .pipe(distinctUntilChanged()) // Apenas executa a ação switchMap se o termo enviado for outro
      .pipe(switchMap((termo: string) => {

        if (termo.trim() === '') {
          // Retornar um observable de array de ofertas vazio.
          return of<Oferta[]>([]);
        }

        return this.ofertasService.pesquisaOfertas(termo);
      }))
      .pipe(catchError((err: any) => { // Captura o erro.
        return of<Oferta[]>([]);
      }));

    // Subscribe para ficar escutando qualquer alteração do Observable disparado pelo método pesquisa. -->
    // Deixamos de efetuar o subscribe para depois enviar o dado para uma property do componente e passamos a usar o Pipe Async
    /*this.ofertas.subscribe((ofertas: Oferta[]) => {
      console.log('Retorno', ofertas);
      this.ofertas2 = ofertas;
    });*/
  }

  public pesquisa(termoDaBusca: string): void {

    /*// Método de requisição a cada keyup do campo pesquisa, isso fazia que a cada letra uma requisição fosse disparada.
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca);
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      ((erro: any) => console.log('Erro Status: ', erro.status)),
      (() => console.log('Fluxo de eventos completo!'))
    );*/

    // Uso de um 'proxy' utilizando o subject para garantir que seja feita 'finalizada' apenas a última requisição,
    // após o usuário finalizar a digitação do termo de pesquisa, as demais pesquisas não serão retornadas para o Component.
    this.subjectPesquisa.next(termoDaBusca.trim());
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }

  ngOnDestroy() {
    // eyms unsubscribe the observable.
  }
}
