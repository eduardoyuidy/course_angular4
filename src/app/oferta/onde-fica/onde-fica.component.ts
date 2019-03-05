import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {

    // Devemos buscar os parâmetros do componente pai, visto que Onde foi definido dentro do componente Ofertas.
    this.route.parent.params.subscribe((parametros: Params) => {

      this.ofertasService.getOndeFicaOfertaPorId(parametros.id)
        .then((onde) => {
          this.ondeFica = onde;
        });
    });
  }
}
