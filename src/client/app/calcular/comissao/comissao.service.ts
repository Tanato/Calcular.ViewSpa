import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';
import { Comissao, ComissaoFuncionarioMes } from './comissao.model';
import { ComissaoAtividade } from './comissao.model';

@Injectable()
export class ComissaoService {

    private url: string = Config.API + 'comissao';
    private urlApuracao: string = Config.API + 'apuracaocomissao';

    constructor(private http: Http) { }

    getComissao(filterText: number = 0): Observable<Comissao[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('filter', filterText.toString());

        return this.http.get(this.url, { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    postComissao(comissao: Comissao) {
        return this.http.post(this.url, comissao)
            .catch(this.handleError);
    }

    deleteComissao(id: number) {
        return this.http.delete(this.url + '/' + id)
            .map(this.handleResult)
            .catch(this.handleError);
    }

    getApuracaoComissao(mes: number, ano: number, funcionarioId: string): Observable<ComissaoAtividade[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('mes', mes ? mes.toString() : '');
        params.set('ano', ano ? ano.toString() : '');
        params.set('funcionarioId', funcionarioId);

        return this.http.get(this.urlApuracao, { search: params })
            .map(this.handleResult)
            .catch(this.handleError);
    }

    postApuracaoComissao(value: ComissaoFuncionarioMes) {
        return this.http.post(this.urlApuracao, value)
            .catch(this.handleError);
    }

    putApuracaoComissao(value: ComissaoFuncionarioMes) {
        return this.http.put(this.urlApuracao, value)
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
