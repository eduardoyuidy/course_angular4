import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

import { ProgressoService } from './progresso.service';

@Injectable()
export class BdService {

    constructor(private progressoService: ProgressoService) {}

    public publicar(publicacao: any): void {

        let nomeImagem: string;

        nomeImagem = Date.now().toString();

        console.log('Chegamos no serviço responsável pelo controle de dados.', publicacao);

        // Envio de detalhes da publicação para o Firebase Database
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push( { titulo: publicacao.titulo } );

        // Envio de arquivo para o Firebase Storage
        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                // Acompanhamento do progresso upload
                (snapshot: any) => {
                    console.log('Snapshot', snapshot);
                    this.progressoService.status = 'andamento';
                    this.progressoService.estado = snapshot;
                },
                (error) => {
                    // console.log('Error Upload', error);
                    this.progressoService.status = 'erro';
                },
                () => {
                    // Finalização do upload
                    // console.log('Upload finalizado');
                    this.progressoService.status = 'concluido';
                }
            );
    }

}
