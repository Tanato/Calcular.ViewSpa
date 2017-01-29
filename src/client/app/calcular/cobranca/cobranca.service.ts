import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';
import { Processo } from '../processo/processo.model';
import { Cobranca } from './cobranca.model';

@Injectable()
export class CobrancaService {

    private url: string = Config.API + 'cobranca';

    constructor(private http: Http) { }

    getProcessos(filterText: string, all: boolean): Observable<Processo[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);
        params.set('all', all ? 'true' : 'false');

        return this.http.get(this.url + '/processo/', { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getProcessoById(id: string): Observable<Processo> {
        return this.http.get(this.url + '/processo/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    postCobranca(cobranca: Cobranca) {
        return this.http.post(this.url, cobranca)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    putCobranca(cobranca: Cobranca) {
        return this.http
            .put(this.url, JSON.stringify(cobranca))
            .map(this.handleResult)
            .catch(this.handleError);
    }

    deleteCobranca(id: number) {
        return this.http.delete(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getContatoSelect(filterText: string = ''): Observable<string[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url + '/contato', { search: params })
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

