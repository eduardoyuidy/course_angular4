import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit, OnDestroy {

  public comoUsar: string;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {

    this.route.parent.params.subscribe((parametros: Params) => {

      // Recuperar os parâmetros enviados no roteamento através da URL do componente pai (parent).
      this.ofertasService.getComoUsarOfertaPorId(parametros.id)
        .then((descricao: string) => {
          this.comoUsar = descricao;
        });
    });
  }

  ngOnDestroy() { }
}
