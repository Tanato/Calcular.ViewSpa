import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Config } from '../../shared/config/env.config';

import { Processo } from './processo.model';

@Injectable()
export class ProcessoService {

    private url: string = Config.API + 'processo';

    constructor(private http: Http) { }

    postProcesso(processo: Processo) {
        return this.http.post(this.url, Processo)
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

    private handleResult(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().Error || 'Server error');
    }
}

