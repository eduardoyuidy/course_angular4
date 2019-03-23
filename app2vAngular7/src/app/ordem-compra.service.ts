import { Injectable } from '@angular/core';
// import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { URL_API } from './app.api';
import { Pedido } from './shared/pedido.model';

// Utilizado decorador Injectable para possibilitar a injeção do Serviço HTTP do Angular no nosso Serviço.
@Injectable()
export class OrdemCompraService {

    // Injeção do serviço HTTP no construtor da classe OrdemCompraService
    constructor(private http: HttpClient) {}

    public efetivarCompra(pedido: Pedido): Observable<Pedido> {

        /* Angular 6 HTTP Request POST
        const headers: Headers = new Headers();

        headers.append('Content-type', 'application/json');

        return this.http.post(
            `${URL_API}/pedidos`,
            JSON.stringify(pedido),
            new RequestOptions({ headers: headers })
        )
        .pipe(map((resposta: Response) => {
            return resposta.json().id;
        }));*/

        // Angular 7 HTTP Client
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<Pedido>(
            `${URL_API}/pedidos`,
            JSON.stringify(pedido),
            httpOptions);
    }
}
