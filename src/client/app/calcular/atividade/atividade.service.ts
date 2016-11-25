import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';
import { Atividade } from './atividade.model';

@Injectable()
export class AtividadeService {

    private url: string = Config.API + 'atividade';

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

    postAtividade(servico: Atividade) {
        return this.http.post(this.url, servico)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    putAtividade(servico: Atividade) {
        return this.http
            .put(this.url, JSON.stringify(servico))
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

    getTipoAtividadeSelect() {
        return this.http.get(this.url + '/tipoatividade')
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
