import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URL_API } from './app.api';
import { Pedido } from './shared/pedido.model';

// Utilizado decorador Injectable para possibilitar a injeção do Serviço HTTP do Angular no nosso Serviço.
@Injectable()
export class OrdemCompraService {

    // Injeção do serviço HTTP no construtor da classe OrdemCompraService
    constructor(private http: Http) {}

    public efetivarCompra(pedido: Pedido): Observable<any> {

        console.log('Chegamos até aqui');
        console.log(pedido);

        const headers: Headers = new Headers();

        headers.append('Content-type', 'application/json');

        return this.http.post(
            `${URL_API}/pedidos`,
            JSON.stringify(pedido),
            new RequestOptions({ headers: headers })
        )
        .pipe(map((resposta: Response) => {
            console.log(resposta.json());
        }));
    }
}
