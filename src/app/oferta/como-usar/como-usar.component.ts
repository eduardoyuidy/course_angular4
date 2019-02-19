import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {

    console.log('ComoUsuarComponent');
    console.log('ID Parent', this.route.parent.snapshot.params['id']);

    // Recuperar os parâmetros enviados no roteamento através da URL do componente pai (parent).
    this.ofertasService.getComoUsarOfertaPorId(this.route.parent.snapshot.params['id'])
      .then((descricao: string) => {

        console.log('Como Usar Response', descricao);
        this.comoUsar = descricao;
      });
  }

}
