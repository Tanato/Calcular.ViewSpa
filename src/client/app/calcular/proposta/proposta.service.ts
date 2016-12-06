import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';
import { Proposta } from './proposta.model';

@Injectable()
export class PropostaService {

    private url: string = Config.API + 'proposta';

    constructor(private http: Http) { }

    getPropostas(filterText: string): Observable<Proposta[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url, { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getPropostaById(id: string): Observable<Proposta> {
        return this.http.get(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    postProposta(proposta: Proposta) {
        return this.http.post(this.url, proposta)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    putProposta(proposta: Proposta) {
        return this.http.put(this.url, proposta)
            .catch(this.handleError);
    }

    deleteProposta(id: number) {
        return this.http.delete(this.url + '/' + id)
            .catch(this.handleError);
    }

    getContatoSelect(filterText: string = ''): Observable<string[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url + '/contato', { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getComoChegouSelect() {
        return this.http.get(this.url + '/comoChegou')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getMotivoSelect() {
        return this.http.get(this.url + '/motivo')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    private handleResult(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        console.error(error.json());
        return Observable.throw(error.json().Error || 'Server error');
    }
}

