import { Injectable } from '@angular/core';
import { Response, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../shared/config/env.config';
import { Comissao } from './comissao.model';
import { IKeyValuePair } from '../../shared/interfaces';

@Injectable()
export class ComissaoService {

    private url: string = Config.API + 'comissao';

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

    private handleResult(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().Error || 'Server error');
    }
}
