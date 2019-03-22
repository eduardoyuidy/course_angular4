import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Oferta } from './shared/oferta.model';
import { URL_API } from './app.api';

@Injectable()
export class OfertasService {

    /*** Método antigo onde devolvia para o componente uma lista de objetos Oferta de forma hard code
    public getOfertas2(): Promise<Oferta[]> {

        return new Promise((resolve, reject) => {

            // Algum tipo de processamento, que ao finalizar chama a função resolve ou a função reject.

            const deu_certo = true;

            if (deu_certo) {

                setTimeout(() => resolve(this.ofertas), 3000);
            } else {
                reject({ codigo_erro: 404, mensagem_erro: 'Servidor não encontrado.' });
            }
        })
        .then((ofertas: Oferta[]) => {

            // Podemos cascatear outros thens para efetuar alguma trativa exta ao retorno da promise.
            console.log('primeiro then');
            return ofertas;
        })
        .then((ofertas: Oferta[]) => {
            console.log('segundo then');
            return new Promise((resolve2, reject2) => {
                setTimeout(() => resolve2(ofertas) , 3000);
            });
        })
        .then((ofertas: Oferta[]) => {
            return ofertas;
        });
    }****/

    constructor(private http: Http) { }

    // Método Novo
    // Efetuar a requisição HTTP para o servidor backend (mockado através de json-server) e retornar convertendo o Observable em Promise.
    public getOfertas(): Promise<Oferta[]> {

        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json();
            });
    }

    public getOfertasPorCategoria (categoria: string): Promise<Oferta[]> {

        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json();
            });
    }

    public getOfertaPorId(id: number): Promise<Oferta> {

        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                // Método shift retorna o primeiro elemento do array e o retira do array, reposicionando os demais elementos.
                return resposta.json().shift();
            });
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {

        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((response: Response) => {
                return response.json().shift().descricao;
            });
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {

        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((response: Response) => {
                return response.json().shift().descricao;
            });
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {

        // O Método retry será disparado caso não obtenha retorno com sucesso, até o limite de tentativas que foram especificadas para ele.
        /*return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(retry(10))
            .pipe(map((resposta: Response) => resposta.json()));*/

        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(retry(10))
            .pipe(map((resposta: Response) => resposta.json()));
    }
}
