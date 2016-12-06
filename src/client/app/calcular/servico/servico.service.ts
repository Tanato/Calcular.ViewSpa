import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';
import { Servico } from './servico.model';

@Injectable()
export class ServicoService {

    private url: string = Config.API + 'servico';

    constructor(private http: Http) { }

    getServicos(filterText: string): Observable<Servico[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url, { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getServicosSelect(numero: string): Observable<Servico[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', numero);

        return this.http.get(this.url + '/numero', { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getServicoById(id: string): Observable<Servico> {
        return this.http.get(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    postServico(servico: Servico) {
        return this.http.post(this.url, servico)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    putServico(servico: Servico) {
        return this.http
            .put(this.url, JSON.stringify(servico))
            .map(this.handleResult)
            .catch(this.handleError);
    }

    deleteServico(id: number) {
        return this.http.delete(this.url + '/' + id)
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

