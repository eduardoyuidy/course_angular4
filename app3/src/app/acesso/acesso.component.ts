import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado',[
        style({
          transform: 'translate(-60px, 0px)',
          opacity: 0
        }),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string;

  constructor() { }

  ngOnInit() {

    this.estadoBanner = 'criado';
  }

}
