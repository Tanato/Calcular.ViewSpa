import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Config } from '../../shared/config/env.config';

import { Cliente } from './cliente.model';

@Injectable()
export class ClienteService {

    private url: string = Config.API + 'cliente';

    constructor(public http: Http) {
        console.info('AppSvc created' + this.http);
    }

    postCliente(cliente: Cliente) {
        return this.http.post(this.url, cliente)
            .catch(this.handleError);
    }

    putCliente(cliente: Cliente) {
        return this.http
            .put(this.url, JSON.stringify(cliente))
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getClientes(filterText: string): Observable<Cliente[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url, { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getClienteById(id: string): Observable<Cliente> {
        return this.http.get(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getPerfilSelect() {
        return this.http.get(this.url + '/perfil')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    deleteCliente(id: number) {
        return this.http.delete(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getComoChegouSelect() {
        return this.http.get(this.url + '/comoChegou')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getEmpresaSelect(filterText: string = ''): Observable<string[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url + '/company', { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    private handleResult(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        console.error(error._body ? error._body : error);
        return Observable.throw(error.json().Error || 'Server error');
    }
}

