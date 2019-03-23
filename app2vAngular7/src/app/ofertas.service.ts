// import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

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

    constructor(private http: HttpClient) { }

    // Método Novo
    // Efetuar a requisição HTTP para o servidor backend (mockado através de json-server) e retornar convertendo o Observable em Promise.
    public getOfertas(): Promise<Oferta[]> {

        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => {
                // return resposta.json(); // Using Angular 7, whe don't need to convert json() anymore.
                return resposta;
            });
    }

    public getOfertasPorCategoria(categoria: string): Promise<any> {

        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => {
                // return resposta.json();
                return resposta;
            });
    }

    public getOfertaPorId(id: number): Promise<any> {

        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                // Método shift retorna o primeiro elemento do array e o retira do array, reposicionando os demais elementos.

                // return resposta.json().shift(); - Angular 6
                return resposta[0]; // Angular 7
            });
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {

        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((response: Response) => {
                // return response.json().shift().descricao; - Angular 6
                return response[0].descricao; // Angular 7
            });
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {

        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((response: Response) => {
                // return response.json().shift().descricao; - Angular 6
                return response[0].descricao; // Angular 7

            });
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {

        // O Método retry será disparado caso não obtenha retorno com sucesso, até o limite de tentativas que foram especificadas para ele.
        /*return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(retry(10))
            .pipe(map((resposta: Response) => resposta.json()));*/

        /* Requisição HTTP Angular 6
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(retry(10))
            .pipe(map((resposta: Response) => {
                console.log('OfertasService: Pesquisa', resposta);
                return resposta.json();
            }));*/

        // Requisição HTTP Angular 7
        return this.http.get<Oferta[]>(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(retry(10));
    }
}
