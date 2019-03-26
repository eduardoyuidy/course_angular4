import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';

import { BdService } from '../../bd.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null, [ Validators.required, Validators.minLength(3) ])
  });

  public email: string;
  public imagem: any;

  constructor(private bdService: BdService) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {

    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem
    });
  }

  public preparaImagemUpload(event: Event): void {

    this.imagem = (event.target as HTMLInputElement).files[0];
  }

}
