import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';

import { IKeyValuePair } from '../../shared/interfaces';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Config } from '../../shared/config/env.config';

import { Processo } from './processo.model';

@Injectable()
export class ProcessoService {

    private url: string = Config.API + 'processo';
    private urlCliente: string = Config.API + 'cliente';

    constructor(private http: Http) { }

    postProcesso(processo: Processo) {
        return this.http.post(this.url, processo)
            .catch(this.handleError);
    }

    putProcesso(processo: Processo) {
        return this.http
            .put(this.url, JSON.stringify(processo))
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getProcessos(filterText: string): Observable<Processo[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url, { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getProcessoById(id: string): Observable<Processo> {
        return this.http.get(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getParteSelect() {
        return this.http.get(this.url + '/parte')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    deleteProcesso(id: number) {
        return this.http.delete(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getLocalSelect() {
        return this.http.get(this.url + '/local')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getAdvogadoSelect(filter: string = ''): Observable<IKeyValuePair[]>{
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filter);

        return this.http.get(this.urlCliente + '/select', { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getAdvogadoSelectById(id: number): Observable<IKeyValuePair>{
        return this.http.get(this.urlCliente + '/select/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getIndicacaoSelect(filter: string = ''): Observable<IKeyValuePair[]>{
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filter);

        return this.http.get(this.urlCliente + '/select', { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getIndicacaoSelectById(id: number): Observable<IKeyValuePair>{
        return this.http.get(this.urlCliente + '/select/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    private handleResult(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().Error || 'Server error');
    }
}

