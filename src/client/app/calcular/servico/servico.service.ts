import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';
import { Servico, TipoServico } from './servico.model';
import { IKeyValuePair } from '../../shared/interfaces';

@Injectable()
export class ServicoService {

    private url: string = Config.API + 'servico';
    private urlTipoServico: string = Config.API + 'tiposervico';

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

    cancelServico(id: number) {
        return this.http.post(this.url + '/cancel/' + id, null)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    postTipoServico(tipoAtividade: string) {
        var model = new TipoServico();
        model.nome = tipoAtividade;

        return this.http.post(this.urlTipoServico, model)
            .catch(this.handleError);
    }

    deleteTipoServico(id: number) {
        return this.http.delete(this.urlTipoServico + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getTipoServico() {
        return this.http.get(this.urlTipoServico)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getTipoServicoSelect(): Observable<IKeyValuePair[]> {
        return this.http.get(this.urlTipoServico + '/select')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getStatus() {
        return this.http.get(this.url + '/status')
            .map(this.handleResult)
            .catch(this.handleError);
    }

    private handleResult(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        console.error(error._body ? error._body : error);
        return Observable.throw(error._body || error.json().Error || 'Server error');
    }
}

