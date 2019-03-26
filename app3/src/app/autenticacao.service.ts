import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './acesso/usuario.model';

import * as firebase from 'firebase';

@Injectable()
export class AutenticacaoService {

    public tokenId: string;

    constructor(private router: Router) {}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {

        // console.log('Chegamos até o serviço', usuario);

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                console.log(resposta);

                // Remover a senha do atributo senha do obj usuário.
                delete usuario.senha;

                // Registrando dados complementares no path 'usuario_detalhe' com o 'nó' email na base64.
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set( usuario );
            })
            .catch((error: Error) => {
                console.log('Error:', error);
            });
    }

    public autenticarUsuario(email: string, senha: string): void {

        console.log('autenticarUsuario', email, senha);

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {

                // Token é retornado
                firebase.auth().currentUser.getIdToken()
                    .then((IdToken: string) => {

                        this.tokenId = IdToken;
                        localStorage.setItem('idTokenInstagram', IdToken);

                        // Realiza a navegação ara a route 'home'
                        this.router.navigate(['/home']);
                    });
            })
            .catch((error: Error) => {
                console.log('Erro Autenticação', error);
            });
    }

    public autenticado(): boolean {

        if (this.tokenId === undefined && localStorage.getItem('idTokenInstagram') !== null) {
            this.tokenId = localStorage.getItem('idTokenInstagram');
        }

        return this.tokenId !== undefined;
    }
}
