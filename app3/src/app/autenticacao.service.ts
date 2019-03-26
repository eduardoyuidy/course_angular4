// import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

import { Usuario } from './acesso/usuario.model';

// @Injectable()
export class AutenticacaoService {

    constructor() {}

    public cadastrarUsuario(usuario: Usuario): void {

        console.log('Chegamos até o serviço', usuario);

        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                console.log(resposta);

                // Remover a senha do atributo senha do obj usuário.
                delete usuario.senha;

                // Registrando dados complementares no path email na base 64.
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set( usuario );
            })
            .catch((error: Error) => {
                console.log('Error:', error);
            });
    }
}
