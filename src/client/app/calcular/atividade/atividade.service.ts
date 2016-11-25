import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';
import { Atividade, TipoAtividade } from './atividade.model';
import { IKeyValuePair } from '../../shared/interfaces';

@Injectable()
export class AtividadeService {

    private url: string = Config.API + 'atividade';
    private urlTipoAtividade: string = Config.API + 'tipoatividade';

    constructor(private http: Http) { }

    getAtividades(filterText: string): Observable<Atividade[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText);

        return this.http.get(this.url, { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getAtividadeById(id: string): Observable<Atividade> {
        return this.http.get(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    postAtividade(atividade: Atividade) {
        return this.http.post(this.url, atividade)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    putAtividade(atividade: Atividade) {
        return this.http
            .put(this.url, JSON.stringify(atividade))
            .map(this.handleResult)
            .catch(this.handleError);
    }

    deleteAtividade(id: number) {
        return this.http.delete(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getResponsavel(tipo: number) {
        return this.http.get(this.url + '/responsavel/' + tipo)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    postTipoAtividade(tipoAtividade: string) {
        var model = new TipoAtividade();
        model.nome = tipoAtividade;

        return this.http.post(this.urlTipoAtividade,  model)
            .catch(this.handleError);
    }

    deleteTipoAtividade(id: number) {
        return this.http.delete(this.urlTipoAtividade + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getTipoAtividade() {
        return this.http.get(this.urlTipoAtividade)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getTipoAtividadeSelect() : Observable<IKeyValuePair[]> {
        return this.http.get(this.urlTipoAtividade + '/select')
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
