
import * as firebase from 'firebase';

export class BdService {

    constructor() {}

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
            .put(publicacao.imagem);
    }

}
