import { Component, OnInit } from '@angular/core';

import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [ OfertasService ]
})
export class RestaurantesComponent implements OnInit {

  public ofertas: Oferta[];

  constructor(private ofertaService: OfertasService) { }

  ngOnInit() {

    this.ofertaService.getOfertasPorCategoria('restaurante')
      .then((oferta: Oferta[]) => {
        this.ofertas = oferta;
      })
      .catch(error => {
        console.log('Erro de comunicação com o servidor', error);
      });
  }
}
